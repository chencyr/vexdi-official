# VEXDi Navbar E2E Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the actual navbar implementation to match the approved VEXDi navbar spec and verify it against the design assets with unit tests, build checks, and in-app browser E2E self-checks.

**Architecture:** Keep the existing `AppNavbar` ownership boundary and replace only its brand/nav/CTA presentation. Reuse the already-sliced assets in `public/images/ui/` instead of redrawing logo or icons in code. Use unit tests to lock markup and classes, then use browser E2E checks to verify the rendered page at `http://127.0.0.1:3000/`.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS, Vitest, `@nuxt/test-utils`, Codex in-app browser via Node REPL.

---

## Current State And Target

Current code state:
- `components/layout/AppNavbar.vue` still renders the old English nav items: `Game`, `Website`, `App`, `Portfolio`, `Contact`.
- `components/layout/AppNavbar.vue` still uses `BrandLogo`, old coral CTA styling, and old theme icon text.
- `components/icons/BrandLogo.vue` still renders the previous logo SVG with `data-logo-option="4"` and accessible title `Creative Tech Studio`.
- `public/images/ui/vexdi-logo-lockup.png` exists and has already passed asset checks: `180x58`, `RGBA`, transparent corners, not cut.
- `public/images/ui/vexdi-navbar.png` exists as the source spec slice: `1672x72`.

Target navbar spec:
- Logo: use `public/images/ui/vexdi-logo-lockup.png`.
- Desktop nav labels: `首頁`, `服務項目`, `案例作品`, `聯絡我們`.
- Active indicator: blue/violet underline tracks the section currently focused in the browser viewport.
- Active indicator changes use a short fade transition.
- CTA: cyan-to-violet gradient button with label `聯絡諮詢`.
- Theme icon: sun-style icon remains visually present.
- Mobile: keep direct mobile navigation visible as previously requested; do not restore hamburger-only behavior.
- No old English nav labels in visible nav.

Files to modify:
- `components/icons/BrandLogo.vue`: convert component to render the VEXDi lockup image with accessible name.
- `components/layout/AppNavbar.vue`: update nav labels, CTA, desktop/mobile styles, and test hooks.
- `tests/unit/components/BrandLogo.spec.ts`: update expectations for the image-based VEXDi logo.
- `tests/unit/components/AppNavbar.spec.ts`: update navbar spec expectations.

Files to read only:
- `public/images/ui/vexdi-navbar.png`: visual reference slice.
- `public/images/ui/vexdi-logo-lockup.png`: logo asset consumed by `BrandLogo`.
- `assets/references/vexdi-desktop-original-layout.png`: full-page design reference.

Verification commands:
- `npm.cmd run test -- tests/unit/components/BrandLogo.spec.ts tests/unit/components/AppNavbar.spec.ts`
- `npm.cmd run test`
- `npm.cmd run build`
- In-app browser E2E DOM/style check at `http://127.0.0.1:3000/`

---

### Task 1: Update BrandLogo Contract

**Files:**
- Modify: `tests/unit/components/BrandLogo.spec.ts`
- Modify: `components/icons/BrandLogo.vue`

- [ ] **Step 1: Write the failing BrandLogo test**

Replace `tests/unit/components/BrandLogo.spec.ts` with:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import BrandLogo from '../../../components/icons/BrandLogo.vue'

