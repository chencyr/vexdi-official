import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useUiStore } from '../../../stores/ui'

describe('ui store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('opens and closes the mobile navigation', () => {
    const store = useUiStore()

    store.openMobileMenu()
    expect(store.mobileMenuOpen).toBe(true)

    store.closeMobileMenu()
    expect(store.mobileMenuOpen).toBe(false)
  })
})
