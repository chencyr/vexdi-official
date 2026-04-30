import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import FooterCtaSection from '../../../components/sections/FooterCtaSection.vue'
import PortfolioSection from '../../../components/sections/PortfolioSection.vue'
import TestimonialsSection from '../../../components/sections/TestimonialsSection.vue'

describe('mobile section spacing', () => {
  it('adds mobile side margin to featured work, testimonials, and footer CTA', async () => {
    const portfolio = await mountSuspended(PortfolioSection)
    const testimonials = await mountSuspended(TestimonialsSection)
    const footer = await mountSuspended(FooterCtaSection)

    expect(portfolio.get('#portfolio').classes()).toContain('mx-4')
    expect(portfolio.get('#portfolio').classes()).toContain('lg:mx-0')
    expect(testimonials.get('#testimonials').classes()).toContain('mx-4')
    expect(testimonials.get('#testimonials').classes()).toContain('lg:mx-0')
    expect(footer.get('#contact').classes()).toContain('mx-4')
    expect(footer.get('#contact').classes()).toContain('lg:mx-16')
  })
})
