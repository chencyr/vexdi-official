# Creative Tech Studio Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved one-page `Creative Tech Studio` Nuxt homepage with a desktop hero carousel, mobile single-hero flow, portfolio modal, fixed testimonials, SVG logo, and LINE-first conversion path.

**Architecture:** Keep the homepage data-driven so copy, slides, services, portfolio entries, and testimonials live in one typed content module. Split the page into focused section components backed by small Pinia stores for UI state (`ui`), hero carousel state (`hero`), and portfolio modal state (`portfolio`). Use Tailwind tokens plus a small global CSS layer for the brand look, and cover key interactions with Vitest component and store tests.

**Tech Stack:** Nuxt 4, Vue 3, Pinia, Tailwind CSS, Vitest, Vue Test Utils, TypeScript.

---

## File Structure

### Existing files to modify
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/package.json`
  Add test scripts and test dependencies.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/nuxt.config.ts`
  Add public runtime config for the LINE URL and keep the global CSS entry stable.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/app.vue`
  Provide the shared shell, skip link, and root background layers.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/assets/css/main.css`
  Define the design tokens, utility classes, reduced-motion rules, and global element styling.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/pages/index.vue`
  Compose the final one-page homepage.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/ui.ts`
  Expand global UI state for mobile navigation and active anchor tracking.

### New app files to create
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/types/homepage.ts`
  Shared type definitions for slides, services, process steps, works, and testimonials.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/data/homepage.ts`
  All homepage content, labels, CTA text, and demo data.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/composables/useLineLink.ts`
  Single source of truth for the official LINE URL.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/hero.ts`
  Desktop carousel active slide logic.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/portfolio.ts`
  Portfolio modal open/close state and selected work.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/icons/BrandLogo.vue`
  SVG implementation of the selected option four logo direction.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/layout/AppNavbar.vue`
  Sticky desktop navbar plus mobile drawer trigger.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/layout/MobileNavPanel.vue`
  Mobile hamburger menu with anchor links and LINE CTA.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroCarousel.vue`
  Desktop hero wrapper with slide controls and sync copy.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualGame.vue`
  Game slide visual composition.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualWebsite.vue`
  Website slide visual composition.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualApp.vue`
  App slide visual composition.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/MobileHeroIntro.vue`
  Mobile single-hero opening block.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/MobileServiceBranches.vue`
  Mobile branch cards for `Game / Website / App`.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/AboutSection.vue`
  Brand-positioning section.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/ServicesSection.vue`
  Three service cards.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/ProcessSection.vue`
  Four-step timeline.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/PortfolioSection.vue`
  Grid of clickable works.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/TestimonialsSection.vue`
  Fixed testimonial cards.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/FooterCtaSection.vue`
  Final conversion section.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/overlay/PortfolioModal.vue`
  Focus-trapped modal for work details.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/floating/LineFab.vue`
  Fixed floating LINE button.
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/public/og-homepage.svg`
  Temporary OG/share asset matching the homepage palette.

### Test files to create
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/vitest.config.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/setup.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/composables/useLineLink.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/ui.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/hero.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/portfolio.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/AppNavbar.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/BrandLogo.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/HeroCarousel.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/LandingSections.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/PortfolioModal.spec.ts`
- `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/pages/index.spec.ts`

### Implementation notes
- Keep all copy in `app/data/homepage.ts`; components receive plain objects through props to avoid copy drift.
- Use `assets/references/desktop-hero-carousel-final.png`, `assets/references/mobile-final-with-chat.png`, and `assets/references/logo-concept-board-v1.png` only as visual references, not as runtime assets.
- Use one placeholder LINE URL until the real official account URL is supplied: `https://line.me/R/ti/p/@creative-tech-studio`.

### Task 1: Set up test tooling and typed homepage content

**Files:**
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/package.json`
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/nuxt.config.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/vitest.config.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/setup.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/types/homepage.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/data/homepage.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/composables/useLineLink.ts`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/composables/useLineLink.spec.ts`

- [ ] **Step 1: Write the failing composable test**

```ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: {
      lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
    },
  }),
}))

import { useLineLink } from '../../../composables/useLineLink'

describe('useLineLink', () => {
  it('returns the official LINE account URL', () => {
    expect(useLineLink()).toBe('https://line.me/R/ti/p/@creative-tech-studio')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/composables/useLineLink.spec.ts`
Expected: FAIL with `Cannot find module '../../../composables/useLineLink'`.

- [ ] **Step 3: Add the test toolchain and runtime config**

```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.14.0",
    "@vue/test-utils": "^2.4.6",
    "happy-dom": "^15.11.7",
    "vitest": "^2.1.4"
  }
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
      siteUrl: 'https://creative-tech-studio.local',
    },
  },
})
```

```ts
// composables/useLineLink.ts
export const useLineLink = () => useRuntimeConfig().public.lineOfficialAccountUrl
```

```ts
// app/types/homepage.ts
export type SlideKey = 'game' | 'website' | 'app'

