import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// must use relative imports, and their entire import subtrees
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
//
// all relative imports in subtree
// any of these files must not import CONFIG with env vars
import { envSchema, PROCESS_ENV } from './src/config/process-env';
import { expressiveCodeIntegration } from './src/libs/integrations/expressive-code';
import { sitemapIntegration } from './src/libs/integrations/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMermaid from 'rehype-mermaid';

const { SITE_URL } = PROCESS_ENV;
const remarkPlugins = [remarkReadingTime];

export default defineConfig({
  site: SITE_URL,
  //experimental: { env: envSchema },
  trailingSlash: 'ignore',
  env: envSchema,
  legacy: {
    collections: true,
  },
  // default
  compressHTML: true,
  server: {
    host: true,
    port: 3005,
  },
  devToolbar: { enabled: false },
  integrations: [
    expressiveCodeIntegration(),
    sitemapIntegration(),
    react(),
    mdx(),
    icon({ iconDir: 'src/assets/icons' }),
    partytown({
      config: { forward: ['dataLayer.push'] },
    }),
  ],
  markdown: {
    remarkPlugins,
    rehypePlugins: [
      rehypeMermaid,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
});
