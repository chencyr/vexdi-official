import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'

describe('MobileHeroIntro', () => {
  it('renders the hero ribbon and service pills for quick scanning', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)

    expect(wrapper.get('[data-mobile-hero-ribbon]').text()).toContain('LINE Official Account')
    expect(wrapper.findAll('[data-mobile-hero-pill]')).toHaveLength(3)
  })
})
