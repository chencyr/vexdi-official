import { describe, expect, it } from 'vitest'

import {
  heroSlides,
  portfolioItems,
  processSteps,
  services,
  testimonials,
} from '../../../app/data/homepage'

describe('homepage content', () => {
  it('keeps the approved hero and service copy readable', () => {
    expect(heroSlides.map((slide) => slide.title)).toEqual([
      '把遊戲提案做成一眼想玩的視覺入口',
      '讓品牌網站不只好看，也能把價值說清楚',
      '把 App 想法收斂成可展示的產品流程',
    ])
    expect(services.map((service) => service.title)).toEqual([
      '品牌與作品集網站',
      '遊戲提案視覺設計',
      'App UI/UX 與產品原型',
    ])
  })

  it('keeps the structured process and demo portfolio content', () => {
    expect(processSteps.map((step) => step.title)).toEqual([
      '需求釐清',
      '敘事與線框',
      '視覺與互動',
      '上線與調整',
    ])
    expect(portfolioItems.map((item) => item.slug)).toEqual([
      'sky-arcadia',
      'atelier-brand',
      'pulse-track',
    ])
    expect(testimonials).toHaveLength(3)
  })
})
