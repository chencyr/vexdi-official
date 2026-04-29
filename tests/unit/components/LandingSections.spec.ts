import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import AboutSection from '../../../components/sections/AboutSection.vue'
import ProcessSection from '../../../components/sections/ProcessSection.vue'

describe('landing sections', () => {
  it('renders the brand positioning and four process steps', async () => {
    const about = await mountSuspended(AboutSection)
    const process = await mountSuspended(ProcessSection)

    expect(about.text()).toContain('用創意與技術')
    expect(process.text()).toContain('需求釐清')
    expect(process.findAll('[data-step]').length).toBe(4)
  })

  it('matches the portfolio and testimonials section styling for process', async () => {
    const process = await mountSuspended(ProcessSection)

    expect(process.find('section').classes()).toContain('lg:px-16')
    expect(process.find('section').classes()).toContain('space-y-5')
    expect(process.find('[data-process-eyebrow]').classes()).toContain('tracking-[0.28em]')
    expect(process.find('[data-process-eyebrow]').classes()).toContain('lg:hidden')
    expect(process.find('h2').classes()).toContain('text-3xl')
    expect(process.find('h2').classes()).toContain('lg:text-4xl')
    expect(process.find('[data-step]').classes()).toContain('rounded-[1.35rem]')
    expect(process.find('[data-step]').classes()).toContain('shadow-[0_18px_46px_rgba(34,83,111,0.12)]')
  })
})
