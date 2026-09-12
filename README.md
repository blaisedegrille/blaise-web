# Blaise Web

Personal website built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). A minimal landing page with a blog section.

## Stack

- Astro 5.x (static site generation)
- TypeScript (strict mode)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Astro Content Collections (blog posts)
- Biome (linting and formatting)
- Vitest (testing)
- pnpm (package manager)

## Getting started

```bash
pnpm install
pnpm dev      # Start development server (http://localhost:4321)
pnpm build    # Build for production
pnpm preview  # Preview production build locally
```

## Structure

- `src/pages/` — page files (landing, about, blog list, blog post)
- `src/layouts/` — page layouts (BaseLayout)
- `src/components/` — reusable components (Header, Footer, PostCard)
- `src/content/blog/` — blog posts (MDX files)
- `src/styles/global.css` — global styles with Tailwind import

## Documentation

- [AGENTS.md](./AGENTS.md) — canonical agent guide with conventions and commands
- [ARCHITECTURE.md](./ARCHITECTURE.md) — high-level design and decisions
- [CONTRIBUTING.md](./CONTRIBUTING.md) — contribution guidelines
- [docs/deploying.md](./docs/deploying.md) — deployment instructions

## License

All rights reserved. This is a proprietary project.

## Credits

Built with ❤️ using modern web technologies.