# Mobile Hero CTA and Section Margin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the updated mobile homepage spec by removing all secondary hero CTAs, routing the remaining hero CTAs to LINE, and adding consistent mobile side margin to Portfolio, Testimonials, and Footer CTA sections.

**Architecture:** Keep hero CTA copy in `app/data/homepage.ts` for the desktop carousel and render only `primaryCta` in `HeroCarousel.vue`. Keep `MobileHeroIntro.vue` as the single mobile opening hero, with one LINE CTA and explicit spacing from the hero image. Section spacing is handled locally in each affected section component so desktop full-width fixes remain intact.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Tailwind CSS, Pinia, Vitest, `@nuxt/test-utils`, in-app browser E2E.

---

## Updated Spec Summary

- Mobile Hero only renders one CTA button.
- Mobile Hero removes `查看作品`.
- Mobile Hero CTA text is `淺談遊戲企劃`.
- Mobile Hero CTA still uses `useLineLink()` and opens LINE as an external link.
- Mobile Hero CTA container must have at least `16px` spacing from the hero image; target implementation uses `mt-5` or `mt-6`.
- Desktop hero slides render only one CTA button per slide.
- Hero slide CTA labels:
  - Game: `淺談遊戲企劃`
  - Website: `規劃網站設計`
  - App: `提案App設計`
- All three desktop hero CTA buttons use `useLineLink()` and open LINE as external links.
- Hero secondary CTA is explicitly forbidden. Do not render `查看遊戲作品`, `查看網站案例`, `查看 App 案例`, `查看作品`, or any hero button/link pointing to `#portfolio`.
- Mobile Portfolio, Testimonials, and Footer CTA sections must have visible left/right margin.
- Proposed mobile margin implementation:
  - `PortfolioSection.vue`: `mx-4 space-y-5 lg:mx-0 lg:px-16`
  - `TestimonialsSection.vue`: `mx-4 space-y-5 lg:mx-0 lg:px-16`
  - `FooterCtaSection.vue`: `mx-4 rounded-[1.6rem] ... lg:mx-16`

## File Map

- Modify `app/data/homepage.ts`
  - Update hero `primaryCta.label` values.
  - Remove or stop depending on `secondaryCta` values that point to portfolio.
- Modify `app/types/homepage.ts`
  - Remove `secondaryCta` from `HeroSlide` if the data object is cleaned up.
- Modify `components/hero/HeroCarousel.vue`
  - Render only the primary LINE CTA.
  - Remove the secondary hero anchor pointing to `#portfolio`.
- Modify `components/hero/MobileHeroIntro.vue`
  - Render only the `淺談遊戲企劃` LINE CTA.
  - Remove the `查看作品` anchor.
  - Add `data-mobile-hero-image` and `data-mobile-hero-cta-container` hooks for stable tests.
  - Add `mt-5` or `mt-6` spacing between image and CTA container.
- Modify `components/sections/PortfolioSection.vue`
  - Add mobile side margin.
- Modify `components/sections/TestimonialsSection.vue`
  - Add mobile side margin.
- Modify `components/sections/FooterCtaSection.vue`
  - Add mobile side margin.
- Modify `tests/unit/components/HeroCarousel.spec.ts`
  - Update hero CTA labels and remove secondary CTA expectations.
- Modify `tests/unit/components/MobileHeroIntro.spec.ts`
  - Assert only one CTA, no `查看作品`, LINE external attributes, and image-to-CTA spacing class.
- Modify or create tests for section spacing.
  - Preferred: create `tests/unit/components/MobileSectionSpacing.spec.ts`.

---

### Task 1: Mobile Hero Regression Tests

**Files:**
- Modify: `tests/unit/components/MobileHeroIntro.spec.ts`

- [ ] **Step 1: Write failing tests for single LINE CTA and spacing**

Replace the current test body with:

```ts
it('renders one mobile hero LINE CTA with spacing below the image', async () => {
  const wrapper = await mountSuspended(MobileHeroIntro)

  const heroImage = wrapper.get('[data-mobile-hero-image]')
  const ctaContainer = wrapper.get('[data-mobile-hero-cta-container]')
  const ctas = ctaContainer.findAll('a')

  expect(heroImage.attributes('src')).toBe('/images/carousel/game-hero.png')
  expect(ctaContainer.classes()).toContain('mt-5')
  expect(ctas).toHaveLength(1)
  expect(ctas[0].text()).toContain('淺談遊戲企劃')
  expect(ctas[0].attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
  expect(ctas[0].attributes('target')).toBe('_blank')
  expect(ctas[0].attributes('rel')).toBe('noreferrer')
  expect(wrapper.text()).not.toContain('查看作品')
  expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
})
```

