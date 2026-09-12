---
name: astro-component
description: Create or modify Astro components in this repo following project conventions (typed Props, Tailwind v4 utilities, scoped styles, base-path-aware links). Use when the user says "add a component", "create a component", or asks to build UI in src/components or src/layouts.
---

# Create an Astro component

1. File goes in `src/components/<PascalCase>.astro` (one component per file).
2. Frontmatter pattern — props always typed:

```astro
---
interface Props {
  title: string;
  variant?: 'default' | 'compact';
}

const { title, variant = 'default' } = Astro.props;
---
```

3. Styling: Tailwind CSS v4 utilities in the template (`class=""`). Use `class:list` for conditional classes. Scoped `<style>` only for things utilities can't express. Design tokens live in `src/styles/global.css` via `@theme` (CSS-first config).
4. Dark mode: pair utilities with `dark:` variants; the `.dark` class on `<html>` is toggled by `ThemeToggle.astro` (custom variant defined in `global.css`).
5. Links: always base-path-aware — use `withBase()` from `src/lib/utils.ts` or `import.meta.env.BASE_URL`. Never hardcode `/blog` or `/`.
6. Icons/SVGs: must include `<title>` and `aria-hidden="true"` for decorative icons (Biome a11y rules enforce this).
7. Verify: `pnpm typecheck` and `pnpm lint` pass; render the component in a page and run `pnpm build` before handing back.