describe('BrandLogo', () => {
  it('renders the VEXDi lockup asset with an accessible name', () => {
    const wrapper = mount(BrandLogo)

    const linkableLogo = wrapper.get('[data-brand-logo]')
    const image = wrapper.get('img')

    expect(linkableLogo.attributes('aria-label')).toBe('VEXDi')
    expect(image.attributes('src')).toBe('/images/ui/vexdi-logo-lockup.png')
    expect(image.attributes('alt')).toBe('VEXDi')
    expect(image.classes()).toContain('h-auto')
    expect(image.classes()).toContain('w-[180px]')
  })
})
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm.cmd run test -- tests/unit/components/BrandLogo.spec.ts
```

Expected:
- FAIL because current `BrandLogo.vue` renders an SVG, not `[data-brand-logo] img`.

- [ ] **Step 3: Implement the minimal BrandLogo component**

Replace `components/icons/BrandLogo.vue` with:

```vue
<template>
  <span data-brand-logo class="inline-flex items-center" aria-label="VEXDi">
    <img
      src="/images/ui/vexdi-logo-lockup.png"
      alt="VEXDi"
      class="h-auto w-[180px] max-w-full"
      width="180"
      height="58"
      decoding="async"
    >
  </span>
</template>
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```powershell
npm.cmd run test -- tests/unit/components/BrandLogo.spec.ts
```

Expected:
- PASS for `BrandLogo`.

- [ ] **Step 5: Commit BrandLogo change**

Run:

```powershell
git add components/icons/BrandLogo.vue tests/unit/components/BrandLogo.spec.ts
git commit -m "fix: use vexdi logo asset"
```

---

### Task 2: Update AppNavbar Markup To Match Spec

**Files:**
- Modify: `tests/unit/components/AppNavbar.spec.ts`
- Modify: `components/layout/AppNavbar.vue`

- [ ] **Step 1: Write the failing AppNavbar test**

Replace `tests/unit/components/AppNavbar.spec.ts` with:

```ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import AppNavbar from '../../../components/layout/AppNavbar.vue'

describe('AppNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the VEXDi desktop navbar from the approved spec', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const desktopNav = wrapper.get('[data-desktop-nav-bar]')
    const logo = wrapper.get('[data-brand-logo] img')
    const cta = wrapper.get('[data-navbar-cta]')

    expect(logo.attributes('src')).toBe('/images/ui/vexdi-logo-lockup.png')
    expect(desktopNav.classes()).toContain('lg:h-[4.5rem]')
    expect(wrapper.find('[data-active-nav-indicator]').exists()).toBe(true)
    expect(wrapper.find('[data-active-nav-indicator]').classes()).toContain('transition-opacity')
    expect(cta.text()).toContain('聯絡諮詢')
    expect(cta.classes().join(' ')).toContain('from-[#00E5FF]')
    expect(cta.classes().join(' ')).toContain('to-[#7B61FF]')

    for (const label of ['首頁', '服務項目', '案例作品', '聯絡我們']) {
      expect(wrapper.text()).toContain(label)
    }

    expect(wrapper.text()).not.toContain('關於我們')

    for (const legacyLabel of ['Game', 'Website', 'App', 'Portfolio', 'Contact']) {
      expect(wrapper.text()).not.toContain(legacyLabel)
    }
  })

  it('keeps direct mobile navigation visible without a menu trigger', async () => {
    const wrapper = await mountSuspended(AppNavbar)

    const mobileNav = wrapper.get('[data-mobile-direct-nav]')

    expect(mobileNav.text()).toContain('首頁')
    expect(mobileNav.text()).toContain('服務項目')
    expect(mobileNav.text()).toContain('案例作品')
    expect(wrapper.find('[data-mobile-menu-trigger]').exists()).toBe(false)
  })
})
```

- [ ] **Step 2: Run the focused AppNavbar test and verify it fails**

Run:

```powershell
npm.cmd run test -- tests/unit/components/AppNavbar.spec.ts
```

Expected:
- FAIL because current nav still contains English labels and coral CTA classes.

- [ ] **Step 3: Implement the VEXDi navbar**

Replace `components/layout/AppNavbar.vue` with:

