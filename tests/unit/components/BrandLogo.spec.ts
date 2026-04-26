import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import BrandLogo from '../../../components/icons/BrandLogo.vue'

describe('BrandLogo', () => {
  it('wires the accessible name through aria-labelledby', () => {
    const wrapper = mount(BrandLogo)

    const svg = wrapper.get('svg')
    const title = wrapper.get('title')

    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-labelledby')).toBe(title.attributes('id'))
    expect(svg.attributes('data-logo-option')).toBe('4')
    expect(title.text()).toBe('Creative Tech Studio')
  })

  it('generates unique ids for each instance', () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h('div', [h(BrandLogo), h(BrandLogo)])
        },
      }),
    )

    const [firstLogo, secondLogo] = wrapper.findAllComponents(BrandLogo)

    expect(firstLogo.get('title').attributes('id')).not.toBe(
      secondLogo.get('title').attributes('id'),
    )
    expect(firstLogo.get('linearGradient').attributes('id')).not.toBe(secondLogo.get('linearGradient').attributes('id'))
  })
})
