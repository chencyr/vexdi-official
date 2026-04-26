import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import IndexPage from '../../../pages/index.vue'

describe('pages/index', () => {
  it('renders the homepage sections and line conversion points', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('創意與技術一起思考')
    expect(wrapper.text()).toContain('精選示意專案')
    expect(wrapper.text()).toContain('加 LINE 諮詢')
  })
})
