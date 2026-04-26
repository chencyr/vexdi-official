import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import IndexPage from '../../../app/pages/index.vue'

describe('pages/index', () => {
  it('renders the design-matched homepage sections and conversion points', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('創意 × 技術')
    expect(wrapper.text()).toContain('精選作品')
    expect(wrapper.text()).toContain('預約諮詢')
    expect(wrapper.text()).not.toContain('用創意與技術')
    expect(wrapper.text()).not.toContain('品牌與作品集網站')
    expect(wrapper.text()).not.toContain('我能提供的服務')
  })

  it('uses the wide desktop shell needed by the reference hero', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find('[data-homepage-shell]').exists()).toBe(true)
    expect(wrapper.find('[data-homepage-shell]').classes()).toContain('lg:max-w-[96rem]')
  })
})
