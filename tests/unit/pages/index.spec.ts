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

  it('uses a true full-width homepage shell', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const shell = wrapper.get('[data-homepage-shell]')

    expect(shell.classes()).toContain('w-full')
    expect(shell.classes()).toContain('max-w-full')
    expect(shell.classes()).not.toContain('mx-auto')
    expect(shell.classes()).not.toContain('lg:max-w-[96rem]')
  })

  it('does not render the floating chat dialog or launcher', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.findComponent({ name: 'LineFab' }).exists()).toBe(false)
    expect(wrapper.find('[data-line-fab]').exists()).toBe(false)
    expect(wrapper.find('[data-line-chat-dialog]').exists()).toBe(false)
  })
})
