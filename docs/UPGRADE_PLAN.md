# Upgrade plan: sync with upstream (nemanjam/nemanjam.github.io)

Phased plan to close the gap with upstream. Every phase ends at a green gate,
so each can be committed, tested and (if needed) reverted independently.

Upstream remote is configured:

```bash
git fetch upstream        # git@github.com:nemanjam/nemanjam.github.io
```

Fork point: `717f08b` (Oct 13 2024). Upstream is 486 commits ahead, most of
which are their own blog content and a gallery module we deliberately skip.

## Standing decisions

These deviations from upstream are intentional. Do not "fix" them by taking
upstream's version.

| Area | Ours | Upstream | Decision |
| --- | --- | --- | --- |
| Tailwind | 4 via `@tailwindcss/vite` | 3 via `@astrojs/tailwind` | **Keep ours.** We are ahead. |
| ESLint | 9 | 8.57.0 pinned | **Keep ours** (once flat config lands, Phase 0). |
| `tailwind-merge` | 3 | 2 | Keep ours. |
| Mermaid | `rehype-mermaid` + playwright | none | Ours only. Must survive every phase. |
| Deploy | GitHub Pages | Vercel / nginx / Docker | Ignore all upstream deploy changes. |
| Gallery, projects, design pages, links, resume | removed | actively developed | Stay removed. |

## The gate

Every phase must end with all four green:

```bash
pnpm lint            # broken until Phase 0
pnpm check-types     # 4 pre-existing errors until Phase 0
pnpm build           # currently passes: 240 pages
node scripts/verify-build.mjs   # written in Phase 0
```

Local build needs a browser for `rehype-mermaid`:

```bash
pnpm exec playwright install chromium-headless-shell
```

CI already does this (`.github/workflows/deploy.yml`).

### What `verify-build.mjs` must assert

Codifies the invariants verified manually on 2026-07-20 so every later phase
is checked against the same bar:

1. Page count is 240 (adjust deliberately, never silently).
2. Every external link in a post body has `target="_blank"` **and**
   `rel="noopener noreferrer"`. Currently 0 violations.
3. Internal hash links (`href="#..."`) are never given `target`.
4. No `<a>` is injected inside `<pre>` or `<code>`.
5. expressive-code ran: `class="expressive-code"` present, `ec.*.css` and
   `ec.*.js` emitted.
6. Mermaid pre-rendered: inline `<svg>` with `aria-roledescription` present in
   `2025-03-27-mermaid-diagrams`, and zero leftover `language-mermaid` fences.
7. OG images: `/api/open-graph/*.png` emitted and non-empty.

---

## Phase 0 — Repair the test harness

No functional change. Purely so later phases have a meaningful gate.

- Migrate ESLint to flat config: add `eslint.config.js`, delete `.eslintrc.js`
  and `.eslintignore`. Keep the current plugin set (astro, mdx, tailwindcss,
  typescript-eslint).
- Fix the 4 type errors:
  - `src/utils/gradients.ts:5` — `tailwindcss/types/generated/colors` does not
    exist in Tailwind 4. Replace `DefaultColors` with a locally declared type,
    which also resolves the `:17` index-signature error.
  - `src/types/common.ts:9` — `CollectionType` resolves to `'post' | 'project'`
    but only `post` is defined in `src/content/config.ts`. Drop `project` from
    `src/constants/collections.ts`.
  - `src/pages/api/open-graph/[...route].png.ts:55` — wrap the sharp `Buffer`
    (`new Response(new Uint8Array(pngBuffer))`).
- Add `scripts/verify-build.mjs` per the assertions above.

**Gate:** all four commands green. This is the first time lint has run since
the ESLint 9 bump, so expect a batch of findings to triage.

**Risk:** low. **Revert:** trivial, touches no runtime behaviour.

---

## Phase 1 — Content layer, still on Astro 5

Fixes a live misconfiguration and de-risks Phase 2.

`src/content/config.ts` already uses the modern `glob()` loader, but
`astro.config.ts` still sets `legacy: { collections: true }`. They contradict
each other and Astro says so at every build:

```
[glob-loader] The glob() loader cannot be used for files in src/content when legacy mode is enabled.
[glob-loader] Skipped the following files that matched **/*.mdx: ...
```

The posts still render via the legacy path, but `legacy.collections` is
**removed in Astro 6**, so this is forced work.

- Move `src/content/config.ts` -> `src/content.config.ts` (upstream `2dacec7`).
- Delete the `legacy: { collections: true }` block from `astro.config.ts`.
- Move post files out of `src/content/post/` if the loader `base` requires it;
  check `BASE_FOLDERS` in `src/constants/collections.ts`.

**Gate:** standard gate, plus the `[glob-loader]` warning is gone and all 3
`.mdx` posts still render.

**Risk:** medium. Slug generation goes through `generateId` in the collection
config, so watch for URL changes. Diff the built route list before and after:
any change is a broken permalink.

---

## Phase 2 — Astro 6

Upstream reference: `2dacec7`. Take its code changes, not its `package.json`
(that also drags in Tailwind 3).

- `astro` 5.18 -> 6, `@astrojs/mdx` 4 -> 6, `@astrojs/markdown-remark` 6 -> 7,
  `@astrojs/react` 4 -> 5. Keep React 18 for now.