- [ ] **Step 2: Run the mobile hero test and verify it fails**

Run:

```bash
npm.cmd run test -- tests/unit/components/MobileHeroIntro.spec.ts
```

Expected failure:

```text
Unable to get [data-mobile-hero-image]
```

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/unit/components/MobileHeroIntro.spec.ts
git commit -m "test: require single mobile hero line cta"
```

---

### Task 2: Implement Mobile Hero CTA Cleanup

**Files:**
- Modify: `components/hero/MobileHeroIntro.vue`

- [ ] **Step 1: Add stable hooks and keep the hero image unchanged**

Change the image element to:

```vue
<img
  data-mobile-hero-image
  src="/images/carousel/game-hero.png"
  alt="game carousel artwork"
  class="h-[27rem] w-full object-cover object-[58%_center]"
  fetchpriority="high"
>
```

- [ ] **Step 2: Replace the CTA block with a single LINE CTA**

Replace the current CTA container:

```vue
<div class="relative z-10 -mt-5 flex flex-col gap-3">
  ...
</div>
```

with:

```vue
<div data-mobile-hero-cta-container class="relative z-10 mt-5 flex flex-col">
  <a
    :href="lineLink"
    target="_blank"
    rel="noreferrer"
    class="flex items-center justify-between rounded-2xl bg-brand-coral px-7 py-4 text-xl font-black text-white shadow-[0_18px_38px_rgba(255,111,69,0.32)]"
  >
    <span>淺談遊戲企劃</span>
    <span aria-hidden="true">→</span>
  </a>
</div>
```

- [ ] **Step 3: Run the mobile hero test and verify it passes**

Run:

```bash
npm.cmd run test -- tests/unit/components/MobileHeroIntro.spec.ts
```

Expected:

```text
Test Files  1 passed
Tests       1 passed
```

- [ ] **Step 4: Commit mobile hero implementation**

```bash
git add components/hero/MobileHeroIntro.vue tests/unit/components/MobileHeroIntro.spec.ts
git commit -m "fix: simplify mobile hero line cta"
```

---

### Task 3: Desktop Hero Slide CTA Regression Tests

**Files:**
- Modify: `tests/unit/components/HeroCarousel.spec.ts`

- [ ] **Step 1: Update expected CTA labels and single-button behavior**

In the desktop carousel test, replace the existing primary CTA label expectation with:

```ts
expect(heroSlides.map((slide) => slide.primaryCta.label)).toEqual([
  '淺談遊戲企劃',
  '規劃網站設計',
  '提案App設計',
])
```

Add these assertions after the primary CTA lookup:

```ts
expect(wrapper.findAll('[data-primary-hero-cta]')).toHaveLength(1)
expect(wrapper.find('[data-secondary-hero-cta]').exists()).toBe(false)
expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
expect(wrapper.text()).not.toContain('查看遊戲作品')
expect(wrapper.text()).not.toContain('查看網站案例')
expect(wrapper.text()).not.toContain('查看 App 案例')
```

Change the icon count assertion from:

```ts
expect(wrapper.findAll('[data-hero-cta-icon]')).toHaveLength(2)
```

to:

```ts
expect(wrapper.findAll('[data-hero-cta-icon]')).toHaveLength(1)
```

- [ ] **Step 2: Add slide switch assertions for all primary CTA labels**

In the forward-slide test, after moving to website, add:

```ts
expect(wrapper.get('[data-primary-hero-cta]').text()).toContain('規劃網站設計')
expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
```

Then trigger next again and assert the app label:

```ts
await wrapper.get('[data-next-slide]').trigger('click')

expect(wrapper.text()).toContain(heroSlides[2].title)
expect(wrapper.get('[data-primary-hero-cta]').text()).toContain('提案App設計')
expect(wrapper.find('a[href="#portfolio"]').exists()).toBe(false)
```

- [ ] **Step 3: Run hero carousel tests and verify they fail**

Run:

```bash
npm.cmd run test -- tests/unit/components/HeroCarousel.spec.ts
```

Expected failure:

```text
expected primary CTA labels to equal 淺談遊戲企劃 / 規劃網站設計 / 提案App設計
```

- [ ] **Step 4: Commit failing desktop hero tests**

```bash
git add tests/unit/components/HeroCarousel.spec.ts
git commit -m "test: require single line cta in desktop hero"
```

---

### Task 4: Implement Desktop Hero Single CTA

**Files:**
- Modify: `app/data/homepage.ts`
- Modify: `app/types/homepage.ts`
- Modify: `components/hero/HeroCarousel.vue`

- [ ] **Step 1: Remove `secondaryCta` from the hero slide type**

In `app/types/homepage.ts`, remove:

```ts
secondaryCta: {
  label: string
  href: string
}
```

- [ ] **Step 2: Update hero slide data**

In `app/data/homepage.ts`, update `primaryCta.label` values:

```ts
primaryCta: {
  label: '淺談遊戲企劃',
  href: 'line',
},
```

```ts
primaryCta: {
  label: '規劃網站設計',
  href: 'line',
},
```

```ts
primaryCta: {
  label: '提案App設計',
  href: 'line',
},
```

Remove each slide's `secondaryCta` object entirely.

- [ ] **Step 3: Remove secondary CTA rendering**

In `components/hero/HeroCarousel.vue`, delete the secondary anchor:

```vue
<a
  href="#portfolio"
  class="inline-flex items-center gap-3 whitespace-nowrap rounded-2xl border border-brand-ink/30 bg-white/90 px-6 py-4 text-lg font-bold text-brand-ink"