export interface HeroSlide {
  key: SlideKey
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  stats: string[]
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
```

```ts
// app/data/homepage.ts
import type { HeroSlide, PortfolioItem, ProcessStep, ServiceItem, TestimonialItem } from '~/types/homepage'

export const heroSlides: HeroSlide[] = [
  {
    key: 'game',
    eyebrow: 'Game Design x Playful Visuals',
    title: '活潑主視覺與互動介面，讓遊戲提案更有記憶點',
    description: '用角色魅力、系統化 UI 與品牌敘事，整理出能拿去提案的遊戲展示頁。',
    primaryCta: '加 LINE 諮詢遊戲案',
    secondaryCta: '查看遊戲作品',
    stats: ['角色主視覺整合', '宣傳頁與活動頁', '系統 UI 方向建議'],
  },
  {
    key: 'website',
    eyebrow: 'Brand Story x Visual Systems',
    title: '把形象網站做得清楚、好看，也真的能接到案',
    description: '以品牌排版、段落節奏與 CTA 結構，打造能快速建立信任的官網首頁。',
    primaryCta: '加 LINE 討論網站',
    secondaryCta: '查看網站作品',
    stats: ['品牌首頁設計', 'RWD 區塊規劃', '轉換導向版面'],
  },
  {
    key: 'app',
    eyebrow: 'Product Flow x Dashboard UI',
    title: '把 App 介面做成容易理解、容易展示的產品故事',
    description: '從資訊層級到關鍵畫面配置，整理出兼顧提案感與可開發性的 UI 展示頁。',
    primaryCta: '加 LINE 討論 App',
    secondaryCta: '查看 App 作品',
    stats: ['流程型介面規劃', 'Dashboard 與資料卡片', '產品展示畫面'],
  },
]

export const services: ServiceItem[] = [
  { key: 'website', title: '形象網站', description: '品牌首頁、提案站與接案官網的資訊與視覺整合。' },
  { key: 'game', title: '遊戲專案', description: '遊戲展示頁、活動頁、角色視覺與 UI 氛圍設計。' },
  { key: 'app', title: 'App 設計', description: '行動產品畫面、流程重組與展示稿設計。' },
]

export const processSteps: ProcessStep[] = [
  { number: '01', title: '需求諮詢', description: '確認專案目標、受眾與交付範圍。' },
  { number: '02', title: '提案與排程', description: '整理視覺方向與里程碑節奏。' },
  { number: '03', title: '設計與製作', description: '完成版型、互動與展示畫面。' },
  { number: '04', title: '交付與優化', description: '提供可展示成果與後續調整建議。' },
]

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'sky-arcadia',
    category: 'game',
    title: '像素風冒險遊戲提案頁',
    summary: '把角色、戰鬥介面與活動資訊整合成一個可提案的遊戲展示頁。',
    highlights: ['角色主視覺設定', '戰鬥 HUD 風格整理', '活動頁 CTA 設計'],
    ctaLabel: '加 LINE 詢問遊戲案',
  },
  {
    slug: 'atelier-brand',
    category: 'website',
    title: '品牌形象網站首頁',
    summary: '用編輯感版面與明確段落節奏建立品牌信任。',
    highlights: ['品牌色系延伸', '首頁資訊架構重排', 'RWD hero 設計'],
    ctaLabel: '加 LINE 討論官網',
  },
  {
    slug: 'pulse-track',
    category: 'app',
    title: '生活管理 App 展示稿',
    summary: '以資料模組與裝置畫面呈現產品流程與價值。',
    highlights: ['核心流程拆解', '儀表板 UI 設計', '多裝置展示構圖'],
    ctaLabel: '加 LINE 討論 App',
  },
]

export const testimonials: TestimonialItem[] = [
  { name: '林小姐', role: '品牌主理人', quote: '首頁的節奏很清楚，客戶第一眼就知道我們在做什麼。' },
  { name: '陳先生', role: '遊戲工作室', quote: '角色視覺和功能展示整合得很好，提案效率高很多。' },
  { name: '王小姐', role: '產品企劃', quote: 'App 展示稿很完整，開發和商務都能快速對焦。' },
]
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
```

```ts
// tests/setup.ts
import { config } from '@vue/test-utils'

config.global.stubs = {
  NuxtLink: {
    template: '<a><slot /></a>',
  },
}
```

- [ ] **Step 4: Run the composable test to verify it passes**

Run: `npm run test -- tests/unit/composables/useLineLink.spec.ts`
Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts vitest.config.ts tests/setup.ts tests/unit/composables/useLineLink.spec.ts app/types/homepage.ts app/data/homepage.ts composables/useLineLink.ts
git commit -m "chore: add homepage content model and test tooling"
```

### Task 2: Build the brand shell, SVG logo, and global visual tokens

**Files:**
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/app.vue`
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/app/assets/css/main.css`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/icons/BrandLogo.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/BrandLogo.spec.ts`

- [ ] **Step 1: Write the failing logo accessibility test**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BrandLogo from '../../../components/icons/BrandLogo.vue'

describe('BrandLogo', () => {
  it('renders an accessible SVG title', () => {
    const wrapper = mount(BrandLogo)

    expect(wrapper.find('svg').attributes('role')).toBe('img')
    expect(wrapper.text()).toContain('Creative Tech Studio')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/components/BrandLogo.spec.ts`
Expected: FAIL with `Cannot find module '../../../components/icons/BrandLogo.vue'`.

- [ ] **Step 3: Implement the brand shell and logo**

```vue
<!-- components/icons/BrandLogo.vue -->
<template>
  <svg viewBox="0 0 164 48" role="img" aria-labelledby="brandLogoTitle" class="h-11 w-auto">
    <title id="brandLogoTitle">Creative Tech Studio</title>
    <g fill="none" fill-rule="evenodd">
      <path d="M16 38L28 10l12 28H16Z" fill="#16B8C4" />
      <path d="M33 38L46 20l12 18H33Z" fill="#5F78FF" />
      <circle cx="20" cy="15" r="4" fill="#FF8B4D" />
      <path d="M74 15h14c9 0 15 6 15 15s-6 15-15 15H74V15Z" fill="#15294F" opacity=".08" />
      <text x="74" y="28" fill="#15294F" font-size="16" font-weight="700">Creative</text>
      <text x="74" y="43" fill="#16B8C4" font-size="16" font-weight="700">Tech Studio</text>
    </g>
  </svg>
</template>
```

