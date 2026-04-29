import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const iconPath = (name: string) => resolve(process.cwd(), 'public/images/icons', name)

describe('service icons', () => {
  it('keeps service icons aligned with the mobile reference artwork', () => {
    expect(readFileSync(iconPath('service-website.svg'), 'utf8')).toContain('data-mobile-reference="website-browser"')
    expect(readFileSync(iconPath('service-game.svg'), 'utf8')).toContain('data-mobile-reference="game-controller"')
    expect(readFileSync(iconPath('service-app.svg'), 'utf8')).toContain('data-mobile-reference="app-phone-chart"')
  })
})
