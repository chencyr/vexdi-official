import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import AppNavbar from '../../../components/layout/AppNavbar.vue'

describe('AppNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the design nav, consultation CTA, and mobile menu trigger', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    expect(wrapper.text()).toContain('Portfolio')
    expect(wrapper.text()).toContain('預約諮詢')
    expect(wrapper.text()).toContain('開啟選單')
  })
})