```vue
<script setup lang="ts">
import BrandLogo from '../icons/BrandLogo.vue'
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()

const navItems = [
  { label: '首頁', href: '#hero' },
  { label: '服務項目', href: '#process' },
  { label: '案例作品', href: '#portfolio' },
  { label: '聯絡我們', href: '#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 px-4 py-3 shadow-[0_1px_0_rgba(166,180,200,0.28)] backdrop-blur-xl lg:px-0 lg:py-0">
    <div
      data-desktop-nav-bar
      class="mx-auto flex max-w-[92rem] flex-col gap-3 bg-white/95 lg:h-[4.5rem] lg:max-w-full lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-16"
    >
      <div class="flex w-full items-center justify-between gap-4 lg:w-auto">
        <a href="#hero" class="flex min-w-0 items-center overflow-hidden" aria-label="回到首頁">
          <BrandLogo />
        </a>

        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="inline-flex shrink-0 items-center rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] px-4 py-2.5 text-sm font-bold text-white shadow-[0_18px_36px_rgba(0,229,255,0.2)] lg:hidden"
        >
          聯絡諮詢
        </a>
      </div>

      <nav class="hidden items-center gap-12 lg:flex" aria-label="主選單">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="relative text-base font-semibold text-[#0D1117] transition hover:text-[#7B61FF]"
        >
          {{ item.label }}
          <span
            v-if="item.label === '首頁'"
            data-active-nav-indicator
            class="absolute -bottom-4 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]"
          />
        </a>
      </nav>

      <nav
        data-mobile-direct-nav
        class="flex w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        aria-label="手機版主選單"
      >
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="shrink-0 rounded-full border border-[#A6B4C8]/40 bg-white px-4 py-2 text-sm font-bold text-[#0D1117] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-6 lg:flex">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[#212B3D]"
          aria-label="切換主題"
        >
          ☼
        </button>
        <a
          data-navbar-cta
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(0,229,255,0.2)]"
        >
          聯絡諮詢
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </header>
</template>
```

- [ ] **Step 4: Run focused navbar tests and verify they pass**

Run:

```powershell
npm.cmd run test -- tests/unit/components/BrandLogo.spec.ts tests/unit/components/AppNavbar.spec.ts
```

Expected:
- PASS for both spec files.

- [ ] **Step 5: Commit navbar implementation**

Run:

```powershell
git add components/layout/AppNavbar.vue tests/unit/components/AppNavbar.spec.ts
git commit -m "fix: align navbar with vexdi spec"
```

---

### Task 3: Add Page Anchors Required By Navbar

**Files:**
- Modify: `components/sections/TestimonialsSection.vue`
- Modify: `components/sections/FooterCtaSection.vue`
- Test: `tests/unit/pages/index.spec.ts`

- [ ] **Step 1: Read the current page test**

Run:

```powershell
Get-Content -Path tests\unit\pages\index.spec.ts
```

Expected:
- The test renders the homepage and checks visible sections.

- [ ] **Step 2: Add failing anchor assertions**

Update `tests/unit/pages/index.spec.ts` so the homepage test includes:

```ts
expect(wrapper.find('#hero').exists()).toBe(true)
expect(wrapper.find('#process').exists()).toBe(true)
expect(wrapper.find('#portfolio').exists()).toBe(true)
expect(wrapper.find('#testimonials').exists()).toBe(true)
expect(wrapper.find('#contact').exists()).toBe(true)
```

- [ ] **Step 3: Run the page test and verify it fails for missing anchors**

Run:

```powershell
npm.cmd run test -- tests/unit/pages/index.spec.ts
```

Expected:
- FAIL for `#testimonials` and/or `#contact` if those IDs are absent.

- [ ] **Step 4: Add stable IDs to sections**

In `components/sections/TestimonialsSection.vue`, change the root section from:

```vue
<section class="space-y-5 lg:px-16">
```

to:

```vue
<section id="testimonials" class="space-y-5 lg:px-16">
```

Confirm `components/sections/FooterCtaSection.vue` keeps this existing root section opening:

```vue
<section
  id="contact"
  class="rounded-[1.6rem] bg-[linear-gradient(135deg,#13b7c1_0%,#006d82_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,109,130,0.24)] lg:mx-16 lg:p-10"
>
```

