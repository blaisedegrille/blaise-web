import { describe, expect, it } from 'vitest'
import { formatDate, withBase } from './utils'

describe('withBase', () => {
  it('joins base and path', () => {
    expect(withBase('/blog/hello', '/blaise-web')).toBe('/blaise-web/blog/hello')
  })

  it('strips trailing slash from base', () => {
    expect(withBase('/blog', '/blaise-web/')).toBe('/blaise-web/blog')
  })

  it('adds a leading slash when missing', () => {
    expect(withBase('blog', '/blaise-web')).toBe('/blaise-web/blog')
  })

  it('works with root base', () => {
    expect(withBase('/blog', '/')).toBe('/blog')
  })
})

describe('formatDate', () => {
  it('formats ISO dates in UTC', () => {
    expect(formatDate(new Date('2026-09-12T00:00:00Z'))).toBe('September 12, 2026')
  })

  it('does not shift dates near midnight UTC', () => {
    expect(formatDate(new Date('2026-01-01T00:30:00Z'))).toBe('January 1, 2026')
  })
})
