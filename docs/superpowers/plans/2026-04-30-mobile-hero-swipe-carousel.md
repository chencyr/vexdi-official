# Mobile Hero Swipe Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simplified mobile Hero swipe carousel that lets users switch between `Game`, `Website`, and `App` slides with swipe gestures and clickable dots.

**Architecture:** Mobile Hero will reuse the existing `heroSlides` data and `useHeroStore()` carousel state so desktop and mobile stay aligned. `MobileHeroIntro.vue` owns the mobile-only layout, swipe handlers, active artwork, active copy, single LINE CTA, and dots; no new data model is required.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, Pinia, Tailwind CSS, Vitest, @nuxt/test-utils.

---

## File Structure

- Modify: `tests/unit/components/MobileHeroIntro.spec.ts`
  - Verifies mobile Hero renders all three slides through shared `heroSlides`, starts on Game, switches by dot click, switches by swipe, keeps one LINE CTA, and does not render portfolio CTAs.
- Modify: `components/hero/MobileHeroIntro.vue`
  - Replaces the single static Game Hero with a mobile-only simplified carousel. Uses `useHeroStore()`, `heroSlides`, `useLineLink()`, touch handlers, and clickable dots.
- Read only: `app/data/homepage.ts`
  - Existing source of `Game / Website / App` slide labels, images, titles, descriptions, and CTA labels.
- Read only: `stores/hero.ts`
  - Existing state and actions: `activeIndex`, `setSlide(index)`, `nextSlide()`, `previousSlide()`.

---

### Task 1: Define Mobile Hero Carousel Tests

**Files:**
- Modify: `tests/unit/components/MobileHeroIntro.spec.ts`
- Read: `app/data/homepage.ts`
- Read: `stores/hero.ts`

- [ ] **Step 1: Replace the component test with carousel behavior coverage**

Replace `tests/unit/components/MobileHeroIntro.spec.ts` with:

```ts
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import MobileHeroIntro from '../../../components/hero/MobileHeroIntro.vue'
import { heroSlides } from '../../../app/data/homepage'

describe('MobileHeroIntro', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders a simplified mobile carousel starting on the game slide', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)
    const ctaContainer = wrapper.get('[data-mobile-hero-cta-container]')
    const ctas = ctaContainer.findAll('a')

    expect(wrapper.find('[data-mobile-hero]').exists()).toBe(true)
    expect(wrapper.find('[data-mobile-hero-swipe-zone]').exists()).toBe(true)
    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/game-hero.png')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('alt')).toBe('game mobile hero artwork')
    expect(wrapper.text()).toContain(heroSlides[0].displayLabel)
    expect(wrapper.text()).toContain(heroSlides[0].title)
    expect(wrapper.text()).toContain(heroSlides[0].description)
    expect(wrapper.text()).toContain(heroSlides[0].primaryCta.label)
    expect(wrapper.findAll('[data-mobile-hero-dot]')).toHaveLength(3)
    expect(wrapper.findAll('[data-mobile-hero-stat-icon]')).toHaveLength(0)
    expect(wrapper.find('[data-mobile-hero-preview="previous"]').exists()).toBe(false)
    expect(wrapper.find('[data-mobile-hero-preview="next"]').exists()).toBe(false)
    expect(ctaContainer.classes()).toContain('mt-5')
    expect(ctas).toHaveLength(1)
    expect(ctas[0].attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
    expect(ctas[0].attributes('target')).toBe('_blank')
    expect(ctas[0].attributes('rel')).toBe('noreferrer')
    expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('?亦?雿?')
  })

  it('switches to website and app slides with clickable dots', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)

    await wrapper.get('[data-mobile-hero-dot="website"]').trigger('click')

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('website')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/website-hero.png')
    expect(wrapper.text()).toContain(heroSlides[1].displayLabel)
    expect(wrapper.text()).toContain(heroSlides[1].title)
    expect(wrapper.text()).toContain(heroSlides[1].description)
    expect(wrapper.text()).toContain(heroSlides[1].primaryCta.label)
    expect(wrapper.findAll('[data-mobile-hero-dot]')[1].attributes('aria-current')).toBe('true')
    expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)

    await wrapper.get('[data-mobile-hero-dot="app"]').trigger('click')

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('app')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/app-hero.png')
    expect(wrapper.text()).toContain(heroSlides[2].displayLabel)
    expect(wrapper.text()).toContain(heroSlides[2].title)
    expect(wrapper.text()).toContain(heroSlides[2].description)
    expect(wrapper.text()).toContain(heroSlides[2].primaryCta.label)
    expect(wrapper.findAll('[data-mobile-hero-dot]')[2].attributes('aria-current')).toBe('true')
    expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
  })

  it('switches slides with horizontal swipe gestures', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)
    const swipeZone = wrapper.get('[data-mobile-hero-swipe-zone]')

    await swipeZone.trigger('touchstart', { changedTouches: [{ clientX: 280 }] })
    await swipeZone.trigger('touchend', { changedTouches: [{ clientX: 120 }] })

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('website')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/website-hero.png')

    await swipeZone.trigger('touchstart', { changedTouches: [{ clientX: 120 }] })
    await swipeZone.trigger('touchend', { changedTouches: [{ clientX: 280 }] })

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/game-hero.png')
  })

  it('ignores short touch movement so vertical scrolling does not change slides', async () => {
    const wrapper = await mountSuspended(MobileHeroIntro)
    const swipeZone = wrapper.get('[data-mobile-hero-swipe-zone]')

    await swipeZone.trigger('touchstart', { changedTouches: [{ clientX: 200 }] })
    await swipeZone.trigger('touchend', { changedTouches: [{ clientX: 180 }] })

    expect(wrapper.find('[data-mobile-hero-slide]').attributes('data-slide-key')).toBe('game')
    expect(wrapper.find('[data-mobile-hero-image]').attributes('src')).toBe('/images/carousel/game-hero.png')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails for the current single-hero implementation**

Run:

```bash
npm.cmd test -- tests/unit/components/MobileHeroIntro.spec.ts
```

Expected: FAIL with missing selectors such as `[data-mobile-hero]`, `[data-mobile-hero-swipe-zone]`, or `[data-mobile-hero-dot="website"]`.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/unit/components/MobileHeroIntro.spec.ts
git commit -m "test: define mobile hero swipe carousel"
```