No edit is needed in `FooterCtaSection.vue` if `id="contact"` is already present.

- [ ] **Step 5: Run the page test and verify it passes**

Run:

```powershell
npm.cmd run test -- tests/unit/pages/index.spec.ts
```

Expected:
- PASS.

- [ ] **Step 6: Commit anchor changes**

Run:

```powershell
git add components/sections/TestimonialsSection.vue components/sections/FooterCtaSection.vue tests/unit/pages/index.spec.ts
git commit -m "fix: add navbar target anchors"
```

---

### Task 4: Full Automated Verification

**Files:**
- No source changes expected.

- [ ] **Step 1: Run the full unit suite**

Run:

```powershell
npm.cmd run test
```

Expected:
- All test files pass.
- No new failed assertions.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm.cmd run build
```

Expected:
- Nuxt build exits with code `0`.
- Existing Nuxt warnings are acceptable only if they match prior known warnings from the toolchain.

- [ ] **Step 3: Stop if verification requires additional source tweaks**

If Task 4 exposes a new failure, do not make an unplanned broad fix. Return to the task that owns the failing file and add a specific test-first correction there.

Expected:
- No new files are changed by Task 4.
- No empty commit is created.

---

### Task 5: In-App Browser E2E Self-Check

**Files:**
- No source changes expected.
- Uses current in-app browser through Node REPL.

- [ ] **Step 1: Start or restart the local dev server**

Run:

```powershell
$project = 'C:\Users\abc102601\projects\creative-tech-studio\.worktrees\homepage-implementation'
$log = Join-Path $project '.dev-server.log'
$err = Join-Path $project '.dev-server.err.log'
$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not $listener) {
  Start-Process -FilePath 'npm.cmd' -ArgumentList @('run','dev','--','--host','127.0.0.1','--port','3000') -WorkingDirectory $project -WindowStyle Hidden -RedirectStandardOutput $log -RedirectStandardError $err
}
```

- [ ] **Step 2: Confirm the local server responds**

Run:

```powershell
Invoke-WebRequest -Uri 'http://127.0.0.1:3000/' -UseBasicParsing -TimeoutSec 5
```

Expected:
- HTTP status code `200`.

- [ ] **Step 3: Run desktop browser DOM/style check**

Use Node REPL with the in-app browser runtime:

```js
if (!globalThis.agent) {
  const { setupAtlasRuntime } = await import('C:/Users/abc102601/.codex/plugins/cache/openai-bundled/browser-use/0.1.0-alpha1/scripts/browser-client.mjs');
  await setupAtlasRuntime({ globals: globalThis, backend: 'iab' });
}
await agent.browser.nameSession('vexdi-navbar-e2e');
globalThis.tab = await agent.browser.tabs.selected();
if (!globalThis.tab) globalThis.tab = await agent.browser.tabs.new();
await tab.goto('http://127.0.0.1:3000/');
await tab.playwright.waitForLoadState({ state: 'load', timeoutMs: 30000 });

const navText = await tab.playwright.locator('[data-desktop-nav-bar]').innerText();
const desktopResult = {
  url: await tab.url(),
  title: await tab.title(),
  logoVisible: await tab.playwright.locator('[data-brand-logo] img').isVisible(),
  logoSrc: await tab.playwright.locator('[data-brand-logo] img').getAttribute('src'),
  navText,
  ctaText: await tab.playwright.locator('[data-navbar-cta]').innerText(),
  activeIndicatorCount: await tab.playwright.locator('[data-active-nav-indicator]').count(),
  activeIndicatorClass: await tab.playwright.locator('[data-active-nav-indicator]').getAttribute('class'),
  aboutNavCount: navText.includes('關於我們') ? 1 : 0,
  oldEnglishNavCount: await tab.playwright.locator('text=Game').count()
    + await tab.playwright.locator('text=Website').count()
    + await tab.playwright.locator('text=Portfolio').count(),
};

