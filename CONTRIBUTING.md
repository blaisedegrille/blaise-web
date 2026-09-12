# Contributing

## Getting started

```bash
corepack enable          # or install pnpm 12+
pnpm install
pnpm dev                 # http://localhost:4321
```

## Branches & commits

- Never commit to `main` directly. Use feature branches: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) — enforced by the lefthook `commit-msg` hook:
  - `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`
  - Optional scope: `fix(nav): correct active link`
  - Breaking changes: append `!` (`feat!: drop legacy routes`)

## Quality gates (Definition of Done)

Run `pnpm validate` before opening a PR. It runs:

1. `pnpm typecheck` — `astro check` (0 errors required)
2. `pnpm lint` — Biome (including `.astro` a11y rules)
3. `pnpm test` — Vitest
4. `pnpm build` — production build must succeed

Additional requirements:

- New logic needs tests in `src/**/*.test.ts`.
- Behavior changes update the docs (`AGENTS.md`, `ARCHITECTURE.md`, `docs/*`).
- Rendering must not regress (`pnpm dev` + `pnpm build`).

## Pre-commit hook

lefthook runs `biome check --staged` before every commit. If it fails, fix and re-`git add`.

> Known Biome bug (biomejs/biome#7912): avoid `biome lint --write` on `.astro` files — safe fixes can corrupt frontmatter. If that happens: `git checkout -- <file>` and fix manually.

## Pull requests

Use `.github/PULL_REQUEST_TEMPLATE.md`. CI (`.github/workflows/ci.yml`) runs the same gates on every PR.

## Boundaries

Do not touch: `dist/`, `.astro/`, `node_modules/`, `pnpm-lock.yaml`, `session-*.md`, `plan.txt`.
