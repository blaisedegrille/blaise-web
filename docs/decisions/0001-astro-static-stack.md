# ADR-0001: Static site stack — Astro 7 + Tailwind v4 + Biome

- **Status:** Accepted
- **Date:** 2026-09-12
- **Deciders:** Blaise

## Context

This repository starts empty and hosts a personal website: a landing page plus a blog. It is also explicitly an **AI-native repo** — the primary "developer" is often an AI coding agent (opencode, Cursor). Everything (framework, tooling, docs) must be legible and verifiable by agents.

## Decision

1. **Framework: Astro 7** with static output and Content Collections (glob loader + zod schemas) for the blog.
2. **Styling: Tailwind CSS v4** via `@tailwindcss/vite`, CSS-first configuration (`@theme`, `@custom-variant`).
3. **Language: TypeScript strict**, typed props via `interface Props` in `.astro` frontmatter.
4. **Toolchain: Biome 2.5** for lint + format (single tool, Astro full support opt-in), **Vitest** for unit tests, **lefthook** for git hooks.
5. **Deployment: GitHub Pages** project site via GitHub Actions (`actions/deploy-pages`), base path `/blaise-web` overridable by env.
6. **Agent layer:** canonical `AGENTS.md`, `opencode.json` + commands/subagents/skills, `.cursor/rules/*` (thin, pointing at `AGENTS.md`), shared GitHub MCP server.
7. **No license** (proprietary, all rights reserved). No Playwright/e2e for now.

## Alternatives considered

- **Next.js / SvelteKit** — heavier runtime than needed for a content site; more agent surface to maintain.
- **Hugo/Eleventy** — excellent static output, but fewer typed-component ergonomics and a weaker component model for iterating with agents.
- **ESLint + Prettier** — best-effort Astro coverage via plugins, but three tools where one (Biome) suffices.
- **Playwright now** — deferred; unit gates + build checks cover current scope. Revisit if UI regressions appear.

## Consequences

- Agents have one canonical spec (`AGENTS.md`), one command per concern, and one gate to satisfy (`pnpm validate`).
- Tailwind v4's CSS-first config means no `tailwind.config.js` to drift.
- Known risk: Biome `--write` on `.astro` frontmatter is non-idempotent (biomejs/biome#7912) — `.astro` files are linted read-only; documented in `AGENTS.md` and `CONTRIBUTING.md`.
- Astro major upgrades (5 → 7) change content APIs (`slug` → `id`, `render()` → `render(post)`); content config lives in `src/content.config.ts` using the glob loader to stay current.
- Proprietary licensing keeps the door open for a commercial use later; adding a license later is trivial.
