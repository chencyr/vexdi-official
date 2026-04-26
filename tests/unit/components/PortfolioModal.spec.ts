import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import PortfolioModal from '../../../components/overlay/PortfolioModal.vue'
import { portfolioItems } from '../../../app/data/homepage'

describe('PortfolioModal', () => {
  it('shows the selected work title and highlights', async () => {
    const wrapper = await mountSuspended(PortfolioModal, {
      attachTo: document.body,
      props: {
        open: true,
        item: portfolioItems[0],
      },
    })

    expect(document.body.textContent).toContain(portfolioItems[0].title)
    expect(document.body.textContent).toContain(portfolioItems[0].highlights[0])

    wrapper.unmount()
  })
})
