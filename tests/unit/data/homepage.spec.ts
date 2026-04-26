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
      '把世界觀做成玩家願意停留的互動舞台',
      '用清楚的內容架構，讓網站成為最好的業務夥伴',
      '把複雜流程整理成流暢、可靠、好維護的 App',
    ])
    expect(services.map((service) => service.title)).toEqual([
      '網站設計與前端開發',
      '遊戲原型與互動設計',
      'App 產品與系統整合',
    ])
  })

  it('keeps the structured process and demo portfolio content', () => {
    expect(processSteps.map((step) => step.title)).toEqual([
      '需求諮詢',
      '提案與排程',
      '設計與製作',
      '交付與優化',
    ])
    expect(portfolioItems.map((item) => item.slug)).toEqual([
      'sky-arcadia',
      'atelier-brand',
      'pulse-track',
    ])
    expect(testimonials).toHaveLength(3)
  })
})
