import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import AppNavbar from '../../../components/layout/AppNavbar.vue'

describe('AppNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the desktop nav and direct mobile nav without a menu trigger', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    expect(wrapper.text()).toContain('Portfolio')
    expect(wrapper.find('[data-desktop-nav-bar]').exists()).toBe(true)
    expect(wrapper.find('[data-desktop-nav-bar]').classes()).toContain('lg:h-[4.625rem]')
    expect(wrapper.find('[data-mobile-direct-nav]').exists()).toBe(true)
    expect(wrapper.find('[data-mobile-direct-nav]').text()).toContain('Portfolio')
    expect(wrapper.find('[data-mobile-menu-trigger]').exists()).toBe(false)
  })
})
