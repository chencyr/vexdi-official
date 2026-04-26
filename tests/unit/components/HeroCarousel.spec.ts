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

    expect(wrapper.text()).toContain('01 / 03')
    expect(wrapper.find('[data-hero-banner-stage]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-banner-artwork]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-preview="previous"]').exists()).toBe(true)
    expect(wrapper.find('[data-hero-preview="next"]').exists()).toBe(true)
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
  })
})
