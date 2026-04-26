import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import AboutSection from '../../../components/sections/AboutSection.vue'
import ProcessSection from '../../../components/sections/ProcessSection.vue'

describe('landing sections', () => {
  it('renders the brand positioning and four process steps', async () => {
    const about = await mountSuspended(AboutSection)
    const process = await mountSuspended(ProcessSection)

    expect(about.text()).toContain('創意與技術一起思考')
    expect(process.text()).toContain('需求諮詢')
    expect(process.findAll('[data-step]').length).toBe(4)
  })
})
