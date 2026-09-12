# Deploying

The site deploys to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

## One-time repo setting

In GitHub: **Settings → Pages → Build and deployment → Source** = **GitHub Actions**. Without this, the deploy job fails.

## URLs & base path

| Target | `PUBLIC_SITE_URL` | `PUBLIC_BASE_PATH` |
|--------|-------------------|--------------------|
| Project page (default) | `https://blaisedegrille.github.io` | `/blaise-web` |
| Custom domain | `https://<your-domain>` | `/` |

Defaults are set in `astro.config.mjs` and overridable via `.env` (see `.env.example`) or CI env vars.

**Custom domain checklist:**

1. Create `public/CNAME` containing the domain (e.g. `blaise.dev`).
2. Set DNS records per GitHub's docs.
3. Set `PUBLIC_BASE_PATH=/` (and `PUBLIC_SITE_URL=https://<your-domain>`) in the deploy workflow env.
4. Update `AGENTS.md`'s "Deployment notes" — the base path changes internal link behavior (tests in `src/lib/utils.test.ts` cover `withBase`).

## Verifying a release

```bash
pnpm build                                    # artifacts land in dist/
pnpm preview                                  # serve dist/ locally
```

Then confirm: pages load under the base path, sitemap exists (`dist/sitemap-index.xml`), and `base` is baked into asset URLs.

## Deploy workflow

1. `build` job: pnpm install (cached) → `pnpm build` → upload `dist/` artifact.
2. `deploy` job: `actions/deploy-pages` publishes the artifact to the `github-pages` environment.

Deployments are concurrency-grouped — a new push to `main` cancels an in-flight deploy.