```vue
<!-- app/app.vue -->
<template>
  <div class="min-h-screen bg-site text-slate-900 antialiased">
    <a href="#main-content" class="skip-link">跳到主要內容</a>
    <NuxtLoadingIndicator color="#16b8c4" />
    <NuxtRouteAnnouncer />
    <div class="site-shell">
      <div class="site-orb site-orb-left" aria-hidden="true" />
      <div class="site-orb site-orb-right" aria-hidden="true" />
      <NuxtPage />
    </div>
  </div>
</template>
```

```css
/* app/assets/css/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --site-bg: radial-gradient(circle at top left, rgba(22, 184, 196, 0.18), transparent 32%),
    radial-gradient(circle at top right, rgba(95, 120, 255, 0.14), transparent 28%),
    linear-gradient(180deg, #fefefe 0%, #eef8ff 100%);
  --surface-shadow: 0 24px 70px rgba(31, 61, 110, 0.14);
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-slate-50 text-slate-900;
}

.bg-site {
  background-image: var(--site-bg);
}

.site-shell {
  position: relative;
  isolation: isolate;
}

.site-orb {
  position: fixed;
  z-index: -1;
  width: 28rem;
  height: 28rem;
  border-radius: 9999px;
  filter: blur(32px);
  opacity: 0.45;
}

.site-orb-left {
  top: -8rem;
  left: -10rem;
  background: rgba(22, 184, 196, 0.18);
}

.site-orb-right {
  right: -8rem;
  top: 12rem;
  background: rgba(95, 120, 255, 0.12);
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 50;
  transform: translateY(-180%);
  border-radius: 9999px;
  background: #15294f;
  color: white;
  padding: 0.75rem 1rem;
}

.skip-link:focus {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run the logo test to verify it passes**

Run: `npm run test -- tests/unit/components/BrandLogo.spec.ts`
Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add app/app.vue app/assets/css/main.css components/icons/BrandLogo.vue tests/unit/components/BrandLogo.spec.ts
git commit -m "feat: add brand shell and svg logo"
```

### Task 3: Build the sticky navbar, mobile navigation, and floating LINE button

**Files:**
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/ui.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/layout/AppNavbar.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/layout/MobileNavPanel.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/floating/LineFab.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/ui.spec.ts`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/AppNavbar.spec.ts`

- [ ] **Step 1: Write the failing UI store test**

```ts
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useUiStore } from '../../../stores/ui'

describe('ui store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('opens and closes the mobile navigation', () => {
    const store = useUiStore()

    store.openMobileMenu()
    expect(store.mobileMenuOpen).toBe(true)

    store.closeMobileMenu()
    expect(store.mobileMenuOpen).toBe(false)
  })
})
```

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppNavbar from '../../../components/layout/AppNavbar.vue'

describe('AppNavbar', () => {
  it('renders the primary line cta and mobile trigger', () => {
    const wrapper = mount(AppNavbar)

    expect(wrapper.text()).toContain('LINE')
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
```

- [ ] **Step 2: Run the UI store test to verify it fails**

Run: `npm run test -- tests/unit/stores/ui.spec.ts`
Expected: FAIL with `store.openMobileMenu is not a function`.

- [ ] **Step 3: Implement the UI store and navigation components**

```ts
// stores/ui.ts
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    activeSection: 'hero',
    mobileMenuOpen: false,
  }),
  actions: {
    setActiveSection(section: string) {
      this.activeSection = section
    },
    openMobileMenu() {
      this.mobileMenuOpen = true
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
  },
})
```

```vue
<!-- components/layout/AppNavbar.vue -->
<script setup lang="ts">
import { useLineLink } from '~/composables/useLineLink'
import { useUiStore } from '~/stores/ui'

const uiStore = useUiStore()
const lineLink = useLineLink()
const navItems = [
  { label: 'Game', href: '#game' },
  { label: 'Website', href: '#website' },
  { label: 'App', href: '#app' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 px-4 py-4 lg:px-8">
    <div class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-[var(--surface-shadow)] backdrop-blur">
      <a href="#hero" class="flex items-center gap-3" aria-label="回到首頁">
        <BrandLogo />
      </a>

      <nav class="hidden items-center gap-7 lg:flex">
        <a v-for="item in navItems" :key="item.href" :href="item.href" class="text-sm font-semibold text-slate-700 transition hover:text-brand-teal">
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a :href="lineLink" target="_blank" rel="noreferrer" class="hidden rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,139,77,0.35)] lg:inline-flex">
          加 LINE 諮詢
        </a>
        <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden" @click="uiStore.toggleMobileMenu()">
          <span class="sr-only">開啟選單</span>
          ☰
        </button>
      </div>
    </div>

    <MobileNavPanel :open="uiStore.mobileMenuOpen" :items="navItems" @close="uiStore.closeMobileMenu()" />
  </header>
</template>
```

```vue
<!-- components/layout/MobileNavPanel.vue -->
<script setup lang="ts">
defineProps<{ open: boolean; items: { label: string; href: string }[] }>()
defineEmits<{ close: [] }>()
const lineLink = useLineLink()
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 bg-slate-950/40 px-4 py-24 lg:hidden">
      <div class="mx-auto max-w-sm rounded-[28px] bg-white p-6 shadow-2xl">
        <div class="mb-5 flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">Menu</p>
          <button type="button" class="rounded-full border border-slate-200 px-3 py-1" @click="$emit('close')">關閉</button>
        </div>
        <div class="flex flex-col gap-4">
          <a v-for="item in items" :key="item.href" :href="item.href" class="rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-slate-700" @click="$emit('close')">
            {{ item.label }}
          </a>
          <a :href="lineLink" target="_blank" rel="noreferrer" class="rounded-2xl bg-brand-coral px-4 py-3 text-center font-semibold text-white">
            加 LINE 諮詢
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
```

```vue
<!-- components/floating/LineFab.vue -->
<script setup lang="ts">
const lineLink = useLineLink()
</script>

<template>
  <a :href="lineLink" target="_blank" rel="noreferrer" class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#06c755] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(6,199,85,0.35)]">
    <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">L</span>
    LINE
  </a>
</template>
```

- [ ] **Step 4: Run the store and navbar tests to verify they pass**

Run: `npm run test -- tests/unit/stores/ui.spec.ts tests/unit/components/AppNavbar.spec.ts`
Expected: PASS with `2 passed`.

- [ ] **Step 5: Commit**

```bash
git add stores/ui.ts components/layout/AppNavbar.vue components/layout/MobileNavPanel.vue components/floating/LineFab.vue tests/unit/stores/ui.spec.ts tests/unit/components/AppNavbar.spec.ts
git commit -m "feat: add global navigation and line fab"
```

### Task 4: Build the desktop hero carousel and mobile hero intro

**Files:**
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/hero.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroCarousel.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualGame.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualWebsite.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/HeroVisualApp.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/MobileHeroIntro.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/hero/MobileServiceBranches.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/hero.spec.ts`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/HeroCarousel.spec.ts`

- [ ] **Step 1: Write the failing hero store test**

```ts
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useHeroStore } from '../../../stores/hero'

describe('hero store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('cycles to the next slide and wraps around', () => {
    const store = useHeroStore()

    expect(store.activeSlide).toBe('game')
    store.nextSlide()
    store.nextSlide()
    store.nextSlide()

    expect(store.activeSlide).toBe('game')
  })
})
```

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeroCarousel from '../../../components/hero/HeroCarousel.vue'

describe('HeroCarousel', () => {
  it('shows different copy after moving to the next slide', async () => {
    const wrapper = mount(HeroCarousel)

    await wrapper.get('button:last-of-type').trigger('click')

    expect(wrapper.text()).toContain('網站')
  })
})
```

