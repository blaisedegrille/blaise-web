# Architecture

## Overview

Blaise Web is a personal website built with Astro 5.x, designed as a minimal but extensible personal presence. It uses Astro Content Collections for blog management and Tailwind CSS v4 for styling.

## Core principles

- **Static-first:** All assets are built and deployed as static files.
- **Type-safe:** Full TypeScript strict mode for compile-time safety.
- **Agent-friendly:** Machine-readable configuration and clear conventions for automation.
- **Simplicity:** Avoid over-engineering; use the right tool for the job.

## Tech stack

See [AGENTS.md](./AGENTS.md) for the complete stack with versions.

## Design decisions

### Static site vs SPA

**Chosen: Static site generation with Astro**

- Faster load times and SEO benefits.
- No client-side hydration overhead.
- Simple deployment to GitHub Pages.
- Good enough interactivity via CSS and simple client scripts.

### Tailwind CSS v4 via Vite plugin

**Chosen: `@tailwindcss/vite` plugin**

- Native Vite integration, no separate PostCSS config.
- CSS-first customization tokens (in global.css).
- Better performance and smaller bundle sizes.
- Future-forward approach aligned with Tailwind v4 strategy.

### Biome for lint/format

**Chosen: Biome 2.3+ (instead of ESLint + Prettier)**

- Faster, single tool for linting and formatting.
- Built-in Astro support (with opt-in flags).
- Consistent code style across JS/TS/ASTro/CSS.
- Less configuration overhead.

### Content collections

**Chosen: Astro Content Collections**

- Type-safe collection queries.
- Built-in validation via `z` schema.
- Draft flag for internal vs publishable posts.
- Easy to extend with other content types.

### Testing strategy

**Chosen: Vitest only (no Playwright)**

- Unit and component testing stay server-side.
- Deferred browser e2e testing (future consideration).
- Sufficient for this project scope.

## Module layout

### src/

```
src/
├── layouts/
│   └── BaseLayout.astro          # Global layout with Header/Footer
├── components/
│   ├── Header.astro              # Site navigation
│   ├── Footer.astro              # Footer with copyright
│   └── PostCard.astro            # Blog post card component
├── pages/
│   ├── index.astro               # Landing page
│   └── blog/
│       ├── index.astro           # Blog list page
│       └── [...slug].astro       # Individual blog post
├── styles/
│   └── global.css                # Global styles with Tailwind import
├── content.config.ts             # Astro Content Collections config
└── content/
    └── blog/
        └── *.mdx                 # Blog posts (Markdown + MDX)
```

## Data flow

1. User requests static URL (e.g., `/blog`).
2. Astro builds route at compile time (or serves from cache in dev).
3. Astro loads content collections from `src/content/`.
4. Template files render with content and frontmatter data.
5. Static HTML + CSS generated into `dist/`.

## Extension points

### Adding new pages

- Create new `.astro` file in `src/pages/`.
- Use `BaseLayout` for consistency.

### New content type

- Define schema in `src/content.config.ts`.
- Add new `defineCollection()` call.
- Update `export const collections`.

### New component

- Create `.astro` in `src/components/`.
- Use `<style scoped>`.
- Export TypeScript interface for props.

### Custom styling

- Use Tailwind classes.
- Extend theme in `src/styles/global.css` if needed (v4 CSS-first).

## Deployment

- Build output: `dist/`.
- GitHub Actions build and deploy to GitHub Pages.
- Default base path: `/blaise-web`.
- Custom domain: add `CNAME` in public/ with domain; base must be `/`.

## Future considerations

- Add more content types (projects, talks, etc.).
- Integrate analytics (simple GA or Plausible).
- Add dark mode (via Tailwind class strategy).
- Add search (local index via client script).
- Consider Playwright for e2e tests in future.

## Risks and mitigations

**Biome Astro frontmatter lint bug**

- Known issue: `lint --write` is non-idempotent on `.astro` frontmatter (#7912).
- Mitigation: pin Biome version, avoid `--unsafe`, run lint read-only on `.astro`.

**Base path misconfiguration**

- Can break GitHub Pages deployment.
- Mitigation: set `PUBLIC_BASE_PATH` env var, test `build` and preview, confirm `dist` URLs.

## References

- [AGENTS.md](./AGENTS.md) — conventions and commands
- [CONTRIBUTING.md](./CONTRIBUTING.md) — contribution standards
- Astro docs: https://docs.astro.build