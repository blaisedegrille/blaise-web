---
description: Run all quality gates and summarize failures
agent: build
---

Run the project's quality gates in order and report results:

1. `pnpm typecheck` (astro check)
2. `pnpm lint` (biome lint .)
3. `pnpm test` (vitest run)
4. `pnpm build` (astro build)

Rules:
- Fix any failure you can fix safely, then re-run the failed gate only.
- If a failure is not safely fixable (ambiguous behavior change, missing spec), stop and explain the root cause with file paths and line numbers.
- Do NOT use `--write`/`--unsafe` flags on `.astro` files (known Biome bug, see AGENTS.md).
- End with a one-line summary: which gates pass, which failed, and what you changed.
