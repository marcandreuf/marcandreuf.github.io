import { DEFAULT_METADATA, PAGE_METADATA, titleSeparator } from '@/constants/metadata';
import { CONFIG_CLIENT } from '@/config/client';
import { getOpenGraphImagePath } from '@/libs/api/open-graph/image-path';
import { trimHttpProtocol } from '@/utils/strings';

import type { Metadata } from '@/types/common';
import type { PageMetadataKey } from '@/types/constants';

// can't import getDefaultOpenGraphImagePath here, circular dependency

const { AUTHOR_NAME, SITE_URL } = CONFIG_CLIENT;

const domain = trimHttpProtocol(SITE_URL);

export const getPageMetadata = (path: PageMetadataKey): Metadata => {
  const image = getOpenGraphImagePath(path);
  const metadata: Metadata = { ...PAGE_METADATA[path], image };

  return metadata;
};

export const handleTitle = (metadata: Metadata): Metadata => {
  const { title: passedTitle } = metadata;
  const { title: defaultTitle } = DEFAULT_METADATA;

  const newMetadata = {
    ...metadata,
    title: passedTitle ? `${passedTitle} ${titleSeparator} ${AUTHOR_NAME}` : defaultTitle,
  };

  return newMetadata;
};

/**
 * The tag and category listing pages had no description of their own, so every
 * one of them fell back to SITE_DESCRIPTION and shipped the same sentence. That
 * was 51 of the 99 urls in the sitemap presenting identical text.
 *
 * These are derived from the page's own subject rather than written per page, so
 * a new tag needs no new copy and nothing here can drift out of date.
 */
export const getTagDescription = (tagName: string): string =>
  `Posts tagged #${tagName} on ${domain}.`;

export const getCategoryDescription = (categoryName: string): string =>
  `Posts in the ${categoryName} category on ${domain}.`;

/**
 * Page two onward of a paginated listing is self-canonical but otherwise carries
 * byte-identical title and description to page one, which reads as duplicate
 * content. Disambiguate instead of canonicalising back to page one: these pages
 * are the only crawl path to the older posts, so de-indexing them would cost
 * more than the duplication does.
 *
 * Page one is returned untouched, so the bare /blog/ title keeps its current form.
 */
export const withPageNumber = (metadata: Metadata, currentPage: number): Metadata => {
  if (currentPage <= 1) return metadata;

  const { title, description } = metadata;

  return {
    ...metadata,
    title: `${title} (page ${currentPage})`,
    ...(description ? { description: `${description} Page ${currentPage}.` } : {}),
  };
};
