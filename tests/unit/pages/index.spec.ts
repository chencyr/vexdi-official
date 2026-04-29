import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import IndexPage from '../../../app/pages/index.vue'

describe('pages/index', () => {
  it('renders the design-matched homepage sections and conversion points', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('精選作品')
    expect(wrapper.text()).toContain('聯絡')
    expect(wrapper.text()).not.toContain('我能提供的服務')
    expect(wrapper.find('#hero').exists()).toBe(true)
    expect(wrapper.find('#process').exists()).toBe(true)
    expect(wrapper.find('#portfolio').exists()).toBe(true)
    expect(wrapper.find('#testimonials').exists()).toBe(true)
    expect(wrapper.find('#contact').exists()).toBe(true)
  })

  it('uses the wide desktop shell needed by the reference hero', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find('[data-homepage-shell]').exists()).toBe(true)
    expect(wrapper.find('[data-homepage-shell]').classes()).toContain('lg:max-w-[96rem]')
  })
})
