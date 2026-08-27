import { ROUTES } from '@/constants/routes';
import { CONFIG_CLIENT } from '@/config/client';

const { BUSINESS_URL } = CONFIG_CLIENT;

/**
 * Doesn't contain Home nav item.
 *
 * `path` is normally an internal route from ROUTES, but an entry may also be an
 * absolute external url. Consumers detect that from the value itself rather
 * than from a flag, so nothing here has to be kept in sync.
 */
export const NAVIGATION_ITEMS = [
  {
    title: 'Blog',
    path: ROUTES.BLOG,
  },
  {
    title: 'Portfolio',
    path: ROUTES.PORTFOLIO,
  },
  // {
  //   title: 'Explore',
  //   path: ROUTES.EXPLORE,
  // },
  // {
  //   title: 'Tags',
  //   path: ROUTES.TAGS,
  // },
  // {
  //   title: 'Categories',
  //   path: ROUTES.CATEGORIES,
  // },
  {
    title: 'About',
    path: ROUTES.ABOUT,
  },
  {
    title: 'Services',
    path: BUSINESS_URL,
  },
  // {
  //   title: 'Links',
  //   path: ROUTES.LINKS,
  // },
  // {
  //   title: 'Resume',
  //   path: ROUTES.RESUME,
  // },
] as const;

/** An external nav target is an absolute url; everything else is a site route. */
export const isExternalNavPath = (path: string): boolean => /^https?:\/\//.test(path);
