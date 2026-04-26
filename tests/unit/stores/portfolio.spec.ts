import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { usePortfolioStore } from '../../../stores/portfolio'

describe('portfolio store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('opens the requested work and clears on close', () => {
    const store = usePortfolioStore()

    store.open('sky-arcadia')
    expect(store.activeItem?.slug).toBe('sky-arcadia')

    store.close()
    expect(store.activeItem).toBeNull()
  })
})
