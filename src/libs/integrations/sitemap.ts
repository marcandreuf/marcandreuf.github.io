import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

import { PROCESS_ENV } from '../../config/process-env';
import { ROUTES } from '../../constants/routes';

const { SITE_URL } = PROCESS_ENV;

// imported in astro.config.ts
// !must not use CONFIG, but process-env.ts

const OUT_DIR = 'dist';

/**
 * The emitted html is the source of truth for both checks below, so read each
 * file once and keep it. filter() and serialize() are called separately for the
 * same url, and every surviving page would otherwise be read twice.
 *
 * Returns null when the file cannot be read, which each caller treats as "no
 * opinion" rather than as a failure.
 */
const htmlCache = new Map<string, string | null>();

const readPageHtml = (pageUrl: string): string | null => {
  const cached = htmlCache.get(pageUrl);
  if (cached !== undefined) return cached;

  let html: string | null = null;
  try {
    // decode: slugs used to contain spaces ('home lab'), so a url could arrive
    // percent-encoded while the emitted directory is not. Without this such a
    // page fails the read and silently loses both checks.
    const pathname = decodeURIComponent(new URL(pageUrl).pathname);
    html = readFileSync(join(OUT_DIR, pathname, 'index.html'), 'utf-8');
  } catch {
    html = null;
  }

  htmlCache.set(pageUrl, html);
  return html;
};

/**
 * Submitting a url while the page itself asks Google not to index it is a
 * contradictory signal, so the sitemap has to agree with the robots meta tag.
 * Rather than restate the noindex rules here (the explore tree, single-post tag
 * pages, whatever comes next) and let the two drift, read the emitted html and
 * take the page's own word for it. @astrojs/sitemap runs on astro:build:done,
 * so every file this looks for has already been written.
 *
 * Fails open: an unreadable file keeps the url in the sitemap, which is the
 * same behaviour as before this check existed.
 */
const isNoindex = (pageUrl: string): boolean => {
  const html = readPageHtml(pageUrl);
  if (html === null) return false;
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
};

/**
 * lastmod is the only freshness hint Google still reads (changefreq and
 * priority are ignored), but it is only worth sending if it is true. A build
 * timestamp on every url is the classic mistake: it makes every page look
 * changed on every deploy, Google learns the signal is noise, and discounts it
 * site-wide. Worse than sending nothing.
 *
 * So take it from the content itself. Every page that renders a post already
 * emits <time datetime="YYYY-MM-DD"> for its published and updated dates, so
 * the newest date on the page is a real answer for both cases:
 *
 *   - a post page  -> that post's own updated (or published) date
 *   - a list page  -> the date of the newest post it lists, which is exactly
 *                     when that listing last changed
 *
 * Pages with no post dates at all ('/', '/about/', '/portfolio/', the tag and
 * category indexes) return undefined and are emitted without a lastmod. An
 * absent lastmod is legal and honest; a fabricated one is neither.
 *
 * Returns a date-only string, which is all the source dates carry.
 * @astrojs/sitemap normalises it to a full ISO timestamp on the way out
 * (2026-02-13 becomes 2026-02-13T00:00:00.000Z), so do not read that midnight
 * as a real time of day.
 */
const getLastmod = (pageUrl: string): string | undefined => {
  const html = readPageHtml(pageUrl);
  if (html === null) return undefined;

  let newest: string | undefined;
  for (const [, date] of html.matchAll(/<time[^>]+datetime="(\d{4}-\d{2}-\d{2})/gi)) {
    // ISO dates compare correctly as strings, so no Date objects in the loop
    if (!newest || date > newest) newest = date;
  }

  return newest;
};

/** generated at build-time only */
export const sitemapIntegration = () =>
  sitemap({
    filter: (page) => !isNoindex(page),
    serialize: (item) => {
      if (item.url.endsWith(SITE_URL)) {
        item.priority = 1.0;
        // google can access it with '/'
      } else if (item.url.endsWith(`${SITE_URL}${ROUTES.BLOG}`)) {
        item.changefreq = 'daily' as ChangeFreqEnum;
        item.priority = 0.9;
      }

      const lastmod = getLastmod(item.url);
      if (lastmod) item.lastmod = lastmod;

      return item;
    },
  });
