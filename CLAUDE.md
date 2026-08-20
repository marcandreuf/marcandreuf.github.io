# Working in this repo

Personal site and blog for Marc Andreu (**marcandreuf.com**), built with Astro, TypeScript and Tailwind. Deployed to GitHub Pages.

---

## 1. This repository is PUBLIC

**Everything you write here is world-readable, permanently and immediately:** source, commit messages, branch names, issue titles and bodies, pull request descriptions, and review comments. GitHub indexes it and it is trivially searchable. Deleting something later does not remove it from history, forks, or caches.

**Before you write anything into this repo — code, commit, issue, or PR — ask: would Marc be comfortable with a competitor, a client, or a prospective employer reading this exact text?** If the answer is anything other than a clear yes, it does not go here.

### Never put these in this repo

- **Commercial strategy**: pricing, rates, margins, discounts, revenue, pipeline
- **Positioning and market reasoning**: target customer definitions, competitor analysis, why an offer is framed a particular way, what was rejected and why
- **Client information**: client names, engagement details, contract terms, anything said in confidence. Do not name a client anywhere until Marc confirms that client has agreed in writing
- **Partner or personal information**: names of collaborators, business plans involving other people, relocation or employment plans
- **Anything about job applications or career plans**
- **Credentials, tokens, private hostnames, server addresses, internal infrastructure detail**
- **Anything sounding like an internal note**: "we decided", "the goal is to convert", "this is a stopgap", "Marc wants"

**`todo/` is public too.** It is excluded from the deploy, not from the repository. It is not a private scratchpad.

### Where the private material lives

Strategy, briefs, reference documents and anything under discussion live in **Marc's local `tasks/` folder, outside version control**. It is not in this repo and must not be copied into it.

If a task cannot be described publicly without leaking the reasoning behind it, **it does not become an issue here.** Say so and leave it in the brief.

---

## 2. Issues are implementation tasks only

An issue in this repo says **what to change, where, and how to know it is done.** Nothing else.

**Write:**

> **Add outbound links to It Quality Lab**
> Add a "Services" entry to the main navigation and a footer link, both pointing to `https://itqualab.com`.
> Done when: the link is present in the header and footer, resolves, and `pnpm build` passes.

**Do not write:**

> The hub currently sends no traffic to the offer that generates revenue, which is a funnel problem. Our ICP is mid-market CTOs, and the 1,900 EUR assessment needs...

Same task. The second version publishes commercial reasoning.

**Rules for issues:**

- Describe the change, the files, and the acceptance criteria
- No rationale beyond what a maintainer needs to implement it correctly
- No reference material, no discussion documents, no decision records
- If you need context to justify the work, that context stays in the brief and does not get pasted in
- Keep titles factual: "Fix experience year on the about page", not "Fix positioning inconsistency"

**Apply the same test to commit messages and PR descriptions.** They are as public as the issues.

---

## 3. Pushing to `main` publishes the site

`.github/workflows/deploy.yml` deploys to GitHub Pages on **every push to `main`**. There is no staging gate and no approval step. **Merging is publishing.**

- **Never push or commit directly to `main`.**
- Work on a branch. Open a **draft PR**.
- **Never merge your own PR.** Publishing is Marc's decision, every time.
- Do not run `workflow_dispatch` on the deploy workflow.
- The `deploy:nginx`, `deploy:docker` and `docker:build:push:*` scripts target Marc's own servers. **Do not run them.**

`paths-ignore` covers only `README.md` and `todo`. Everything else triggers a deploy.

---

## 4. Setup and verification

Requires **Node >= 22.12.0** and **pnpm 10.8.0**.

```sh
pnpm i
pnpm dev            # local dev server
pnpm build          # production build
pnpm check-types    # tsc --noEmit — the type gate
pnpm lint           # eslint
pnpm verify         # scripts/verify-build.mjs, runs against a build
pnpm format         # prettier
```

**Before opening a PR, `pnpm build`, `pnpm check-types` and `pnpm lint` must pass.** Render-check visually with `pnpm dev`.

State in the PR description what you verified and what you could not.

---

## 5. Content rules

**Do not invent positioning copy.** Headlines, taglines, bios and service descriptions are brand decisions, not implementation details. If a task needs wording that is not supplied in the issue or brief, **ask rather than writing your own.**

**These facts are confirmed. Do not derive them from anything else on the site, and do not change them:**

- **25 years of experience, professional since 2001.** The 2004 date in the work history is correct where it refers to the UAB Barcelona degree; it is wrong wherever it is used as a career start year.

**Linking out to It Quality Lab is fine and wanted.** The main navigation, the footer, and blog posts may link to `https://itqualab.com` and to its services and offers. Use the label given in the issue.

---

## 6. When you are blocked

**Stop and ask.** Do not guess at brand copy, do not name a client, do not publish to resolve an uncertainty, and do not paste private context into a public issue to explain yourself. A delay costs less than any of those.
