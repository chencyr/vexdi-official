import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import BrandLogo from '../../../components/icons/BrandLogo.vue'

describe('BrandLogo', () => {
  it('renders the VEXDi lockup asset with an accessible name', () => {
    const wrapper = mount(BrandLogo)

    const linkableLogo = wrapper.get('[data-brand-logo]')
    const image = wrapper.get('img')

    expect(linkableLogo.attributes('aria-label')).toBe('VEXDi')
    expect(image.attributes('src')).toBe('/images/ui/vexdi-logo-lockup.png')
    expect(image.attributes('alt')).toBe('VEXDi')
    expect(image.classes()).toContain('h-auto')
    expect(image.classes()).toContain('w-[180px]')
  })
})
