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

**DONE — `e6316e5`.** This was substantially more than a file move plus a
config deletion; the plan above understated it. The legacy flag was masking two
bugs that would have bitten the moment the loader took effect: the glob pattern
was `**/*.mdx`, which would have dropped all 33 `.md` posts, and the custom
`generateId` assumed upstream's nested `<year>/<name>/index.mdx` layout, so on
our flat posts it would have emitted ids with the extension still attached. The
pattern widened to `**/*.{md,mdx}` and `generateId` was removed outright, since
the loader's default reproduces the legacy slugs exactly. Content layer entries
also expose `id` instead of `slug` and have no `.render()` method, so the post
cards, feed, `getStaticPaths`, `getRandomPosts` and `modules/post/common.ts` all
needed updating, and `blog/[slug].astro` now receives the entry as a prop. The
built route list came out byte for byte identical, so no permalink moved.

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
- **`@astrojs/react` stays on 5.x.** An earlier draft of this plan said to move
  it to "whichever major pairs with Astro 6 and React 19"; that major is 5.
  5.0.7 already declares `react: ^17 || ^18 || ^19`, so React 19 needs no
  integration bump, and `@astrojs/react` 6.0.0 published at the same timestamp
  as `astro` 7.0.0 (2026-06-22T10:10) — it is the Astro 7 companion and belongs
  to Phase 4. Bumping it here would drag Phase 4 forward and defeat the point of
  splitting these phases.

Done separately from Astro 7 so a hydration regression is unambiguous.

**Gate:** standard gate, plus manually confirm the scroll-to-top button still
appears and works (it is client-hydrated; a static build check cannot see it).

**Risk:** low, given one component.

**DONE — `c48a485`.** Two React 19 type breaks needed fixing: `useRef<T>(null)`
now yields `RefObject<T | null>`, so the `showLink`/`hideLink` parameters in
`ScrollToTop.tsx` widened to `React.RefObject<HTMLAnchorElement | null>`; and
the global `JSX` namespace is gone in `@types/react` 19, so `src/types/utils.ts`
imports `JSX` from `react`. Hydration was verified in a real browser, not just
by build: the button renders hidden at `scrollY` 0, the IntersectionObserver
effect reveals it at `scrollY` 3000, its `onClick` scrolls back to 0, and the
console showed no errors or hydration mismatches.

---

## Phase 4 — Astro 7

Upstream reference: `cccc01f`, which was **package.json + lockfile only**, no
code changes. Reassuring but not a guarantee for us, since our plugin set
differs.

- `astro` 6 -> 7 and the matching integration majors.
- ~~Bump Node to 24 and pnpm to 11 (`engines`, `packageManager`). Our CI builds
  in `ghcr.io/marcandreuf/base-images/frontend-node22-pnpm-build:main` —
  **that image is pinned to Node 22 and must be rebuilt or repointed**, or CI
  will fail even when local passes.~~ **Not required.** Astro 7 declares
  `node: >=22.12.0`, the same floor as Astro 6, so nothing here forces Node 24.
  See the outcome note below.

**Gate:** standard gate, plus a CI run on the branch before merging.

**Risk:** medium, concentrated in the container image rather than the code.

**DONE — `345ff12`.** package.json and lockfile only, as upstream `cccc01f`
suggested, but the reasoning in this section was wrong on two counts.

First, Astro 7 is not a quiet release: it moves to Vite 8, makes the Rust
compiler mandatory with stricter HTML validation, switches the default markdown
pipeline from remark/rehype to Sätteri, flips `compressHTML` from `true` to
`'jsx'`, removes `@astrojs/db` and the `astro:transitions` internals, and
reserves `src/fetch.ts`. It landed cleanly here only because this repo does not
touch most of that, and because Phase 2 had already pinned
`processor: unified({...})` with an explicit `@astrojs/markdown-remark`
dependency, which is precisely the documented opt-out from Sätteri. Had Phase 2
not done that, rehypeMermaid and expressive-code would both have gone dark in
this phase. `compressHTML: true` is likewise set explicitly in `astro.config.ts`,
so the default flip was a non-event.

Second, one bump this section did not anticipate was mandatory:
`@tailwindcss/vite` 4.2.1 peer-depends on `vite ^5 || ^6 || ^7`, so Vite 8
required moving it and `tailwindcss` to 4.3.3. `@astrojs/mdx` 7 was likewise
forced by its `astro ^7.0.0` peer.

`engines.node` was left at `>=v22.12.0` and `packageManager` at `pnpm@10.8.0`.
The CI base image question is therefore **unchanged by this phase**, not
escalated by it: the image must ship Node >= 22.12.0, which has been true since
Phase 2. It remains unverified.

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

