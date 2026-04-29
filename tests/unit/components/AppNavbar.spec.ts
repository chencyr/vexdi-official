import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'

import AppNavbar from '../../../components/layout/AppNavbar.vue'

vi.mock('nuxt/app', async (importOriginal) => ({
  ...await importOriginal<typeof import('nuxt/app')>(),
  useRuntimeConfig: () => ({
    public: {
      lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
    },
  }),
}))

const sectionIds = ['hero', 'process', 'portfolio']

describe('AppNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = sectionIds.map((id) => `<section id="${id}"></section>`).join('')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the VEXDi desktop navbar from the approved spec', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const desktopNav = wrapper.get('[data-desktop-nav-bar]')
    const logo = wrapper.get('[data-brand-logo] img')
    const cta = wrapper.get('[data-navbar-cta]')
    const contactNav = wrapper.get('[data-nav-item="line-contact"]')

    expect(logo.attributes('src')).toBe('/images/ui/vexdi-logo-lockup.png')
    expect(desktopNav.classes()).toContain('lg:h-[4.5rem]')
    expect(wrapper.find('[data-active-nav-indicator]').exists()).toBe(true)
    expect(wrapper.find('[data-active-nav-indicator]').classes()).toContain('transition-opacity')
    expect(cta.text()).toContain('聯絡諮詢')
    expect(cta.classes().join(' ')).toContain('from-[#00E5FF]')
    expect(cta.classes().join(' ')).toContain('to-[#7B61FF]')
    expect(contactNav.text()).toContain('聯絡我們')
    expect(contactNav.attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
    expect(contactNav.attributes('target')).toBe('_blank')
    expect(contactNav.attributes('rel')).toBe('noreferrer')
    expect(contactNav.attributes('data-active')).toBeUndefined()

    for (const label of ['首頁', '服務項目', '案例作品', '聯絡我們']) {
      expect(wrapper.text()).toContain(label)
    }

    expect(wrapper.text()).not.toContain('關於我們')

    for (const legacyLabel of ['Game', 'Website', 'App', 'Portfolio', 'Contact']) {
      expect(wrapper.text()).not.toContain(legacyLabel)
    }
  })

  it('updates the active nav item when the focused section changes', async () => {
    let observerCallback: IntersectionObserverCallback | undefined
    const observe = vi.fn()
    const disconnect = vi.fn()

    vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
      observerCallback = callback

      return { observe, disconnect }
    }))

    const wrapper = await mountSuspended(AppNavbar)

    expect(observe).toHaveBeenCalledTimes(3)
    expect(wrapper.get('[data-nav-item="hero"]').attributes('data-active')).toBe('true')
    expect(wrapper.get('[data-nav-item="process"]').attributes('data-active')).toBe('false')
    expect(wrapper.get('[data-nav-item="portfolio"]').attributes('data-active')).toBe('false')

    observerCallback?.([
      {
        target: document.getElementById('portfolio') as Element,
        isIntersecting: true,
        intersectionRatio: 0.9,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)
    await nextTick()

    expect(wrapper.get('[data-nav-item="hero"]').attributes('data-active')).toBe('false')
    expect(wrapper.get('[data-nav-item="portfolio"]').attributes('data-active')).toBe('true')
    expect(disconnect).not.toHaveBeenCalled()
  })

  it('keeps direct mobile navigation visible without a menu trigger', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const mobileNav = wrapper.get('[data-mobile-direct-nav]')

    expect(mobileNav.text()).toContain('首頁')
    expect(mobileNav.text()).toContain('服務項目')
    expect(mobileNav.text()).toContain('案例作品')
    expect(mobileNav.text()).not.toContain('關於我們')
    expect(wrapper.find('[data-mobile-menu-trigger]').exists()).toBe(false)
  })
})
