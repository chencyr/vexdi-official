import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import AppNavbar from '../../../components/layout/AppNavbar.vue'

describe('AppNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the VEXDi desktop navbar from the approved spec', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const desktopNav = wrapper.get('[data-desktop-nav-bar]')
    const logo = wrapper.get('[data-brand-logo] img')
    const cta = wrapper.get('[data-navbar-cta]')

    expect(logo.attributes('src')).toBe('/images/ui/vexdi-logo-lockup.png')
    expect(desktopNav.classes()).toContain('lg:h-[4.5rem]')
    expect(wrapper.find('[data-active-nav-indicator]').exists()).toBe(true)
    expect(cta.text()).toContain('聯絡諮詢')
    expect(cta.classes().join(' ')).toContain('from-[#00E5FF]')
    expect(cta.classes().join(' ')).toContain('to-[#7B61FF]')

    for (const label of ['首頁', '服務項目', '案例作品', '關於我們', '聯絡我們']) {
      expect(wrapper.text()).toContain(label)
    }

    for (const legacyLabel of ['Game', 'Website', 'App', 'Portfolio', 'Contact']) {
      expect(wrapper.text()).not.toContain(legacyLabel)
    }
  })

  it('keeps direct mobile navigation visible without a menu trigger', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const mobileNav = wrapper.get('[data-mobile-direct-nav]')

    expect(mobileNav.text()).toContain('首頁')
    expect(mobileNav.text()).toContain('服務項目')
    expect(mobileNav.text()).toContain('案例作品')
    expect(wrapper.find('[data-mobile-menu-trigger]').exists()).toBe(false)
  })
})