- [ ] **Step 2: Run the hero store test to verify it fails**

Run: `npm run test -- tests/unit/stores/hero.spec.ts`
Expected: FAIL with `Cannot find module '../../../stores/hero'`.

- [ ] **Step 3: Implement the hero store and components**

```ts
// stores/hero.ts
import { defineStore } from 'pinia'
import { heroSlides } from '~/data/homepage'

export const useHeroStore = defineStore('hero', {
  state: () => ({
    activeIndex: 0,
  }),
  getters: {
    activeSlide: (state) => heroSlides[state.activeIndex]?.key ?? 'game',
  },
  actions: {
    setSlide(index: number) {
      this.activeIndex = (index + heroSlides.length) % heroSlides.length
    },
    nextSlide() {
      this.setSlide(this.activeIndex + 1)
    },
    previousSlide() {
      this.setSlide(this.activeIndex - 1)
    },
  },
})
```

```vue
<!-- components/hero/HeroCarousel.vue -->
<script setup lang="ts">
import { heroSlides } from '~/data/homepage'
import { useHeroStore } from '~/stores/hero'

const heroStore = useHeroStore()
const lineLink = useLineLink()
const currentSlide = computed(() => heroSlides[heroStore.activeIndex])
const visualMap = {
  game: resolveComponent('HeroVisualGame'),
  website: resolveComponent('HeroVisualWebsite'),
  app: resolveComponent('HeroVisualApp'),
}
</script>

<template>
  <section id="hero" class="hidden lg:block">
    <div class="grid gap-10 rounded-[40px] border border-white/70 bg-white/80 p-8 shadow-[var(--surface-shadow)] backdrop-blur xl:grid-cols-[1.05fr_1.2fr]">
      <div class="flex flex-col justify-between gap-8">
        <div class="space-y-5">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">{{ currentSlide.eyebrow }}</p>
          <h1 class="text-6xl font-black leading-[1.05] text-brand-ink">{{ currentSlide.title }}</h1>
          <p class="max-w-xl text-lg leading-8 text-slate-600">{{ currentSlide.description }}</p>
        </div>

        <div class="flex flex-wrap gap-3">
          <a :href="lineLink" target="_blank" rel="noreferrer" class="rounded-full bg-brand-coral px-7 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(255,139,77,0.35)]">
            {{ currentSlide.primaryCta }}
          </a>
          <a :href="`#${currentSlide.key}`" class="rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700">
            {{ currentSlide.secondaryCta }}
          </a>
        </div>

        <ul class="grid gap-3 sm:grid-cols-3">
          <li v-for="stat in currentSlide.stats" :key="stat" class="rounded-3xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700">
            {{ stat }}
          </li>
        </ul>
      </div>

      <div class="space-y-5">
        <div class="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,rgba(22,184,196,0.14),rgba(95,120,255,0.08))] p-6">
          <component :is="visualMap[currentSlide.key]" />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <button v-for="(slide, index) in heroSlides" :key="slide.key" type="button" class="h-3 rounded-full transition" :class="index === heroStore.activeIndex ? 'w-10 bg-brand-teal' : 'w-3 bg-slate-300'" @click="heroStore.setSlide(index)">
              <span class="sr-only">切換到 {{ slide.title }}</span>
            </button>
          </div>
          <div class="flex gap-2">
            <button type="button" class="rounded-full border border-slate-200 bg-white px-4 py-3" @click="heroStore.previousSlide()">上一張</button>
            <button type="button" class="rounded-full border border-slate-200 bg-white px-4 py-3" @click="heroStore.nextSlide()">下一張</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

