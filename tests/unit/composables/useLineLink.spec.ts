import { describe, expect, it, vi } from 'vitest'

vi.mock('nuxt/app', async (importOriginal) => {
  const actual = await importOriginal<typeof import('nuxt/app')>()

  return {
    ...actual,
    useRuntimeConfig: () => ({
      public: {
        lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
      },
    }),
  }
})

import { useLineLink } from '../../../composables/useLineLink'

describe('useLineLink', () => {
  it('returns the official LINE account URL', () => {
    expect(useLineLink()).toBe('https://line.me/R/ti/p/@creative-tech-studio')
  })
})
