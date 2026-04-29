import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const mainCss = () => readFileSync(resolve(process.cwd(), 'app/assets/css/main.css'), 'utf8')

describe('layout css', () => {
  it('does not constrain the Nuxt shell width and expose side background gutters', () => {
    const css = mainCss()
    const shellMainRule = css.match(/\.shell-main\s*\{[^}]+\}/)?.[0] ?? ''

    expect(shellMainRule).toContain('width: 100%')
    expect(shellMainRule).not.toContain('margin: 0 auto')
    expect(shellMainRule).not.toContain('96rem')
  })
})
