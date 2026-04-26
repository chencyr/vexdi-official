import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import HeroCarousel from '../../../components/hero/HeroCarousel.vue'
import { heroSlides } from '../../../app/data/homepage'

describe('HeroCarousel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the desktop carousel stage and value strip', async () => {
    const wrapper = await mountSuspended(HeroCarousel)

    expect(wrapper.text()).not.toContain('01 / 03')
    expect(wrapper.find('[data-hero-banner-stage]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-fade-frame]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-fade-frame]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-hero-banner-artwork]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-preview="previous"]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-preview="next"]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-banner-stage]').classes()).toContain('xl:max-w-[70rem]')
    expect(wrapper.find('[data-hero-preview="previous"]').classes()).toContain('xl:w-[10.5rem]')
    expect(heroSlides.map((slide) => slide.displayLabel)).toEqual(['遊戲設計', '網頁設計', 'APP設計'])
    expect(heroSlides.map((slide) => slide.primaryCta.label)).toEqual(['淺談遊戲企劃', '規劃網站設計', '提案APP設計'])
    expect(heroSlides[0].stats[0].value).toBe('遊戲企劃')
    expect(wrapper.text()).toContain('遊戲設計')
    expect(wrapper.find('[data-primary-hero-cta]').classes()).toContain('whitespace-nowrap')
    expect(wrapper.findAll('[data-hero-cta-icon]')).toHaveLength(2)
    expect(wrapper.text()).not.toContain('->')
    expect(heroSlides.every((slide) => slide.stats.every((stat) => stat.icon))).toBe(true)
    expect(wrapper.findAll('[data-hero-stat-icon]')).toHaveLength(3)
    for (const slide of heroSlides) {
      expect(wrapper.find(`img[src="${slide.image}"]`).exists()).toBe(true)
    }
    expect(wrapper.text()).toContain('我能為你帶來的價值')
    expect(wrapper.text()).toContain(heroSlides[0].primaryCta.label)
  })

  it('updates the active slide copy after moving forward', async () => {
    const wrapper = await mountSuspended(HeroCarousel)

    await wrapper.get('[data-next-slide]').trigger('click')

    expect(wrapper.text()).toContain(heroSlides[1].title)
    expect(wrapper.findAll('[data-hero-fade-frame]').some((frame) => frame.attributes('data-slide-key') === 'website')).toBe(true)
  })
})
