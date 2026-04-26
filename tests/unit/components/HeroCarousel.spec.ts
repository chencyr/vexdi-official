import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import HeroCarousel from '../../../components/hero/HeroCarousel.vue'
import { heroSlides } from '../../../app/data/homepage'

describe('HeroCarousel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the hero trust ribbon and service pills', async () => {
    const wrapper = await mountSuspended(HeroCarousel)

    expect(wrapper.get('[data-hero-ribbon]').text()).toContain('LINE Official Account')
    expect(wrapper.findAll('[data-hero-pill]')).toHaveLength(3)
  })

  it('updates the active slide copy after moving forward', async () => {
    const wrapper = await mountSuspended(HeroCarousel)

    await wrapper.get('[data-next-slide]').trigger('click')

    expect(wrapper.text()).toContain(heroSlides[1].primaryCta.label)
  })
})