>
  {{ currentSlide.secondaryCta.label }}
  ...
</a>
```

Keep the primary CTA as:

```vue
<a
  data-primary-hero-cta
  :href="lineLink"
  target="_blank"
  rel="noreferrer"
  class="inline-flex items-center gap-3 whitespace-nowrap rounded-2xl bg-brand-coral px-6 py-4 text-lg font-black text-white shadow-[0_18px_42px_rgba(255,111,69,0.28)]"
>
  {{ currentSlide.primaryCta.label }}
  <svg data-hero-cta-icon class="h-5 w-5" aria-hidden="true" viewBox="0 0 32 32" fill="none">
    <path d="M7 16h16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    <path d="M17 9l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</a>
```

- [ ] **Step 4: Run hero carousel tests and verify they pass**

Run:

```bash
npm.cmd run test -- tests/unit/components/HeroCarousel.spec.ts
```

Expected:

```text
Test Files  1 passed
Tests       2 passed
```

- [ ] **Step 5: Commit desktop hero implementation**

```bash
git add app/data/homepage.ts app/types/homepage.ts components/hero/HeroCarousel.vue tests/unit/components/HeroCarousel.spec.ts
git commit -m "fix: simplify desktop hero line ctas"
```

---

### Task 5: Mobile Section Margin Regression Tests

**Files:**
- Create: `tests/unit/components/MobileSectionSpacing.spec.ts`

- [ ] **Step 1: Add section spacing tests**

Create `tests/unit/components/MobileSectionSpacing.spec.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import FooterCtaSection from '../../../components/sections/FooterCtaSection.vue'
import PortfolioSection from '../../../components/sections/PortfolioSection.vue'
import TestimonialsSection from '../../../components/sections/TestimonialsSection.vue'

