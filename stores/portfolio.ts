import { defineStore } from 'pinia'

import { portfolioItems } from '../app/data/homepage'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    activeSlug: '',
  }),
  getters: {
    activeItem: (state) =>
      portfolioItems.find((item) => item.slug === state.activeSlug) ?? null,
    isOpen: (state) => state.activeSlug.length > 0,
  },
  actions: {
    open(slug: string) {
      this.activeSlug = slug
    },
    close() {
      this.activeSlug = ''
    },
  },
})
