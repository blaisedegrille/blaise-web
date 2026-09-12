# AGENTS.md

## Project

Personal website built with Astro (v5+) and Tailwind CSS v4. Single-page landing + blog via Astro Content Collections.

## Tech stack

| Technology | Version |
|------------|---------|
| Astro | 7.x (static output, Content Collections with glob loader) |
| TypeScript | strict mode |
| Tailwind CSS | v4 via @tailwindcss/vite (CSS-first config) |
| zod | v4 (content collection schemas) |
| Biome | 2.5 (linting, formatting, Astro full support) |
| Vitest | unit tests (`src/**/*.test.ts`) |
| lefthook | git hooks (pre-commit lint, commit-msg) |
| pnpm | 12.x package manager |

## Repo layout

```
.
├── src/
│   ├── assets/
│   │   └── me-bw.jpeg           # Portrait used on the About page (bundled + optimized)
│   ├── layouts/
│   │   └── BaseLayout.astro      # Global layout with Header/Footer + SEO tags
│   ├── components/
│   │   ├── Header.astro          # Site navigation + ThemeToggle
│   │   ├── Footer.astro          # Footer with copyright
│   │   ├── ThemeToggle.astro     # Dark mode toggle (.dark class strategy)
│   │   └── PostCard.astro        # Blog post card component
│   ├── lib/
│   │   ├── utils.ts              # withBase(), formatDate() helpers
│   │   └── utils.test.ts         # Vitest tests for utils
│   ├── pages/
│   │   ├── index.astro           # Landing page
│   │   ├── about.astro           # About + contact page (portrait via astro:assets)
│   │   └── blog/
│   │       ├── index.astro       # Blog list page
│   │       └── [...slug].astro   # Individual blog post (getStaticPaths + render)
│   ├── styles/
│   │   └── global.css            # @import "tailwindcss" + @custom-variant dark
│   ├── content.config.ts         # Astro Content Collections config (glob loader + zod)
│   └── content/
│       └── blog/
│           └── *.mdx             # Blog posts (Markdown + MDX)
├── public/                       # Static assets
├── scripts/
│   └── commit-msg.mjs            # Conventional Commits checker (lefthook)
├── docs/
│   ├── deploying.md              # Deployment guide
│   ├── content-authoring.md      # Content guide
│   └── decisions/                # Architecture Decision Records
├── .opencode/                    # opencode commands, agents, skills
├── .cursor/                      # Cursor rules + MCP config
├── astro.config.mjs              # Astro config (site/base via env, Tailwind, MDX, sitemap)
├── biome.json                    # Biome lint/format config (v2 schema)
├── lefthook.yml                  # Git hooks config
├── vitest.config.ts              # Vitest config
├── opencode.json                 # opencode project config
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config
└── AGENTS.md                     # This file (canonical agent guide)
```

## Core commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Astro dev server (http://localhost:4321) |
| `pnpm build` | Build static site to `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run Astro type checks |
| `pnpm typecheck` | Alias for `check` |
| `pnpm lint` | Run Biome linter |
| `pnpm lint:fix` | Auto-fix with Biome |
| `pnpm lint:fix:unsafe` | Auto-fix with Biome (includes risky operations) |
| `pnpm format` | Auto-format with Biome |
| `pnpm format:check` | Check formatting without fixing |
| `pnpm test` | Run Vitest tests |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm validate` | Run all quality gates (typecheck, lint, test, build) |

## Astro & Tailwind conventions

- Layouts: Extend `BaseLayout.astro` in `src/layouts/`. Content goes into the `<slot />`.
- Components: Prefer Tailwind utilities in markup; use `<style scoped>` only when utilities can't express the design. Use TypeScript `interface Props` for component props.
- Tailwind: `@import "tailwindcss"` lives in `src/styles/global.css`, imported by `BaseLayout.astro`. Custom theme tokens go in `global.css` via `@theme`; dark mode uses the `.dark` class strategy via `@custom-variant`.
- Content rendering: use `getCollection`/`render` from `astro:content` (`const { Content } = await render(post)`); dynamic routes need `getStaticPaths` with `params: { slug: post.id }`.
- Static assets: Place in `public/` for serving at root (`/favicon.svg`, etc.). Images in `src/assets/` for bundling.
- Base path: Set `PUBLIC_BASE_PATH` env var (default `/blaise-web`). Internal links use `withBase()` from `src/lib/utils.ts` or `import.meta.env.BASE_URL` — never hardcode `/blog`.

## Content conventions

- Blog posts in `src/content/blog/` as `.mdx`.
- Frontmatter keys:
  - `title` — required string
  - `description` — optional string
  - `published` — ISO date string (required)
  - `tags` — optional array of strings, defaults to `[]`
  - `draft` — optional boolean, defaults to `false`
- Use content collection utilities for queries: `getCollection('blog')`, `getEntry('blog', 'slug')`.

## Biome & Astro caveats

- Biome 2.3+ has full support for Astro but has a known idempotency bug with `lint --write` on `.astro` frontmatter. Avoid `--unsafe` on `.astro` files. Use `pnpm lint:fix` for JS/TS/CSS only, and lint `.astro` read‑only.
- Biome auto-detects Biome config from `biome.json`. Set `html.experimentalFullSupportEnabled: true` for Astro template linting.
- Biome auto-detects pnpm from `package.json` `packageManager` field.

## Definition of Done

Before merging to main, every change must:
1. Pass all quality gates: `pnpm validate` succeeds.
2. Include tests for new logic (unit or integration).
3. Update docs (`AGENTS.md`, `ARCHITECTURE.md`, any `docs/*.md`) if behavior changes.
4. Not break existing page rendering (`pnpm dev` and `pnpm build` succeed).
5. Not introduce new `biome.json` changes (use existing config).

## Boundaries / Do not touch

- `dist/`, `.astro`, `.output` — generated build output, never edited directly.
- `node_modules/`, `pnpm-lock.yaml` — managed by pnpm.
- `session-*.md`, `plan.txt` — session artifacts, not part of the repo.

## Deployment notes

- GitHub Pages source is configured for GitHub Actions. Build outputs go to `dist/` and are deployed from there.
- Default base path: `/blaise-web`. Set `PUBLIC_BASE_PATH` to your desired path. For a custom domain, create `public/CNAME` with the domain name; base must be `/`.

## Where to find more

- `ARCHITECTURE.md` — high‑level design, decisions, and evolving spec.
- `CONTRIBUTING.md` — contribution guidelines and standards.
- `src/content.config.ts` — content schema and collection setup.