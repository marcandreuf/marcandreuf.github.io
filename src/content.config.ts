import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { postSchema } from '@/schemas/post';
import { BASE_FOLDERS } from '@/constants/collections';

const { POST } = BASE_FOLDERS;

/**
 * Posts are flat files: src/content/post/<name>.(md|mdx)
 *
 * No custom generateId: the glob loader's default strips the extension and
 * slugifies the path, which reproduces the ids the legacy collection produced,
 * so permalinks are preserved. Upstream needs a custom generateId only because
 * their posts are nested as <year>/<name>/index.mdx.
 *
 * Because the id comes from the filename, renaming a post file changes its
 * permalink and needs a redirect at the edge.
 */
export const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: POST }),
  schema: postSchema,
});

// _schemas folder in collections will be included in type
export const collections = { post: postCollection };
