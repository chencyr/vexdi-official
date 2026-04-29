import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import PortfolioSection from '../../../components/sections/PortfolioSection.vue'
import { portfolioItems } from '../../../app/data/homepage'

describe('PortfolioSection', () => {
  it('renders generated png artwork for every featured work card', async () => {
    const wrapper = await mountSuspended(PortfolioSection)

    expect(portfolioItems.every((item) => item.image.endsWith('.png'))).toBe(true)
    for (const item of portfolioItems) {
      expect(wrapper.find(`img[src="${item.image}"]`).exists()).toBe(true)
    }
  })
})
