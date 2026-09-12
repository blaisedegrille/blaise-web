---
description: Validate, then summarize changes for a pull request
agent: build
---

Prepare the current work for shipping:

1. Run `pnpm validate` (typecheck, lint, test, build). Fix any failures.
2. Run `git status` and `git diff` to review all pending changes.
3. Produce a PR-ready summary:
   - A one-line Conventional Commits title (feat/fix/docs/chore scope where helpful).
   - A short body describing what changed and why.
   - A checklist of quality gates with pass/fail status.
4. Do NOT commit or push. Present the suggested commit message and stop for user confirmation.
