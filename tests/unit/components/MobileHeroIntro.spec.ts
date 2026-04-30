import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'
import { heroSlides } from '../../../app/data/homepage'
import { useHeroStore } from '../../../stores/hero'

let pinia: ReturnType<typeof createPinia>

function slideByKey(key: 'game' | 'website' | 'app') {
  const slide = heroSlides.find((item) => item.key === key)
  if (!slide) throw new Error(`Missing hero slide: ${key}`)
  return slide
}

function expectSingleLineCta(wrapper: Awaited<ReturnType<typeof mountSuspended>>) {
  const ctaContainer = wrapper.get('[data-mobile-hero-cta-container]')
  const ctas = ctaContainer.findAll('a')
  expect(ctaContainer.classes()).toContain('mt-5')
  expect(ctas).toHaveLength(1)
  expect(ctas[0].attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
  expect(ctas[0].attributes('target')).toBe('_blank')
  expect(ctas[0].attributes('rel')).toBe('noreferrer')
  expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
}

function expectActiveSlideContent(wrapper: Awaited<ReturnType<typeof mountSuspended>>, key: 'game' | 'website' | 'app') {
  const slide = slideByKey(key)
  const activeSlide = wrapper.get('[data-mobile-hero-slide]')
  expect(activeSlide.attributes('data-slide-key')).toBe(key)
  expect(activeSlide.text()).toContain(slide.displayLabel)
  expect(activeSlide.text()).toContain(slide.title)
  expect(activeSlide.text()).toContain(slide.description)
  expect(activeSlide.text()).toContain(slide.primaryCta.label)
}

function touchAt(clientX: number, clientY = 0) {
  return { changedTouches: [{ clientX, clientY }] }
}

function mountMobileHeroIntro() {
  return mountSuspended(MobileHeroIntro, {
    global: {
      plugins: [pinia],
    },
  })
}

describe('MobileHeroIntro', () => {
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders a simplified mobile carousel starting on the game slide', async () => {
    const wrapper = await mountMobileHeroIntro()
    const gameSlide = slideByKey('game')

    expect(wrapper.find('[data-mobile-hero]').exists()).toBe(true)
    expect(wrapper.find('[data-mobile-hero-swipe-zone]').exists()).toBe(true)
    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(gameSlide.image)
    expect(wrapper.find('[data-mobile-hero-image]').attributes('alt')).toBe('game mobile hero artwork')
    expectActiveSlideContent(wrapper, 'game')
    expect(wrapper.findAll('[data-mobile-hero-dot]')).toHaveLength(3)
    expect(wrapper.findAll('[data-mobile-hero-stat-icon]')).toHaveLength(0)
    expect(wrapper.findAll('[data-hero-stat-icon]')).toHaveLength(0)
    expect(wrapper.find('[data-mobile-hero-preview="previous"]').exists()).toBe(false)
    expect(wrapper.find('[data-mobile-hero-preview="next"]').exists()).toBe(false)
    expect(wrapper.find('[data-hero-preview]').exists()).toBe(false)
    expectSingleLineCta(wrapper)
  })

  it('switches to website and app slides with clickable dots', async () => {
    const wrapper = await mountMobileHeroIntro()
    const websiteSlide = slideByKey('website')
    const appSlide = slideByKey('app')

    await wrapper.get('[data-mobile-hero-dot="website"]').trigger('click')

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('website')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(websiteSlide.image)
    expectActiveSlideContent(wrapper, 'website')
    expect(wrapper.get('[data-mobile-hero-dot="website"]').attributes('aria-current')).toBe('true')
    expectSingleLineCta(wrapper)

    await wrapper.get('[data-mobile-hero-dot="app"]').trigger('click')

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('app')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(appSlide.image)
    expectActiveSlideContent(wrapper, 'app')
    expect(wrapper.get('[data-mobile-hero-dot="app"]').attributes('aria-current')).toBe('true')
    expectSingleLineCta(wrapper)
  })

  it('does not reset the shared hero store when mounted', async () => {
    const store = useHeroStore()
    const websiteSlide = slideByKey('website')

    store.setSlide(1)
    const wrapper = await mountMobileHeroIntro()

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('website')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(websiteSlide.image)
    expectActiveSlideContent(wrapper, 'website')
  })

  it('switches slides with horizontal swipe gestures', async () => {
    const wrapper = await mountMobileHeroIntro()
    const swipeZone = wrapper.get('[data-mobile-hero-swipe-zone]')
    const gameSlide = slideByKey('game')
    const websiteSlide = slideByKey('website')

    await swipeZone.trigger('touchstart', touchAt(280, 120))
    await swipeZone.trigger('touchend', touchAt(120, 124))

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('website')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(websiteSlide.image)

    await swipeZone.trigger('touchstart', touchAt(120, 124))
    await swipeZone.trigger('touchend', touchAt(280, 120))

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(gameSlide.image)
  })

  it('ignores short horizontal touch movement so accidental taps do not change slides', async () => {
    const wrapper = await mountMobileHeroIntro()
    const swipeZone = wrapper.get('[data-mobile-hero-swipe-zone]')
    const gameSlide = slideByKey('game')

    await swipeZone.trigger('touchstart', touchAt(200, 120))
    await swipeZone.trigger('touchend', touchAt(176, 124))

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(gameSlide.image)
  })

  it('ignores primarily vertical touch movement so scrolling does not change slides', async () => {
    const wrapper = await mountMobileHeroIntro()
    const swipeZone = wrapper.get('[data-mobile-hero-swipe-zone]')
    const gameSlide = slideByKey('game')

    await swipeZone.trigger('touchstart', touchAt(200, 80))
    await swipeZone.trigger('touchend', touchAt(180, 260))

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe(gameSlide.image)
  })
})
