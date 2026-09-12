---
description: Create a new blog post with correct frontmatter
agent: build
---

Create a new blog post in `src/content/blog/` with filename `$ARGUMENTS.mdx`.

Requirements:
- Follow `docs/content-authoring.md` and the schema in `src/content.config.ts`.
- Frontmatter: `title` (string, required), `description` (string, recommended), `published` (ISO date, today), `tags` (array of lowercase-kebab-case strings), `draft` (set `true` if the post is not ready).
- Body: at minimum an intro paragraph and one `##` section.
- After creating the file, run `pnpm typecheck` and `pnpm build` to confirm the post renders.
- Show the user the file path and the URL the post will be served at (base path is `/blaise-web` by default).
