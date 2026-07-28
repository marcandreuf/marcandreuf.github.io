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
  try {
    // decode: tags contain spaces ('home lab'), so the url is percent-encoded
    // while the emitted directory is not. Without this every such page fails
    // the read, falls open, and lands back in the sitemap.
    const pathname = decodeURIComponent(new URL(pageUrl).pathname);
    const html = readFileSync(join(OUT_DIR, pathname, 'index.html'), 'utf-8');
    return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  } catch {
    return false;
  }
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
      return item;
    },
  });
