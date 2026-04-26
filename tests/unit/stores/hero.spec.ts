import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useHeroStore } from '../../../stores/hero'

describe('hero store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('cycles to the next slide and wraps around', () => {
    const store = useHeroStore()

    expect(store.activeSlideKey).toBe('game')

    store.nextSlide()
    store.nextSlide()
    store.nextSlide()

    expect(store.activeSlideKey).toBe('game')
  })
})
