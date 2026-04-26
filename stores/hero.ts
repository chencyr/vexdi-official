import { defineStore } from 'pinia'

import { heroSlides } from '../app/data/homepage'

export const useHeroStore = defineStore('hero', {
  state: () => ({
    activeIndex: 0,
  }),
  getters: {
    activeSlideKey: (state) => heroSlides[state.activeIndex]?.key ?? 'game',
  },
  actions: {
    setSlide(index: number) {
      this.activeIndex = (index + heroSlides.length) % heroSlides.length
    },
    nextSlide() {
      this.setSlide(this.activeIndex + 1)
    },
    previousSlide() {
      this.setSlide(this.activeIndex - 1)
    },
  },
})