```vue
<!-- components/hero/HeroVisualGame.vue -->
<template>
  <div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
    <div class="rounded-[30px] bg-white/70 p-6 shadow-lg">
      <div class="aspect-[4/5] rounded-[26px] bg-[linear-gradient(180deg,rgba(22,184,196,0.28),rgba(95,120,255,0.12))]" />
    </div>
    <div class="space-y-4">
      <div class="rounded-[24px] bg-slate-950 p-4 text-white shadow-xl">GAME UI</div>
      <div class="rounded-[24px] bg-white p-4 shadow-lg">角色展示卡</div>
      <div class="rounded-[24px] bg-white p-4 shadow-lg">活動頁 CTA</div>
    </div>
  </div>
</template>
```

```vue
<!-- components/hero/HeroVisualWebsite.vue -->
<template>
  <div class="space-y-4">
    <div class="rounded-[30px] bg-white p-5 shadow-xl">
      <div class="h-10 rounded-full bg-slate-100" />
      <div class="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="h-72 rounded-[24px] bg-[linear-gradient(135deg,rgba(22,184,196,0.18),rgba(95,120,255,0.08))]" />
        <div class="space-y-4">
          <div class="h-24 rounded-[22px] bg-slate-100" />
          <div class="h-20 rounded-[22px] bg-slate-100" />
          <div class="h-24 rounded-[22px] bg-slate-100" />
        </div>
      </div>
    </div>
  </div>
</template>
```

```vue
<!-- components/hero/HeroVisualApp.vue -->
<template>
  <div class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
    <div class="mx-auto flex w-56 items-center justify-center rounded-[34px] bg-slate-950 p-3 shadow-2xl">
      <div class="h-[24rem] w-full rounded-[28px] bg-[linear-gradient(180deg,rgba(22,184,196,0.2),rgba(255,255,255,0.06))]" />
    </div>
    <div class="space-y-4">
      <div class="rounded-[24px] bg-white p-5 shadow-lg">Dashboard 模組</div>
      <div class="rounded-[24px] bg-white p-5 shadow-lg">流程節點卡片</div>
      <div class="rounded-[24px] bg-white p-5 shadow-lg">資料視覺化區塊</div>
    </div>
  </div>
</template>
```

```vue
<!-- components/hero/MobileHeroIntro.vue -->
<script setup lang="ts">
const lineLink = useLineLink()
const gameSlide = heroSlides[0]
</script>

<template>
  <section id="hero" class="lg:hidden">
    <div class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[var(--surface-shadow)] backdrop-blur">
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">{{ gameSlide.eyebrow }}</p>
      <h1 class="mt-4 text-4xl font-black leading-tight text-brand-ink">{{ gameSlide.title }}</h1>
      <p class="mt-4 text-base leading-7 text-slate-600">{{ gameSlide.description }}</p>
      <div class="mt-6 rounded-[28px] bg-[linear-gradient(180deg,rgba(22,184,196,0.18),rgba(95,120,255,0.06))] p-4">
        <HeroVisualGame />
      </div>
      <div class="mt-6 flex flex-col gap-3">
        <a :href="lineLink" target="_blank" rel="noreferrer" class="rounded-full bg-brand-coral px-6 py-4 text-center font-semibold text-white">{{ gameSlide.primaryCta }}</a>
        <a href="#portfolio" class="rounded-full border border-slate-200 bg-white px-6 py-4 text-center font-semibold text-slate-700">查看作品</a>
      </div>
    </div>
  </section>
</template>
```

```vue
<!-- components/hero/MobileServiceBranches.vue -->
<script setup lang="ts">
import { services } from '~/data/homepage'
</script>

<template>
  <section class="grid gap-4 lg:hidden">
    <article v-for="service in services" :key="service.key" :id="service.key" class="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-lg backdrop-blur">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">{{ service.key }}</p>
      <h2 class="mt-3 text-2xl font-bold text-brand-ink">{{ service.title }}</h2>
      <p class="mt-3 leading-7 text-slate-600">{{ service.description }}</p>
    </article>
  </section>
</template>
```

- [ ] **Step 4: Run the hero tests to verify they pass**

Run: `npm run test -- tests/unit/stores/hero.spec.ts tests/unit/components/HeroCarousel.spec.ts`
Expected: PASS with `2 passed` after the component test asserts the desktop hero updates copy when the next button is clicked.

- [ ] **Step 5: Commit**

```bash
git add stores/hero.ts components/hero/HeroCarousel.vue components/hero/HeroVisualGame.vue components/hero/HeroVisualWebsite.vue components/hero/HeroVisualApp.vue components/hero/MobileHeroIntro.vue components/hero/MobileServiceBranches.vue tests/unit/stores/hero.spec.ts tests/unit/components/HeroCarousel.spec.ts
git commit -m "feat: add responsive homepage hero"
```

### Task 5: Build the About, Services, and Process sections