- `markdown: { remarkPlugins, rehypePlugins }` becomes
  `markdown: { processor: unified({ remarkPlugins, rehypePlugins }) }` with
  `import { unified } from '@astrojs/markdown-remark'`.
  **Our array also contains `rehypeMermaid`** — carry it through; upstream has
  no mermaid so their diff will not show it.
- `src/pages/blog/[slug].astro` — replace `fetchpriority="high" loading="eager"`
  on `<Image>` with `priority`.

**Gate:** standard gate. Mermaid and expressive-code assertions matter most
here, since both hang off the markdown processor being rewired.

**Risk:** high. This is the phase most likely to need iteration. The
`processor` API change is where mermaid could silently stop rendering, which
is exactly what assertion 6 catches.

---

## Phase 3 — React 19

Small surface: `src/components/react/ScrollToTop.tsx` is the only `.tsx`
component.

- `react`, `react-dom` 18.3 -> 19.2; `@types/react`, `@types/react-dom` to 19.
- `@astrojs/react` to whichever major pairs with Astro 6 and React 19.

Done separately from Astro 7 so a hydration regression is unambiguous.

**Gate:** standard gate, plus manually confirm the scroll-to-top button still
appears and works (it is client-hydrated; a static build check cannot see it).

**Risk:** low, given one component.

---

## Phase 4 — Astro 7

Upstream reference: `cccc01f`, which was **package.json + lockfile only**, no
code changes. Reassuring but not a guarantee for us, since our plugin set
differs.

- `astro` 6 -> 7 and the matching integration majors.
- Bump Node to 24 and pnpm to 11 (`engines`, `packageManager`). Our CI builds
  in `ghcr.io/marcandreuf/base-images/frontend-node22-pnpm-build:main` —
  **that image is pinned to Node 22 and must be rebuilt or repointed**, or CI
  will fail even when local passes.

**Gate:** standard gate, plus a CI run on the branch before merging.

**Risk:** medium, concentrated in the container image rather than the code.

---

## Phase 5 — zod 4

Surface: `src/schemas/config.ts`, `src/types/config.ts`,
`src/utils/validation.ts`.

- `zod` 3.25 -> 4.
- Astro 6 removed upstream's `vite.ssr.noExternal: ['zod']` workaround (the
  old zod-v3-for-collections / zod-v4-for-config split). We never had that
  hack, so nothing to unwind, but check for error-format changes in
  `validateData`.

**Gate:** standard gate, plus deliberately break an env var (unset `SITE_URL`)
and confirm the validation error is still readable.

**Risk:** low-medium. zod 4 changes error shapes more than schema syntax.

---

## Phase 6 — Remaining dependency drift

Batch the low-risk bumps once the framework is settled: `sharp` 0.34 -> 0.35,
`satori` 0.12 -> 0.26, `feed` 4 -> 6, `dotenv` 16 -> 17,
`object-treeify` 4 -> 5, `astro-expressive-code` 0.37 -> 0.44,
`@expressive-code/plugin-collapsible-sections` to match.

`satori` and `feed` are the ones with real API churn; both are exercised by
assertion 7 and by the RSS routes.

**Deferred decision:** upstream moved to `typescript` 7. Recommend staying on
5.9 until the rest is green, then evaluating separately.

**Gate:** standard gate.

**Risk:** medium for satori/feed, low for the rest.

---

## Phase 7 — Cherry-picks from upstream

Independent of the upgrade chain. Each is its own commit and gate.

| # | Change | Files | Value |
| --- | --- | --- | --- |
| 7a | Shiki instance cache | `src/libs/integrations/expressive-code.ts` | Stops multiple Shiki instances spawning in dev. 12 lines. Do first, it is trivial. |
| 7b | Pagination double-slash fix | upstream `0376728` | Real URL bug. |
| 7c | Ignore `updatedDate` for sorting | upstream `8c0088b` | Post ordering correctness. |
| 7d | OG image rework | `src/libs/api/open-graph/template-props.ts` (163 lines), `src/pages/api/open-graph/[...route].png.ts` (97) | Largest single item. Deterministic randomness + satori caching. Best done **after** Phase 6 since it moves with satori. |
| 7e | `libs/git.ts` + `types/git.ts`, `constants/git.ts` | 78 lines + 2 new files | Take only if the git-metadata feature is actually used. |
| 7f | Misc small diffs | `Footer.astro` (50), `constants/image.ts` (35), `BaseHead.astro` (32), `schemas/config.ts` (59) | Review individually; some are Vercel-specific and should be skipped. |

Note `0376728` also enables native view transitions upstream. We currently
have `@view-transition` in `BaseHead.astro` with `ClientRouter` commented out
(known Firefox distortion). Evaluate separately, do not take blind.

---

## Suggested branches

```
fix/external-links-rel      done, committed c95587e
chore/phase0-test-harness
chore/phase1-content-layer
chore/phase2-astro-6
chore/phase3-react-19
chore/phase4-astro-7
chore/phase5-zod-4
chore/phase6-deps
chore/phase7a-shiki-cache   ... etc
```

Phase 7a and 7b are independent of everything and can be done at any time,
including first, for a quick win.
