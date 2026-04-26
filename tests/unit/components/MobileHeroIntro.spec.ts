import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'

describe('MobileHeroIntro', () => {
  it('renders the mobile design hero, visual badges, and CTAs', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)

    expect(wrapper.text()).toContain('創意 × 技術')
    expect(wrapper.text()).toContain('GAME UI')
    expect(wrapper.text()).toContain('預約諮詢')
    expect(wrapper.text()).toContain('查看作品')
  })
})