**Files:**
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/AboutSection.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/ServicesSection.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/ProcessSection.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/LandingSections.spec.ts`

- [ ] **Step 1: Write the failing section rendering test**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AboutSection from '../../../components/sections/AboutSection.vue'
import ProcessSection from '../../../components/sections/ProcessSection.vue'

describe('landing sections', () => {
  it('renders the about message and four process steps', () => {
    const about = mount(AboutSection)
    const process = mount(ProcessSection)

    expect(about.text()).toContain('創意與技術一起思考')
    expect(process.text()).toContain('需求諮詢')
    expect(process.findAll('[data-step]').length).toBe(4)
  })
})
```

- [ ] **Step 2: Run the section test to verify it fails**

Run: `npm run test -- tests/unit/components/LandingSections.spec.ts`
Expected: FAIL with `Cannot find module '../../../components/sections/AboutSection.vue'`.

- [ ] **Step 3: Implement the three informational sections**

```vue
<!-- components/sections/AboutSection.vue -->
<template>
  <section id="about" class="grid gap-6 rounded-[36px] border border-white/70 bg-white/85 p-8 shadow-[var(--surface-shadow)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">About</p>
      <h2 class="mt-4 text-4xl font-black leading-tight text-brand-ink">創意與技術一起思考，讓網站、遊戲與 App 有一致的品牌感</h2>
      <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600">我用同一套敘事與版面邏輯，把視覺吸引力、商務說服力與可開發性整理進首頁。</p>
    </div>
    <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
      <article class="rounded-[28px] bg-slate-50 p-5">
        <h3 class="font-bold text-brand-ink">跨領域整合</h3>
        <p class="mt-2 text-sm leading-7 text-slate-600">用同一個品牌語言處理網站、遊戲頁與 App 展示。</p>
      </article>
      <article class="rounded-[28px] bg-slate-50 p-5">
        <h3 class="font-bold text-brand-ink">設計可落地</h3>
        <p class="mt-2 text-sm leading-7 text-slate-600">在提案美感之外，保留開發與交付節奏的可行性。</p>
      </article>
      <article class="rounded-[28px] bg-slate-50 p-5">
        <h3 class="font-bold text-brand-ink">敘事更清楚</h3>
        <p class="mt-2 text-sm leading-7 text-slate-600">讓客戶一眼理解你做什麼、適合誰、該怎麼合作。</p>
      </article>
    </div>
  </section>
</template>
```

```vue
<!-- components/sections/ServicesSection.vue -->
<script setup lang="ts">
import { services } from '~/data/homepage'
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Services</p>
        <h2 class="mt-3 text-4xl font-black text-brand-ink">你可以直接對應自己的案件類型</h2>
      </div>
      <a href="#contact" class="hidden text-sm font-semibold text-brand-teal lg:inline-flex">立即諮詢</a>
    </div>
    <div class="grid gap-5 lg:grid-cols-3">
      <article v-for="service in services" :key="service.key" class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">{{ service.key }}</p>
        <h3 class="mt-4 text-2xl font-bold text-brand-ink">{{ service.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>
```

```vue
<!-- components/sections/ProcessSection.vue -->
<script setup lang="ts">
import { processSteps } from '~/data/homepage'
</script>

<template>
  <section id="process" class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Process</p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">合作節奏清楚，詢問起來更安心</h2>
    </div>
    <div class="grid gap-4 lg:grid-cols-4">
      <article v-for="step in processSteps" :key="step.number" data-step class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur">
        <p class="text-sm font-semibold tracking-[0.18em] text-brand-teal">{{ step.number }}</p>
        <h3 class="mt-4 text-xl font-bold text-brand-ink">{{ step.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ step.description }}</p>
      </article>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Run the section test to verify it passes**

Run: `npm run test -- tests/unit/components/LandingSections.spec.ts`
Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/AboutSection.vue components/sections/ServicesSection.vue components/sections/ProcessSection.vue tests/unit/components/LandingSections.spec.ts
git commit -m "feat: add about services and process sections"
```

### Task 6: Build the portfolio grid and modal interaction

**Files:**
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/stores/portfolio.ts`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/PortfolioSection.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/overlay/PortfolioModal.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/stores/portfolio.spec.ts`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/components/PortfolioModal.spec.ts`

- [ ] **Step 1: Write the failing portfolio modal test**

```ts
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import PortfolioModal from '../../../components/overlay/PortfolioModal.vue'
import { portfolioItems } from '../../../app/data/homepage'
import { usePortfolioStore } from '../../../stores/portfolio'

describe('portfolio store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('opens the requested work and clears on close', () => {
    const store = usePortfolioStore()

    store.open('sky-arcadia')
    expect(store.activeItem?.slug).toBe('sky-arcadia')

    store.close()
    expect(store.activeItem).toBeNull()
  })
})
```

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PortfolioModal from '../../../components/overlay/PortfolioModal.vue'
import { portfolioItems } from '../../../app/data/homepage'

describe('PortfolioModal', () => {
  it('shows the selected work title and highlights', () => {
    const wrapper = mount(PortfolioModal, {
      props: {
        open: true,
        item: portfolioItems[0],
      },
    })

    expect(wrapper.text()).toContain('像素風冒險遊戲提案頁')
    expect(wrapper.text()).toContain('角色主視覺設定')
  })
})
```

- [ ] **Step 2: Run the modal test to verify it fails**

Run: `npm run test -- tests/unit/components/PortfolioModal.spec.ts`
Expected: FAIL with `Cannot find module '../../../components/overlay/PortfolioModal.vue'`.

- [ ] **Step 3: Implement the portfolio store, grid, and modal**