---

### Task 2: Implement the Simplified Mobile Hero Swipe Carousel

**Files:**
- Modify: `components/hero/MobileHeroIntro.vue`
- Test: `tests/unit/components/MobileHeroIntro.spec.ts`

- [ ] **Step 1: Replace the single static mobile Hero implementation**

Replace `components/hero/MobileHeroIntro.vue` with:

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

import { heroSlides } from '../../app/data/homepage'
import { useLineLink } from '../../composables/useLineLink'
import { useHeroStore } from '../../stores/hero'

const heroStore = useHeroStore()
const lineLink = useLineLink()
const touchStartX = ref<number | null>(null)
const swipeThreshold = 48

const currentSlide = computed(() => heroSlides[heroStore.activeIndex] ?? heroSlides[0])

function handleTouchStart(event: TouchEvent) {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

function handleTouchEnd(event: TouchEvent) {
  if (touchStartX.value === null) return

  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.value
  const deltaX = touchEndX - touchStartX.value
  touchStartX.value = null

  if (Math.abs(deltaX) < swipeThreshold) return

  if (deltaX < 0) {
    heroStore.nextSlide()
    return
  }

  heroStore.previousSlide()
}
</script>

<template>
  <section id="hero" data-mobile-hero class="lg:hidden">
    <div
      data-mobile-hero-swipe-zone
      class="relative overflow-hidden rounded-[2rem] bg-white/90 p-5 shadow-[0_24px_70px_rgba(16,63,84,0.16)]"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <Transition name="mobile-hero-fade" mode="out-in">
        <div
          :key="currentSlide.key"
          data-mobile-hero-slide
          :data-slide-key="currentSlide.key"
        >
          <div class="relative z-10">
            <p class="inline-flex rounded-full bg-brand-teal px-4 py-2 text-xs font-black uppercase text-white shadow-lg">
              {{ currentSlide.displayLabel }}
            </p>
            <h1 class="mt-4 text-[2.35rem] font-black leading-[1.13] text-brand-ink">
              {{ currentSlide.title }}
            </h1>
            <p class="mt-5 text-sm font-medium leading-7 text-slate-600">
              {{ currentSlide.description }}
            </p>
          </div>

          <div class="relative mt-4 overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
            <img
              data-mobile-hero-image
              :src="currentSlide.image"
              :alt="`${currentSlide.key} mobile hero artwork`"
              class="h-[27rem] w-full object-cover object-center"
              fetchpriority="high"
            >
            <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/80" />
          </div>

          <div data-mobile-hero-cta-container class="relative z-10 mt-5 flex flex-col">
            <a
              :href="lineLink"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between rounded-2xl bg-brand-coral px-7 py-4 text-xl font-black text-white shadow-[0_18px_38px_rgba(255,111,69,0.32)]"
            >
              <span>{{ currentSlide.primaryCta.label }}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Transition>

      <div class="mt-4 flex items-center justify-center gap-2" aria-label="Mobile hero slides">
        <button
          v-for="(slide, index) in heroSlides"
          :key="slide.key"
          type="button"
          :data-mobile-hero-dot="slide.key"
          :aria-label="`Show ${slide.key} slide`"
          :aria-current="index === heroStore.activeIndex ? 'true' : 'false'"
          class="h-2.5 rounded-full transition"
          :class="index === heroStore.activeIndex ? 'w-9 bg-brand-teal' : 'w-2.5 bg-slate-300'"
          @click="heroStore.setSlide(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.mobile-hero-fade-enter-active,
.mobile-hero-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-hero-fade-enter-from,
.mobile-hero-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.mobile-hero-fade-enter-to,
.mobile-hero-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
```

- [ ] **Step 2: Run the mobile Hero test and verify it passes**

Run:

```bash
npm.cmd test -- tests/unit/components/MobileHeroIntro.spec.ts
```

Expected: PASS with 4 tests passing.

- [ ] **Step 3: Commit the implementation**

```bash
git add components/hero/MobileHeroIntro.vue tests/unit/components/MobileHeroIntro.spec.ts
git commit -m "feat: add mobile hero swipe carousel"
```

---

### Task 3: Verify Desktop Hero Compatibility and Full Build

**Files:**
- Read: `components/hero/HeroCarousel.vue`
- Read: `tests/unit/components/HeroCarousel.spec.ts`
- Read: `tests/unit/pages/index.spec.ts`

- [ ] **Step 1: Run focused Hero and homepage tests**

Run:

```bash
npm.cmd test -- tests/unit/components/MobileHeroIntro.spec.ts tests/unit/components/HeroCarousel.spec.ts tests/unit/pages/index.spec.ts tests/unit/data/homepage.spec.ts
```

Expected: PASS with mobile Hero, desktop Hero, homepage assembly, and homepage data tests passing.

- [ ] **Step 2: Run the complete test suite**

Run:

```bash
npm.cmd test
```

Expected: PASS with all Vitest files passing.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm.cmd run build
```

Expected: PASS with Nuxt build complete. Existing non-fatal Nuxt sourcemap or Nitro external dependency warnings are acceptable if the process exits with code 0.

- [ ] **Step 4: Commit only if verification requires code changes**

If Step 1-3 reveal a real bug and you modify files, commit those changes:

```bash
git add components/hero/MobileHeroIntro.vue tests/unit/components/MobileHeroIntro.spec.ts
git commit -m "fix: verify mobile hero carousel integration"
```

If no files change after verification, do not create an empty commit.

---

## Self-Review

- Spec coverage: Task 1 and Task 2 cover simplified mobile swipe carousel, `Game / Website / App` slides, swipe interaction, clickable dots, one LINE CTA per active slide, no desktop side previews, no arrows, no stats row, and no secondary portfolio CTA.
- Placeholder scan: The plan contains complete file paths, concrete code, concrete commands, and expected command results.
- Type consistency: The plan uses the existing `heroSlides`, `primaryCta.label`, `useHeroStore().setSlide(index)`, `useHeroStore().nextSlide()`, and `useHeroStore().previousSlide()` APIs exactly as they exist.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-30-mobile-hero-swipe-carousel.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