**DONE — `b73f557`.** The risk note was right that error shapes moved
(`ZodError.errors` -> `.issues`, and `refine()` no longer takes a
message-building function), but it missed the one change that could have
shipped a silent behaviour bug rather than a compile error.

`PREVIEW_MODE` was `z.enum(booleanValues).transform(v => v === 'true')
.default('false')`. zod 4 redefines `default()` to short-circuit the pipeline
and type it against the *output*, so the transform no longer runs on the
default value. In TypeScript this surfaces as a type error, but the same code in
plain JS would have quietly produced the string `'false'` — which is truthy —
inverting preview mode whenever the env var was absent. The fix is
`prefault('false')`: zod 4's name for the old behaviour. Any future
`.transform().default()` chain in this repo deserves the same scrutiny.

Also worth knowing for later phases: `ZodSchema` is now a type-only export, so
it needs `import type` under `verbatimModuleSyntax`.

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

**DONE — `a976b38` (low risk), `6a22ece` (satori), `f544e15` (feed).** Split
into three commits rather than one batch so a regression stays attributable;
that paid off. Actual versions were further along than this section assumed:
satori 0.12 -> **0.28**, and `astro-expressive-code` was already on 0.44, so
only its patch was left. `typescript` stayed on 5.9 as recommended.

**The standard gate is not sufficient for this phase.** `pnpm verify` asserts
only that 47 open-graph PNGs exist and are non-empty. satori 0.28 stopped
coercing the string values that HTML `width`/`height` attributes produce, which
collapsed the avatar image to zero width, and **the gate passed anyway**. It was
caught only by opening a rendered PNG and comparing it to the previous one. The
template now sizes images in CSS. Whenever `satori` or `sharp` moves, open an
actual image; and `object-treeify` sits behind a `@ts-expect-error`, so it needs
a runtime check rather than a typecheck.

`feed` 6 needed no code change but does alter output: `<guid>` gains
`isPermaLink="false"`, four `<link>`s gain a trailing slash, and JSON feed items
carry `content_html` instead of `summary` (a spec-compliance fix, since v4
emitted no content field). Item counts and, critically, guid/id *values* are
unchanged, so no subscriber sees old posts resurface. Diff both feeds against
the previous build when this dependency moves.

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

### Status

| # | Outcome |
| --- | --- |
| 7a | **DONE — `b16306f`.** Taken verbatim; our config body already matched upstream, so the file is now identical to theirs. |
| 7b | **DONE — `45e9b57`.** Pagination half only; the view-transitions half of `0376728` was left out as flagged above. The bug was live: 134 double-slash hrefs across 40 pages, now zero. |
| 7c | **Already applied.** `src/modules/common.ts` already returns `entry.data.publishDate`. Only the comment wording differs from upstream. Nothing to take. |
| 7d | **Not taken.** See below, it has a prerequisite. |
| 7e | **Skipped, as the condition in the table says.** The git-metadata feature is not used here: `src/types/git.ts` and `src/constants/git.ts` do not exist, and our 37-line `src/libs/git.ts` is imported by nothing. It is dead code and a candidate for deletion rather than expansion. |
| 7f | **Not taken.** All four files have diverged 32-70 lines from upstream and several of those deltas are this fork's own (`schemas/config.ts` now carries the zod 4 migration; `BaseHead.astro` carries the deliberate view-transitions state). Taking upstream's versions would clobber fork-specific work. Needs a per-hunk review, not a file-level copy. |

### Open bug found while evaluating 7d

**Open-graph backgrounds render opaque black, not the intended gradient.**
`getRandomGradient()` emits `background: linear-gradient(...)` into a `style`
attribute, and the rendered PNG's corner pixel is `rgba(0,0,0,255)`. The palette
is deliberately light (shades 50-200 plus white) and the title is
`text-slate-900`, so the design intends dark text on a light background. What
actually ships is near-black text on black: every social share preview has a
barely legible title. This predates the upgrade chain, reproducing on satori
0.12 as well as 0.28, so it is not a regression from Phase 6.

Also note `getRandomGradient()` is seeded by `Math.random()`, so **all 47
open-graph PNGs change on every single build**, churning 47 binaries per deploy.
That is exactly what 7d's "deterministic randomness" addresses.

Fix the black background first, or fold it into 7d. Taking 7d as-is would port
a 260-line rework onto an OG pipeline that is already visibly broken, making it
hard to tell which change fixed or broke what.

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
