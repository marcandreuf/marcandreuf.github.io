import { ROUTES } from '@/constants/routes';

/** Doesn't contain Home nav item. */
export const NAVIGATION_ITEMS = [
  {
    title: 'Blog',
    path: ROUTES.BLOG,
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
  // {
  //   title: 'Links',
  //   path: ROUTES.LINKS,
  // },
  // {
  //   title: 'Resume',
  //   path: ROUTES.RESUME,
  // },
] as const;
