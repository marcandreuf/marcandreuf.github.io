# PR: External links open in a new tab (secure defaults)

This document contains everything needed to open a focused PR for external link behavior.

## Goal

Ensure external links rendered from markdown/MDX open in a new tab with secure `rel` attributes, while internal hash links stay unchanged.

## Scope

### 1) Markdown pipeline

Configure `rehype-external-links` in Astro markdown processing:

- `target: "_blank"`
- `rel: ["noopener", "noreferrer"]`

File:

- `astro.config.ts`

### 2) Anchor component fallback

Harden `src/components/astro-remote/Anchor.astro` to:

- detect external protocols (`http://`, `https://`, `//`, `mailto:`, `tel:`)
- skip hash links (`#...`)
- set `target="_blank"` and `rel="noopener noreferrer"` for external links

File:

- `src/components/astro-remote/Anchor.astro`

### 3) Dependency

Add plugin dependency:

- `rehype-external-links`

File:

- `package.json`

Lockfile:

- `pnpm-lock.yaml`

## Expected behavior

- External links open in a new tab.
- External links include `rel="noopener noreferrer"`.
- Internal anchors (e.g. table-of-contents `#section`) are not modified.

## Verification checklist

- `pnpm install`
- `pnpm build`
- Open a post/page with external links and verify:
  - new tab behavior
  - hash links still work on-page

## Suggested branch and commit

```bash
git checkout -b feat/external-links-target-blank
```

```bash
git add astro.config.ts src/components/astro-remote/Anchor.astro package.json pnpm-lock.yaml
```

```bash
git commit -m "feat(markdown): open external links in new tab with secure rel"
```

```bash
git push -u origin feat/external-links-target-blank
```

## PR title

`feat(markdown): open external links in new tab with secure rel`

## PR description

```md
## Summary

Adds consistent external-link behavior for markdown/MDX content:

- external links open in a new tab (`target="_blank"`)
- secure rel attributes are applied (`noopener noreferrer`)
- internal hash links remain unchanged

## Changes

- Configure `rehype-external-links` in `astro.config.ts`
- Add `rehype-external-links` dependency in `package.json`
- Harden fallback logic in `src/components/astro-remote/Anchor.astro`

## Validation

- `pnpm build` passes
- Verified external links open in new tab
- Verified hash links still navigate within page
```

## Notes

If your working tree has unrelated changes, stage only the files listed above to keep this PR focused.
