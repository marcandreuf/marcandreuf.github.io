import type { COLLECTIONS } from '@/constants/collections';
import type { Page } from 'astro';
import type { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import type { ComponentProps } from 'astro/types';

export type CollectionType = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export type AnyCollection = CollectionEntry<CollectionType>;

/** add more maybe */
export interface Metadata {
  title: string;
  description?: string;
  /** Must be url. */
  image?: string;
  /**
   * Emit `robots: noindex, follow`. For pages that duplicate content reachable
   * elsewhere (the /blog/explore/ tree mirrors /blog/tags/ and /blog/categories/)
   * and so should stay browsable for people but out of the index.
   */
  noindex?: boolean;
  /**
   * og:type. 'article' for a single post, 'website' for everything else.
   * Defaults to 'website' via DEFAULT_METADATA.
   */
  ogType?: 'website' | 'article';
  /**
   * Only set on a single post, alongside `ogType: 'article'`. Feeds the
   * `BlogPosting` node in the JSON-LD; nothing else reads it.
   */
  article?: {
    publishDate: Date;
    updatedDate?: Date;
  };
}

/**
 * Metadata after the defaults have been merged in.
 *
 * Every field resolves to a value except `article`, which has no sensible
 * default: it is present on a single post and genuinely absent everywhere else.
 */
export type ResolvedMetadata = Required<Omit<Metadata, 'article'>> & Pick<Metadata, 'article'>;

export interface PaginationProps
  extends Pick<
    Page<AnyCollection>,
    'url' | 'currentPage' | 'lastPage' | 'start' | 'end' | 'total'
  > {}

export type AstroImageProps = ComponentProps<typeof Image>;
