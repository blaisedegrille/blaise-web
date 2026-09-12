# Writing content

All site content lives in `src/content/blog/` as `.mdx`, validated by the `blog` collection schema in `src/content.config.ts`.

## Creating a post

1. Pick a slug — lowercase-kebab-case, 2–5 words. The filename becomes the URL: `my-post.mdx` → `/blaise-web/blog/my-post/`.
2. Add frontmatter:

```mdx
---
title: A clear, human title
description: One-sentence summary used for SEO and the blog list.
published: 2026-09-12
tags: [astro, meta]
draft: true
---
```

3. Write the body: an intro paragraph (no heading), then `##` sections.

## Frontmatter reference

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `title` | `string` | yes | Rendered as `h1` and in the list |
| `description` | `string` | no | SEO description + list preview |
| `published` | ISO date | yes | Drives sorting (newest first) |
| `tags` | `string[]` | no | kebab-case, default `[]` |
| `image` | `string` | no | OG/preview image path |
| `draft` | `boolean` | no | Default `false`; drafts are hidden everywhere |

## MDX gotchas

- MDX parses `{...}` and `<...>` as JSX — escape braces in prose: `\{this\}`.
- Fenced code blocks must declare a language: ` ```ts `.
- Em-dashes, quotes, and markdown are fine; HTML entities are unnecessary.

## Publishing workflow

1. Create with `draft: true`, review with `pnpm dev`.
2. When ready, set `draft: false`.
3. Run `pnpm validate` — the build fails on schema violations (bad `published` dates, missing `title`).
4. The sitemap updates automatically on the next deploy.

Tip: with opencode, run `/new-post my-post-slug` to scaffold a post.
