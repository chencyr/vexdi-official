import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'

describe('MobileHeroIntro', () => {
  it('renders the mobile design hero image and CTAs', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)

    expect(wrapper.text()).toContain('創意 × 技術')
    expect(wrapper.find('img[src="/images/carousel/game-hero.png"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('預約諮詢')
    expect(wrapper.text()).toContain('查看作品')
  })
})
