import { CONFIG_CLIENT } from '@/config/client';
import { trimHttpProtocol } from '@/utils/strings';

import type { Metadata } from '@/types/common';
import type { ValueUnion } from '@/types/utils';

// can't import getDefaultOpenGraphImagePath here, circular dependency

const { SITE_URL, SITE_DESCRIPTION, SITE_TITLE } = CONFIG_CLIENT;

const domain = trimHttpProtocol(SITE_URL);

/** Must be url from public folder. */
export const defaultOgImage = `${SITE_URL}/images/default/default-open-graph-image-library.jpg`;

export const titleSeparator = '-';

/**
 * The satori canvas size in src/pages/api/open-graph/[...route].png.ts.
 *
 * og:image:width and og:image:height must match the image actually served or
 * they are worse than absent, so the generator and the meta tags both read
 * this rather than each carrying their own literal.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * og:locale wants the language_TERRITORY form, so the plain 'en' on <html> in
 * src/layouts/Base.astro cannot be reused directly. GB rather than US because
 * the posts and pages consistently use British spelling (realise, behaviour,
 * optimise, organisation, licence).
 */
export const OG_LOCALE = 'en_GB';

/**
 * Body background of the default light theme, measured from the built site.
 * ThemeScript.astro overwrites the theme-color tag with the live computed
 * background about a second after load; this is what the tag carries until
 * then, and for anyone without JavaScript.
 */
export const THEME_COLOR_LIGHT = '#f8fafc';

export const DEFAULT_METADATA: Required<Metadata> = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: defaultOgImage,
  noindex: false,
  ogType: 'website',
} as const;

/**
 * Metadata for all pages that aren't defined in markdown.
 * Add it here for every new page.
 * Reused for ogImage api route.
 */
export const PAGE_METADATA = {
  // list pages
  // must have 'list' prefix to omit type arg
  'lists/blog': {
    title: 'Blog',
    description:
      'Welcome to my blog, which includes the lessons I learned while working on cool projects, ideas about Software Quality Assistance and related topics.',
  },
  'lists/blog/tags': {
    title: 'Tags',
    description: `Every tag used across the posts on ${domain}.`,
  },
  'lists/blog/tags/tag': {
    title: 'Tag',
  },
  // 'src/pages/blog/tags/[tag]/[...page].astro' // dynamic tag param
  'lists/blog/explore': {
    title: 'Explore',
    description: `Browse the posts on ${domain} by tag or category.`,
  },
  'lists/blog/categories': {
    title: 'Categories',
    description: `Every category used across the posts on ${domain}.`,
  },
  'lists/blog/categories/category': {
    title: 'Category',
  },
  'lists/links': {
    title: 'Links',
  },
} as const;

export type PageMetadataKey = keyof typeof PAGE_METADATA;

export const OG_IMAGE_PREFIXES = {
  OG_BLOG: 'blog',
  OG_PAGES: 'pages',
  OG_LISTS: 'lists',
} as const;

export type OgImagePrefixType = ValueUnion<typeof OG_IMAGE_PREFIXES>;