describe('mobile section spacing', () => {
  it('adds mobile side margin to featured work, testimonials, and footer CTA', async () => {
    const portfolio = await mountSuspended(PortfolioSection)
    const testimonials = await mountSuspended(TestimonialsSection)
    const footer = await mountSuspended(FooterCtaSection)

    expect(portfolio.get('#portfolio').classes()).toContain('mx-4')
    expect(portfolio.get('#portfolio').classes()).toContain('lg:mx-0')
    expect(testimonials.get('#testimonials').classes()).toContain('mx-4')
    expect(testimonials.get('#testimonials').classes()).toContain('lg:mx-0')
    expect(footer.get('#contact').classes()).toContain('mx-4')
    expect(footer.get('#contact').classes()).toContain('lg:mx-16')
  })
})
```

- [ ] **Step 2: Run spacing tests and verify they fail**

Run:

```bash
npm.cmd run test -- tests/unit/components/MobileSectionSpacing.spec.ts
```

Expected failure:

```text
expected classes to include mx-4
```

- [ ] **Step 3: Commit failing spacing tests**

```bash
git add tests/unit/components/MobileSectionSpacing.spec.ts
git commit -m "test: require mobile section side margins"
```

---

### Task 6: Implement Mobile Section Margins

**Files:**
- Modify: `components/sections/PortfolioSection.vue`
- Modify: `components/sections/TestimonialsSection.vue`
- Modify: `components/sections/FooterCtaSection.vue`

- [ ] **Step 1: Update Portfolio section classes**

Change:

```vue
<section id="portfolio" class="space-y-5 lg:px-16">
```

to:

```vue
<section id="portfolio" class="mx-4 space-y-5 lg:mx-0 lg:px-16">
```

- [ ] **Step 2: Update Testimonials section classes**

Change:

```vue
<section id="testimonials" class="space-y-5 lg:px-16">
```

to:

```vue
<section id="testimonials" class="mx-4 space-y-5 lg:mx-0 lg:px-16">
```

- [ ] **Step 3: Update Footer CTA section classes**

Change:

```vue
class="rounded-[1.6rem] bg-[linear-gradient(135deg,#13b7c1_0%,#006d82_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,109,130,0.24)] lg:mx-16 lg:p-10"
```

to:

```vue
class="mx-4 rounded-[1.6rem] bg-[linear-gradient(135deg,#13b7c1_0%,#006d82_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,109,130,0.24)] lg:mx-16 lg:p-10"
```

- [ ] **Step 4: Run spacing tests and verify they pass**

Run:

```bash
npm.cmd run test -- tests/unit/components/MobileSectionSpacing.spec.ts
```

Expected:

```text
Test Files  1 passed
Tests       1 passed
```

- [ ] **Step 5: Commit section margin implementation**

```bash
git add components/sections/PortfolioSection.vue components/sections/TestimonialsSection.vue components/sections/FooterCtaSection.vue tests/unit/components/MobileSectionSpacing.spec.ts
git commit -m "fix: add mobile section side margins"
```

---

### Task 7: Full Verification and Browser E2E

**Files:**
- No source file changes expected unless verification finds a bug.

- [ ] **Step 1: Run focused tests**

Run:

```bash
npm.cmd run test -- tests/unit/components/MobileHeroIntro.spec.ts tests/unit/components/HeroCarousel.spec.ts tests/unit/components/MobileSectionSpacing.spec.ts
```

Expected:

```text
Test Files  3 passed
Tests       all passed
```

- [ ] **Step 2: Run full test suite**

Run:

```bash
npm.cmd run test
```

Expected:

```text
Test Files  all passed
Tests       all passed
```

- [ ] **Step 3: Run production build**

Run:

```bash
npm.cmd run build
```

Expected:

```text
Build complete
```

Existing Nuxt sourcemap and Vue DEP0155 warnings may appear. They are acceptable only if the command exits with code `0`.

- [ ] **Step 4: Run in-app browser E2E check**

Use Browser plugin at `http://127.0.0.1:3000/` and verify:

```js
const result = {
  mobileCtaText: await tab.playwright.locator('[data-mobile-hero-cta-container] a').innerText({ timeoutMs: 5000 }),
  mobileCtaCount: await tab.playwright.locator('[data-mobile-hero-cta-container] a').count(),
  mobileCtaContainerClass: await tab.playwright.locator('[data-mobile-hero-cta-container]').getAttribute('class', { timeoutMs: 5000 }),
  portfolioLinkCount: await tab.playwright.locator('a[href="#portfolio"]').count(),
  portfolioClass: await tab.playwright.locator('#portfolio').getAttribute('class', { timeoutMs: 5000 }),
  testimonialsClass: await tab.playwright.locator('#testimonials').getAttribute('class', { timeoutMs: 5000 }),
  contactClass: await tab.playwright.locator('#contact').getAttribute('class', { timeoutMs: 5000 }),
};
nodeRepl.write(JSON.stringify(result, null, 2));
```

Expected JSON:

```json
{
  "mobileCtaText": "淺談遊戲企劃\n→",
  "mobileCtaCount": 1
}
```

Also confirm:

- `mobileCtaContainerClass` contains `mt-5`.
- `portfolioLinkCount` is `0` for hero CTAs after scoping browser checks to hero containers. If global page still has non-hero portfolio anchors, scope this check to `#hero`.
- `portfolioClass`, `testimonialsClass`, and `contactClass` contain `mx-4`.

- [ ] **Step 5: Commit verification fixes if needed**

If E2E reveals a bug, fix it and commit:

```bash
git add .
git commit -m "fix: align mobile hero and section spacing e2e"
```

If no fixes are needed, do not create an empty commit.

---

## Confirmed Decisions

1. Use `mx-4` (`16px`) for the three mobile sections: Portfolio, Testimonials, and Footer CTA.
2. Fully remove `secondaryCta` from `HeroSlide` type/data/rendering instead of hiding it.
3. Use `mt-5` (`20px`) between the mobile hero image and CTA container.
4. The source spec `docs/superpowers/specs/2026-04-25-homepage-design.md` has been updated with these decisions.

## Self-Review

- Spec coverage: Mobile Hero single CTA, spacing, no `查看作品`, LINE external link, desktop hero single CTA labels, no `#portfolio` hero secondary CTA, and mobile margins for Portfolio/Testimonials/Footer CTA are all mapped to tasks.
- Placeholder scan: no unresolved placeholder phrases remain.
- Type consistency: `data-mobile-hero-image`, `data-mobile-hero-cta-container`, `data-primary-hero-cta`, `data-secondary-hero-cta`, `primaryCta`, and section IDs are used consistently.
