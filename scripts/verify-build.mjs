#!/usr/bin/env node
/**
 * Post-build invariant checks.
 *
 * Codifies the behaviour verified by hand on 2026-07-20 so that each phase of
 * the Astro upgrade (see docs/UPGRADE_PLAN.md) is held to the same bar. Run
 * after `pnpm build`.
 *
 *   node scripts/verify-build.mjs
 *
 * Exits non-zero on the first failed assertion group.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import sharp from 'sharp';

const DIST = 'dist';
// 240 -> 234: dropped the six /1 aliases that duplicated their own page one
// (/blog/1, /blog/explore/1, /blog/tags/proxmox/1, ...). See src/pages/blog/[...page].astro.
// 234 -> 222: dropped the twelve /blog/explore/{tags,categories}/(N) root listings,
// which duplicated /blog/explore/(N). See src/pages/blog/explore/[...filter]/[...page].astro.
const EXPECTED_PAGES = 222;

let failures = 0;
let checks = 0;

const pass = (msg) => {
  checks++;
  console.log(`  ok   ${msg}`);
};
const fail = (msg, detail) => {
  checks++;
  failures++;
  console.log(`  FAIL ${msg}`);
  if (detail) console.log(`       ${detail}`);
};
const check = (cond, msg, detail) => (cond ? pass(msg) : fail(msg, detail));

const walk = (dir) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
};

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
const read = (f) => readFileSync(f, 'utf8');

/** Post pages only, and only the <article> body, so chrome is not inspected. */
const postBodies = htmlFiles
  .filter((f) => f.includes(`${join(DIST, 'blog')}/`) && !f.includes('/tags/') && !f.includes('/categories/'))
  .map((f) => {
    const m = /<article[\s\S]*?<\/article>/.exec(read(f));
    return m ? { file: f, body: m[0] } : null;
  })
  .filter(Boolean);

const anchors = (html, pattern) => html.match(pattern) ?? [];

console.log('\nBuild invariants\n');

// 1. page count
console.log('1. page count');
check(
  htmlFiles.length === EXPECTED_PAGES,
  `${EXPECTED_PAGES} pages built`,
  htmlFiles.length !== EXPECTED_PAGES
    ? `got ${htmlFiles.length}. If intentional, update EXPECTED_PAGES in this script.`
    : ''
);

// 2. external links carry target and rel
console.log('2. external links');
{
  const bad = [];
  for (const { file, body } of postBodies) {
    for (const tag of anchors(body, /<a\b(?=[^>]*href="https?:\/\/)[^>]*>/g)) {
      // social-share components set their own attributes
      if (tag.includes('social-share')) continue;
      if (!tag.includes('target="_blank"') || !tag.includes('noopener') || !tag.includes('noreferrer')) {
        bad.push(`${file}: ${tag.slice(0, 100)}`);
      }
    }
  }
  check(bad.length === 0, 'every external post link has target=_blank and rel=noopener noreferrer', bad.slice(0, 5).join('\n       '));
}

// 3. internal hash links untouched
console.log('3. hash links');
{
  const bad = [];
  for (const { file, body } of postBodies) {
    for (const tag of anchors(body, /<a\b(?=[^>]*href="#)[^>]*>/g)) {
      if (tag.includes('target=')) bad.push(`${file}: ${tag.slice(0, 100)}`);
    }
  }
  check(bad.length === 0, 'no internal hash link was given a target', bad.slice(0, 5).join('\n       '));
}

// 4. no anchors injected into code
console.log('4. code blocks');
{
  const bad = [];
  for (const { file, body } of postBodies) {
    for (const block of body.match(/<pre[\s\S]*?<\/pre>/g) ?? []) {
      const hits = block.match(/<a\b[^>]*>/g) ?? [];
      if (hits.length) bad.push(`${file}: ${hits.length} anchor(s) inside <pre>`);
    }
  }
  check(bad.length === 0, 'no <a> injected inside <pre>', bad.slice(0, 5).join('\n       '));
}

// 5. expressive-code
console.log('5. expressive-code');
{
  const withCode = postBodies.filter(({ body }) => body.includes('<pre'));
  const styled = withCode.filter(({ body }) => body.includes('expressive-code'));
  check(withCode.length > 0, `found ${withCode.length} post(s) containing code blocks`);
  check(
    styled.length === withCode.length,
    'every post with code blocks rendered through expressive-code',
    `${withCode.length - styled.length} post(s) missing expressive-code markup`
  );
  const assets = allFiles.filter((f) => /\/ec\.[^/]+\.(css|js)$/.test(f));
  check(
    assets.some((f) => f.endsWith('.css')) && assets.some((f) => f.endsWith('.js')),
    'expressive-code css and js assets emitted',
    `found: ${assets.join(', ') || 'none'}`
  );
}

// 6. mermaid pre-rendered
console.log('6. mermaid');
{
  const target = htmlFiles.find((f) => f.includes('2025-03-27-mermaid-diagrams'));
  if (!target) {
    fail('mermaid post found in dist', 'expected a page matching 2025-03-27-mermaid-diagrams');
  } else {
    const html = read(target);
    check(html.includes('aria-roledescription'), 'mermaid diagrams pre-rendered to inline svg');
    check(
      !html.includes('language-mermaid'),
      'no unrendered ```mermaid fences left in output',
      'found leftover language-mermaid, mermaid did not run'
    );
  }
}

// 7. open graph images
console.log('7. open graph');
{
  const ogImages = allFiles.filter((f) => f.includes('open-graph') && f.endsWith('.png'));
  check(ogImages.length > 0, `${ogImages.length} open-graph png(s) emitted`);
  const empty = ogImages.filter((f) => statSync(f).size === 0);
  check(empty.length === 0, 'no zero-byte open-graph images', empty.join(', '));

  // The background must actually render. satori cannot parse oklch(), and
  // Tailwind 4 emits its palette in oklch, so feeding it colours straight from
  // `tailwindcss/colors` silently produced a black background behind dark text.
  // Size checks cannot see that: the PNGs were all present and non-empty.
  // The palette is light by design, so a near-black corner means the gradient
  // failed to parse.
  const black = [];
  for (const file of ogImages) {
    const { data } = await sharp(file)
      .extract({ left: 3, top: 3, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const [r, g, b] = data;
    if (r < 20 && g < 20 && b < 20) black.push(file);
  }
  check(
    black.length === 0,
    'open-graph backgrounds render (no black corners)',
    black.slice(0, 5).join(', ')
  );

  // Known gap: this section cannot tell whether every *element* inside the
  // image rendered. satori 0.28 stopped coercing the string values that HTML
  // width/height attributes produce, which collapsed the avatar to zero width,
  // and every assertion here still passed. When satori or sharp moves, open a
  // rendered PNG and compare it against the previous build by eye.
}

console.log(
  `\n${failures === 0 ? 'PASS' : 'FAIL'}  ${checks - failures}/${checks} checks passed\n`
);
process.exit(failures === 0 ? 0 : 1);
