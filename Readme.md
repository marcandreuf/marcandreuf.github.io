# Marc Andreu website & blog

Personal website + technical blog built with Astro, MDX, and Tailwind CSS v4.

## Overview

This repository powers:

- Personal profile pages
- Blog posts with categories/tags and pagination
- Rich MDX content (code blocks, Mermaid diagrams, embeds)
- Open Graph image generation for posts/pages
- RSS/JSON feeds

The project is based on a fork of `nemanjam/nemanjam.github.io` and adapted for Marc Andreu’s branding, content, and deployment setup. Becuse Nemanjam had the best Astro template for Indie developers. 

## Tech stack

- **Framework**: Astro 5
- **Content**: MDX + Astro Content Collections
- **Styling**: Tailwind CSS v4 + typography plugin
- **UI pieces**: Astro components + a small React island (`ScrollToTop`)
- **Markdown plugins**:
	- `rehype-mermaid` (diagram rendering)
	- `rehype-external-links` (external links open in new tab securely)
	- custom `remark-reading-time`
- **Images**: `astro:assets` + Sharp
- **Comments**: Giscus
- **Analytics**: Plausible (optional)

## Requirements

- Node.js `>= 22.9.0`
- pnpm (project uses `pnpm` lockfile and scripts)

## Getting started

Install dependencies:

```bash
pnpm install
```

Start dev server:

```bash
pnpm dev
```

Type-check:

```bash
pnpm check-types
```

Lint:

```bash
pnpm lint
```

Build for production:

```bash
pnpm build
```

Preview static build:

```bash
pnpm preview
```

## Environment configuration

Environment is loaded from a file matching `NODE_ENV`:

- `NODE_ENV=development` → `.env.development`
- `NODE_ENV=production` → `.env.production`

Required/important variables:

- `NODE_ENV`
- `SITE_URL`
- `PREVIEW_MODE` (optional)
- `PLAUSIBLE_SCRIPT_URL` (optional)
- `PLAUSIBLE_DOMAIN` (optional)

The values are validated at startup (`src/config/process-env.ts`, `src/schemas/config.ts`).

## Useful scripts

- `pnpm dev` — Astro dev server
- `pnpm build` — static build
- `pnpm preview` — local preview of built site
- `pnpm lint` — ESLint for Astro/TS/MDX
- `pnpm check-types` — TypeScript checks
- `pnpm format` — Prettier formatting

Deployment-oriented scripts:

- `pnpm build:nginx`
- `pnpm build:nginx:local`
- `pnpm deploy:nginx`
- `pnpm deploy:nginx:local`
- `pnpm deploy:docker`
- `pnpm deploy:docker:local`

## Content workflow

Blog posts live in `src/content/post/` and use MDX frontmatter validated by `src/schemas/post.ts`.

Collection config is in `src/content/config.ts` and currently defines a `post` collection with slug generation for nested post paths.

## Project structure (high level)

- `src/pages/` — routes and API endpoints
- `src/components/` — reusable UI components
- `src/layouts/` — page/post layouts
- `src/content/` — MDX posts and content collections
- `src/styles/` — Tailwind + layered CSS organization
- `src/libs/` — integrations, feed, OG image logic
- `scripts/` — deployment helper scripts
- `docker/` — docker-compose and Docker build files

## Credits

- Forked from: `nemanjam/nemanjam.github.io`