nodeRepl.write(JSON.stringify(desktopResult, null, 2));
```

Expected JSON:
- `logoVisible` is `true`.
- `logoSrc` contains `/images/ui/vexdi-logo-lockup.png`.
- `navText` contains `首頁`, `服務項目`, `案例作品`, `聯絡我們`, and does not contain `關於我們`.
- `ctaText` contains `聯絡諮詢`.
- `activeIndicatorCount` is `1`.
- `activeIndicatorClass` contains `transition-opacity`.
- `aboutNavCount` is `0`.
- After scrolling to `#portfolio`, the active indicator is on `案例作品`.
- `oldEnglishNavCount` is `0`.

- [ ] **Step 4: Run mobile browser DOM/style check**

Use Node REPL:

```js
const mobileResult = {
  mobileNavVisible: await tab.playwright.locator('[data-mobile-direct-nav]').isVisible(),
  mobileNavText: await tab.playwright.locator('[data-mobile-direct-nav]').innerText(),
  mobileMenuTriggerCount: await tab.playwright.locator('[data-mobile-menu-trigger]').count(),
};

nodeRepl.write(JSON.stringify(mobileResult, null, 2));
```

Expected JSON:
- `mobileNavVisible` is `true` when the in-app browser is in mobile/narrow layout.
- `mobileNavText` contains `首頁`, `服務項目`, `案例作品`.
- `mobileMenuTriggerCount` is `0`.

- [ ] **Step 5: Visual self-check against design slice**

Compare the rendered navbar against `public/images/ui/vexdi-navbar.png` manually in the in-app browser:
- Logo is on the left and uses the VEXDi lockup.
- Nav labels are centered horizontally.
- Active underline appears under `首頁`.
- Sun icon appears before the CTA.
- CTA is cyan-to-violet and reads `聯絡諮詢`.
- Header height is close to the spec slice height: around `72px`.

If any mismatch is found, return to Task 2 and adjust styles through TDD.

---

### Task 6: Final Status And Worktree Hygiene

**Files:**
- No source changes expected.

- [ ] **Step 1: Check git status**

Run:

```powershell
git status --short
```

Expected:
- Only pre-existing unrelated reference deletions/untracked CI image may remain:
  - `D assets/references/logo-concept-board-v1.png`
  - `D assets/references/vexdi-desktop-hero-carousel-final.png`
  - `D assets/references/vexdi-homepage-ci-redesign.png`
  - `D assets/references/vexdi-mobile-final-with-chat.png`
  - `D assets/references/vexdi-mobile-original-layout.png`
  - `?? assets/references/36dda622-072b-462c-b07f-92673d5d965d.png`

Do not revert or commit those unrelated reference changes unless the user explicitly asks.

- [ ] **Step 2: Report verification evidence**

Final response must include:
- Commits created.
- Unit test command and pass/fail result.
- Build command and pass/fail result.
- Browser E2E checks and key JSON values.
- Any remaining unrelated dirty worktree entries.

---

## Self-Review

Spec coverage:
- Navbar spec implementation is covered by Tasks 1 and 2.
- Current code inspection is covered in the Current State section and Task 2 failing tests.
- E2E self-check is covered by Task 5.
- Design consistency with the sliced navbar asset is covered by Task 5 Step 5.
- Worktree hygiene is covered by Task 6.

Placeholder scan:
- No placeholder markers or vague implementation steps remain.
- Each code-changing task includes exact file paths, code snippets, commands, and expected results.

Type and name consistency:
- Test selectors match planned implementation selectors: `data-brand-logo`, `data-desktop-nav-bar`, `data-mobile-direct-nav`, `data-navbar-cta`, `data-active-nav-indicator`.
- Asset paths match existing public files: `/images/ui/vexdi-logo-lockup.png`.
