#!/usr/bin/env node
/**
 * Captures the site's committed screenshot assets.
 *
 * Two kinds, both self-hosted so they keep working after the site they show
 * changes or goes away:
 *
 *   - the portfolio card images in src/assets/images/index/
 *   - the open-graph fallback hero in src/assets/images/default/open-graph/,
 *     which is the picture on the social card of every page without a hero
 *     image of its own
 *
 *   node scripts/capture-screenshots.mjs             # all targets
 *   node scripts/capture-screenshots.mjs cipcity     # only matching targets
 *   node scripts/capture-screenshots.mjs light-site  # just the og hero
 *
 * The og hero is a picture of this site, so it goes stale whenever the
 * homepage changes. Re-run it after any homepage edit. To capture a change
 * that has not deployed yet, run `pnpm preview` and point SITE at it:
 *
 *   SITE=http://localhost:3005 node scripts/capture-screenshots.mjs light-site
 *
 * Add a site by appending one entry to TARGETS below.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { chromium } from 'playwright';
import sharp from 'sharp';

const SITE = process.env.SITE ?? 'https://marcandreuf.com';

const TARGETS = [
  // openmemship.com declares /docs/ as its homepage field, but the bare root
  // serves a real landing page, so the root is what gets captured.
  { file: 'memship-home-page.png', url: 'https://openmemship.com' },
  // Korean at the bare root is correct for this site. Do not capture /en/.
  { file: 'fcprobity-home-page.png', url: 'https://fcprobity.com' },
  // English at the bare root. Do not capture /ko/ or /ru/.
  { file: 'cipcity-home-page.png', url: 'https://cipcity.com' },
  {
    file: 'light-site.png',
    url: SITE,
    dir: join('src', 'assets', 'images', 'default', 'open-graph'),
    // The og card is 1200x630 with p-8, and the picture sits in a w-[550px]
    // column at full height under object-fit: cover, so the slot is about
    // 550x566. Capturing at that ratio means cover crops nothing. The asset
    // this replaced was 925x780, ratio 1.19, and lost its left edge mid-word.
    viewport: { width: 1280, height: 1317 },
    deviceScaleFactor: 1.5,
    outputWidth: 1100,
    maxBytes: 350 * 1024,
    // The filename promises the light theme, and DEFAULT_MODE is 'light'.
    // Pin it so the capture cannot follow a machine's dark preference.
    colorScheme: 'light',
  },
];

const DEFAULTS = {
  dir: join('src', 'assets', 'images', 'index'),
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  /** Match the widest existing card image so the set stays visually consistent. */
  outputWidth: 2069,
  /** The existing images run 100KB-500KB. Stay inside that. */
  maxBytes: 500 * 1024,
  colorScheme: 'light',
};

/**
 * Viewport-only, not fullPage.
 *
 * Issue #23 asked for a full-page capture AND for roughly the proportions of
 * the existing pickupee-home-page.png (2069x1248, ratio 1.66) and
 * gm-home-page.png (1500x721, ratio 2.08). Those two cannot both hold: a
 * full-page shot of a landing page is tall and narrow, around ratio 0.3. Every
 * image already in the folder is an above-the-fold viewport capture, so that is
 * what the cards are laid out for and that is what this produces. Flip to true
 * to get the other reading.
 */
const FULL_PAGE = false;

/** Give lazy-loaded hero imagery a chance to settle after network idle. */
const SETTLE_MS = 1500;
const NAV_TIMEOUT_MS = 45_000;

/**
 * PNG at 2560px wide lands well over the size budget, so downscale to the width
 * the existing cards use and quantise until it fits.
 *
 * Palette size matters far more than quality for photographic pages: a site
 * built on full-bleed photos (fcprobity) will not fit at 256 colours however
 * far quality drops, but comes in comfortably at 128. Steps run cheapest-first,
 * so a flat design pays nothing for the later rungs existing only for photos.
 */
const LADDER = [
  { colours: 256, quality: 100 },
  { colours: 256, quality: 80 },
  { colours: 192, quality: 80 },
  { colours: 128, quality: 80 },
  { colours: 96, quality: 70 },
  { colours: 64, quality: 60 },
];

const compress = async (buffer, label, outputWidth, maxBytes) => {
  const resized = sharp(buffer).resize({ width: outputWidth, withoutEnlargement: true });

  for (const { colours, quality } of LADDER) {
    const out = await resized
      .clone()
      .png({ compressionLevel: 9, palette: true, colours, quality, effort: 10 })
      .toBuffer();

    if (out.length <= maxBytes) return { out, colours, quality };
    console.log(
      `       ${colours} colours q${quality} -> ${(out.length / 1024).toFixed(0)}KB, too big, retrying`,
    );
  }

  throw new Error(`${label}: cannot get under ${maxBytes / 1024}KB at the lowest rung of the ladder`);
};

const filters = process.argv.slice(2);
const selected = filters.length
  ? TARGETS.filter((t) => filters.some((f) => t.file.includes(f) || t.url.includes(f)))
  : TARGETS;

if (!selected.length) {
  console.error(`No target matches ${filters.join(', ')}. Known: ${TARGETS.map((t) => t.file).join(', ')}`);
  process.exit(1);
}

// Some hosts serve a cut-down page to an obvious headless agent.
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const browser = await chromium.launch();

let failures = 0;

for (const target of selected) {
  const { file, url, dir, viewport, deviceScaleFactor, outputWidth, maxBytes, colorScheme } = {
    ...DEFAULTS,
    ...target,
  };

  mkdirSync(dir, { recursive: true });

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    colorScheme,
    userAgent: USER_AGENT,
  });
  const page = await context.newPage();

  try {
    console.log(`  ${join(dir, file)}  <-  ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
    await page.waitForTimeout(SETTLE_MS);

    const shot = await page.screenshot({ type: 'png', fullPage: FULL_PAGE });
    const { out, colours, quality } = await compress(shot, file, outputWidth, maxBytes);
    writeFileSync(join(dir, file), out);

    const { width, height } = await sharp(out).metadata();
    console.log(
      `       ok   ${width}x${height}  ${(out.length / 1024).toFixed(0)}KB  ratio ${(width / height).toFixed(2)}  ${colours}c/q${quality}`,
    );
  } catch (error) {
    failures++;
    console.log(`       FAIL ${error.message}`);
  } finally {
    await context.close();
  }
}

await browser.close();

console.log(`\n${selected.length - failures}/${selected.length} captured`);
process.exit(failures ? 1 : 0);
