import { slug } from 'github-slugger';

/**
 * Url-safe form of a tag name, for use as a route param.
 *
 * Tag names are free text in post frontmatter and many contain spaces ('home
 * lab', 'jax london') or punctuation ('node.js'). Used raw they produced
 * percent-encoded urls like /blog/tags/home%20lab/, which are ugly to share and
 * a nuisance for anything that maps a url back to a file path.
 *
 * The display name is always the original tag; only the url uses this. Pass the
 * original through `props` in getStaticPaths rather than trying to reverse a
 * slug, which is lossy.
 *
 * Note this is the stateless `slug` export, not the GithubSlugger class used in
 * Heading.astro. That one appends -1, -2 to repeats to keep heading anchors
 * unique within a page, which here would make a tag's url depend on build order.
 */
export const slugifyTag = (tag: string): string => slug(tag);

/**
 * Categories the slugger would mangle. It drops punctuation rather than
 * replacing it, so 'Tips&Tricks' becomes 'tipstricks' and 'Q.Assistance'
 * becomes 'qassistance' - both worse to read than what they replace. These two
 * are spelled out by hand instead.
 */
const CATEGORY_SLUG_OVERRIDES: Record<string, string> = {
  'Tips&Tricks': 'tips-and-tricks',
  'Q.Assistance': 'q-assistance',
};

/**
 * Url-safe form of a category name, for use as a route param.
 *
 * Same contract as `slugifyTag`: the display name is always the original, only
 * the url uses this, and the original travels through `props` in
 * getStaticPaths rather than being reconstructed.
 *
 * All five categories are slugified, not just the two malformed ones, so the
 * lowercasing happens once. Paths are case-sensitive, so /blog/categories/
 * AppSec/ and .../appsec/ are separate urls to a crawler.
 */
export const slugifyCategory = (category: string): string =>
  CATEGORY_SLUG_OVERRIDES[category] ?? slug(category);
