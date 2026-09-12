---
name: add-blog-post
description: Create a new blog post in src/content/blog following the site's MDX frontmatter schema and conventions. Use when the user says "write a post", "new blog post", "add a post about", or asks to publish content to the blog.
---

# Add a blog post

1. Ask for (or infer) the topic, then decide the slug — lowercase-kebab-case, ASCII, 2–5 words (e.g. `why-astro-static-sites`).
2. Create `src/content/blog/<slug>.mdx` with frontmatter:

```mdx
---
title: A clear, human title
description: One-sentence summary used for SEO and the blog list.
published: 2026-09-12
tags: [meta, astro]
draft: true
---
```

3. Schema is enforced by `src/content.config.ts`: `title` (string), `description` (string, optional), `published` (date, required), `tags` (string[], default `[]`), `image` (string, optional), `draft` (boolean, default `false`).
4. Body: intro paragraph, then `##` sections. MDX-safe syntax (escape `{`, `<` in prose).
5. Verify: `pnpm typecheck` and `pnpm build` must pass. The post URL is `BASE_URL + /blog/<slug>/` (default base `/blaise-web`).
6. Leave `draft: true` and tell the user how to publish (flip to `false`).

Rules: never delete or rename existing posts; never set `draft: false` without user confirmation.