```ts
// stores/portfolio.ts
import { defineStore } from 'pinia'
import { portfolioItems } from '~/data/homepage'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    activeSlug: '' as string,
  }),
  getters: {
    activeItem: (state) => portfolioItems.find((item) => item.slug === state.activeSlug) ?? null,
    isOpen: (state) => state.activeSlug.length > 0,
  },
  actions: {
    open(slug: string) {
      this.activeSlug = slug
    },
    close() {
      this.activeSlug = ''
    },
  },
})
```

```vue
<!-- components/sections/PortfolioSection.vue -->
<script setup lang="ts">
import { portfolioItems } from '~/data/homepage'
import { usePortfolioStore } from '~/stores/portfolio'

const portfolioStore = usePortfolioStore()
</script>

<template>
  <section id="portfolio" class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Portfolio</p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">精選示意專案</h2>
      <p class="mt-3 max-w-2xl text-base leading-8 text-slate-600">每張卡片都能打開看完整設計亮點與合作導流。</p>
    </div>
    <div class="grid gap-5 lg:grid-cols-3">
      <button v-for="item in portfolioItems" :key="item.slug" type="button" class="rounded-[32px] border border-white/70 bg-white/85 p-6 text-left shadow-lg backdrop-blur" @click="portfolioStore.open(item.slug)">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">{{ item.category }}</p>
        <h3 class="mt-4 text-2xl font-bold text-brand-ink">{{ item.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ item.summary }}</p>
      </button>
    </div>
    <PortfolioModal :open="portfolioStore.isOpen" :item="portfolioStore.activeItem" @close="portfolioStore.close()" />
  </section>
</template>
```

```vue
<!-- components/overlay/PortfolioModal.vue -->
<script setup lang="ts">
import type { PortfolioItem } from '~/types/homepage'

defineProps<{ open: boolean; item: PortfolioItem | null }>()
defineEmits<{ close: [] }>()
const lineLink = useLineLink()
</script>

<template>
  <teleport to="body">
    <div v-if="open && item" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4" @click.self="$emit('close')">
      <div class="w-full max-w-4xl rounded-[36px] bg-white p-6 shadow-2xl lg:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">{{ item.category }}</p>
            <h3 class="mt-3 text-3xl font-black text-brand-ink">{{ item.title }}</h3>
          </div>
          <button type="button" class="rounded-full border border-slate-200 px-4 py-2" @click="$emit('close')">關閉</button>
        </div>
        <div class="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-[28px] bg-slate-100 p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Preview</p>
            <div class="mt-4 h-72 rounded-[24px] bg-[linear-gradient(135deg,rgba(22,184,196,0.22),rgba(95,120,255,0.12))]" />
          </div>
          <div>
            <p class="leading-8 text-slate-600">{{ item.summary }}</p>
            <ul class="mt-5 space-y-3">
              <li v-for="highlight in item.highlights" :key="highlight" class="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {{ highlight }}
              </li>
            </ul>
            <a :href="lineLink" target="_blank" rel="noreferrer" class="mt-6 inline-flex rounded-full bg-brand-coral px-6 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(255,139,77,0.35)]">
              {{ item.ctaLabel }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
```

- [ ] **Step 4: Run the portfolio tests to verify they pass**

Run: `npm run test -- tests/unit/stores/portfolio.spec.ts tests/unit/components/PortfolioModal.spec.ts`
Expected: PASS with `2 passed`.

- [ ] **Step 5: Commit**

```bash
git add stores/portfolio.ts components/sections/PortfolioSection.vue components/overlay/PortfolioModal.vue tests/unit/stores/portfolio.spec.ts tests/unit/components/PortfolioModal.spec.ts
git commit -m "feat: add portfolio modal flow"
```

### Task 7: Build testimonials, footer CTA, and assemble the homepage

**Files:**
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/pages/index.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/TestimonialsSection.vue`
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/components/sections/FooterCtaSection.vue`
- Test: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/tests/unit/pages/index.spec.ts`

- [ ] **Step 1: Write the failing homepage assembly test**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import IndexPage from '../../../pages/index.vue'

describe('index page', () => {
  it('renders the homepage sections and line conversion points', () => {
    const wrapper = mount(IndexPage)

    expect(wrapper.text()).toContain('創意與技術一起思考')
    expect(wrapper.text()).toContain('精選示意專案')
    expect(wrapper.text()).toContain('加 LINE 諮詢')
  })
})
```

- [ ] **Step 2: Run the homepage test to verify it fails**

Run: `npm run test -- tests/unit/pages/index.spec.ts`
Expected: FAIL because the placeholder page does not contain the final section text.

- [ ] **Step 3: Implement the remaining sections and page composition**

```vue
<!-- components/sections/TestimonialsSection.vue -->
<script setup lang="ts">
import { testimonials } from '~/data/homepage'
</script>

<template>
  <section class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Client Notes</p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">客戶怎麼說</h2>
    </div>
    <div class="grid gap-5 lg:grid-cols-3">
      <article v-for="item in testimonials" :key="item.name" class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur">
        <p class="text-lg font-bold text-brand-ink">{{ item.name }}</p>
        <p class="mt-1 text-sm font-semibold text-brand-teal">{{ item.role }}</p>
        <p class="mt-4 leading-7 text-slate-600">{{ item.quote }}</p>
      </article>
    </div>
  </section>
</template>
```

