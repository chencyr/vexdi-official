import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'

describe('MobileHeroIntro', () => {
  it('renders one mobile hero LINE CTA with spacing below the image', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)

    const heroImage = wrapper.get('[data-mobile-hero-image]')
    const ctaContainer = wrapper.get('[data-mobile-hero-cta-container]')
    const ctas = ctaContainer.findAll('a')

    expect(heroImage.attributes('src')).toBe('/images/carousel/game-hero.png')
    expect(ctaContainer.classes()).toContain('mt-5')
    expect(ctas).toHaveLength(1)
    expect(ctas[0].text()).toContain('淺談遊戲企劃')
    expect(ctas[0].attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
    expect(ctas[0].attributes('target')).toBe('_blank')
    expect(ctas[0].attributes('rel')).toBe('noreferrer')
    expect(wrapper.text()).not.toContain('查看作品')
    expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
  })
})
