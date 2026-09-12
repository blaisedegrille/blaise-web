/**
 * Conventional Commit message checker (lefthook commit-msg hook).
 * Exit 0 when the first line matches the Conventional Commits format.
 */
import { readFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('commit-msg: no message file provided')
  process.exit(1)
}

const message = readFileSync(file, 'utf8').split('\n')[0].trim()
const pattern =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9-]+\))?!?: .+/

if (!pattern.test(message)) {
  console.error(
    `\ncommit-msg: invalid commit message:\n  "${message}"\n\n` +
      'Use Conventional Commits format, e.g.:\n' +
      '  feat: add search to blog\n' +
      '  fix(nav): correct active link state\n' +
      '  docs: update deployment guide\n',
  )
  process.exit(1)
}

process.exit(0)
