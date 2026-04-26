export type SlideKey = 'game' | 'website' | 'app'

export interface HeroSlide {
  key: SlideKey
  displayLabel: string
  image: string
  eyebrow: string
  title: string
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  stats: Array<{
    icon: string
    label: string
    value: string
  }>
}

export interface ServiceItem {
  key: SlideKey
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface PortfolioItem {
  slug: string
  category: SlideKey
  image: string
  title: string
  summary: string
  highlights: string[]
  ctaLabel: string
}

export interface TestimonialItem {
  name: string
  role: string
  quote: string
}
