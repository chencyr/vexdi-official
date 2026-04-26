import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    activeSection: 'hero',
    mobileMenuOpen: false,
  }),
  actions: {
    setActiveSection(section: string) {
      this.activeSection = section
    },
    openMobileMenu() {
      this.mobileMenuOpen = true
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
  },
})
