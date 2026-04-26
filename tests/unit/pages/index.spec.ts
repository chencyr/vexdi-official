import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import IndexPage from '../../../app/pages/index.vue'

describe('pages/index', () => {
  it('renders the design-matched homepage sections and conversion points', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('創意 × 技術')
    expect(wrapper.text()).toContain('精選作品')
    expect(wrapper.text()).toContain('預約諮詢')
  })
})