```vue
<!-- components/sections/FooterCtaSection.vue -->
<script setup lang="ts">
const lineLink = useLineLink()
</script>

<template>
  <section id="contact" class="rounded-[36px] bg-[linear-gradient(135deg,#16b8c4,#1a7fd4)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(31,61,110,0.18)]">
    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Start a Project</p>
    <h2 class="mt-3 text-4xl font-black leading-tight">有專案想一起合作嗎？</h2>
    <p class="mt-4 max-w-2xl text-base leading-8 text-white/85">不管是遊戲提案頁、形象網站，還是 App 展示稿，都可以直接加 LINE 討論。</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a :href="lineLink" target="_blank" rel="noreferrer" class="rounded-full bg-white px-6 py-4 font-semibold text-brand-ink">加 LINE 諮詢</a>
      <a href="#portfolio" class="rounded-full border border-white/30 px-6 py-4 font-semibold text-white">查看作品</a>
    </div>
  </section>
</template>
```

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useSeoMeta({
  title: '創意 x 技術 | 接案形象網站 / 遊戲 / App 設計',
  description: '以品牌敘事型首頁整合網站、遊戲與 App 設計服務，所有 CTA 導向 LINE 官方帳號。',
  ogTitle: 'Creative Tech Studio',
  ogDescription: '接案形象網站、遊戲提案頁與 App 設計首頁。',
  ogImage: '/og-homepage.svg',
})
</script>

<template>
  <main id="main-content" class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 lg:px-8">
    <AppNavbar />
    <HeroCarousel />
    <MobileHeroIntro />
    <MobileServiceBranches />
    <AboutSection />
    <ServicesSection />
    <ProcessSection />
    <PortfolioSection />
    <TestimonialsSection />
    <FooterCtaSection />
    <LineFab />
  </main>
</template>
```

- [ ] **Step 4: Run the homepage test to verify it passes**

Run: `npm run test -- tests/unit/pages/index.spec.ts`
Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add pages/index.vue components/sections/TestimonialsSection.vue components/sections/FooterCtaSection.vue tests/unit/pages/index.spec.ts
git commit -m "feat: assemble homepage sections"
```

### Task 8: Add polish, share asset, and final verification

**Files:**
- Create: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/public/og-homepage.svg`
- Modify: `C:/Users/abc102601/Documents/Codex/2026-04-25-new-chat/creative-tech-studio/README.md`

- [ ] **Step 1: Add the share asset and setup notes**

```svg
<!-- public/og-homepage.svg -->
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" rx="36" fill="#F8FCFF"/>
  <circle cx="170" cy="120" r="180" fill="#16B8C4" fill-opacity="0.16"/>
  <circle cx="1020" cy="540" r="220" fill="#5F78FF" fill-opacity="0.12"/>
  <path d="M152 360L238 162l86 198H152Z" fill="#16B8C4"/>
  <path d="M276 360L365 237l83 123H276Z" fill="#5F78FF"/>
  <circle cx="182" cy="200" r="28" fill="#FF8B4D"/>
  <text x="520" y="260" fill="#15294F" font-size="72" font-family="'Noto Sans TC', sans-serif" font-weight="800">創意 x 技術</text>
  <text x="520" y="352" fill="#16B8C4" font-size="54" font-family="'Noto Sans TC', sans-serif" font-weight="700">遊戲 / 形象網站 / App 設計</text>
  <text x="520" y="430" fill="#4A5A78" font-size="32" font-family="'Noto Sans TC', sans-serif">One-page portfolio homepage with LINE-first conversion</text>
</svg>
```

```md
<!-- README.md -->
## Scripts

- `npm run dev`: start the Nuxt development server
- `npm run test`: run the Vitest suite
- `npm run build`: create a production build

## Runtime config

Set `NUXT_PUBLIC_LINE_OFFICIAL_ACCOUNT_URL` to the real official LINE account URL before production deploy.
```

- [ ] **Step 2: Run the full verification suite**

Run: `npm run test`
Expected: PASS with all unit tests green.

Run: `npm run build`
Expected: PASS with a generated production bundle and no unresolved imports.

- [ ] **Step 3: Manual responsive check**

Run: `npm run dev`
Expected: Homepage loads at `http://localhost:3000`.

Check manually:
- Desktop shows sticky navbar, hero carousel, and three visible portfolio cards.
- Mobile shows the single hero intro instead of the desktop carousel.
- Every `加 LINE` CTA opens the same official account URL.
- Portfolio modal opens and closes with keyboard and click-outside.

- [ ] **Step 4: Commit**

```bash
git add public/og-homepage.svg README.md
git commit -m "chore: add homepage verification assets"
```

## Self-Review

### Spec coverage
- `Navbar + Hero Carousel`: covered by Task 3 and Task 4.
- `Mobile single hero + branch cards`: covered by Task 4.
- `About / Services / Process`: covered by Task 5.
- `Portfolio modal`: covered by Task 6.
- `Testimonials / Footer CTA / floating LINE button`: covered by Task 3 and Task 7.
- `SVG logo`: covered by Task 2.
- `SEO / OG asset / reduced motion`: covered by Task 2, Task 7, and Task 8.

### Remaining inputs still missing from the spec
- Real `LINE 官方帳號` URL is still unknown; the plan uses a placeholder runtime config value.
- Final exported production hero illustrations are still not in the repo; implementation should begin with CSS/vector mock compositions and swap assets later.
- Testimonials and portfolio entries are still示意內容; replacing them with real case data is a post-v1 content task.

### Placeholder scan
- No `TODO`, `TBD`, or “implement later” placeholders remain in task steps.
- Every code-changing step contains concrete file content or command examples.

### Type consistency
- `HeroSlide`, `ServiceItem`, `ProcessStep`, `PortfolioItem`, and `TestimonialItem` are defined once in `app/types/homepage.ts` and reused across tasks.
- Stores use stable names: `useUiStore`, `useHeroStore`, `usePortfolioStore`.

Plan complete and saved to `docs/superpowers/plans/2026-04-25-homepage-implementation.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
