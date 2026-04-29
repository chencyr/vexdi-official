# Full Width Homepage and LINE Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the homepage to use a true 100% full-width layout, remove the floating chat/dialog UI, and make the navbar `聯絡我們` item open the official LINE external link.

**Architecture:** Keep the homepage as a single Nuxt page composed from existing section components. The page shell owns full-width layout constraints, `AppNavbar` owns navigation/link behavior, and the floating chat component is removed from the page render path instead of being hidden with CSS.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Tailwind CSS, Vitest, `@nuxt/test-utils`, in-app browser E2E through the Browser plugin.

---

## Updated Spec

- Full-page width: the homepage shell must be `100%` width on mobile and desktop. Do not cap the page shell with `lg:max-w-[96rem]`, `max-w-*`, or `mx-auto`.
- Preserve section-level internal spacing where needed, but the outer shell should not constrain the whole website width.
- Remove the chat/dialog UI shown in the design image. This means removing `LineFab` from `app/pages/index.vue`; do not leave it mounted and hidden.
- Navbar `聯絡我們` must link directly to the official LINE external URL from `useLineLink()`.
- Navbar `聯絡我們` must use `target="_blank"` and `rel="noreferrer"` because it leaves the site.
- Navbar active indicator should continue to track only in-page sections: `首頁`, `服務項目`, `案例作品`. The external `聯絡我們` item should not be observed as an in-page section.
- Existing CTA button behavior remains unchanged: it also links to LINE via `useLineLink()`.

## File Map

- Modify `app/pages/index.vue`
  - Remove `LineFab` import.
  - Remove `<LineFab />` from the template.
  - Change `data-homepage-shell` classes to a true full-width shell.
- Modify `components/layout/AppNavbar.vue`
  - Split navbar items into internal section links and the external LINE contact link.
  - Render `聯絡我們` with `:href="lineLink"`, `target="_blank"`, and `rel="noreferrer"`.
  - Keep active-section observation for internal section items only.
- Modify `tests/unit/pages/index.spec.ts`
  - Add regression coverage for no floating chat/dialog component.
  - Update wide-shell test to assert 100% full-width behavior and absence of max-width constraints.
- Modify `tests/unit/components/AppNavbar.spec.ts`
  - Add regression coverage that `聯絡我們` points to the runtime LINE official URL and is external.
  - Add coverage that only internal section links receive active indicator tracking attributes.

---

### Task 1: Homepage Shell and Floating Chat Regression Tests

**Files:**
- Modify: `tests/unit/pages/index.spec.ts`

- [ ] **Step 1: Write the failing homepage tests**

Replace the wide-shell test and add the no-chat assertion so the test file contains these expectations:

```ts
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
```

- [ ] **Step 2: Run the page tests to verify they fail**

Run:

```bash
npm.cmd run test -- tests/unit/pages/index.spec.ts
```

Expected:

```text
FAIL tests/unit/pages/index.spec.ts
Expected classes not to contain "mx-auto"
Expected classes not to contain "lg:max-w-[96rem]"
Expected LineFab not to exist
```

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/unit/pages/index.spec.ts
git commit -m "test: cover full-width homepage without chat fab"
```

---

### Task 2: Apply Full-Width Homepage Shell and Remove Chat Dialog

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Remove the `LineFab` import**

Change the imports at the top of `app/pages/index.vue` from:

```ts
import LineFab from '../../components/floating/LineFab.vue'
import HeroCarousel from '../../components/hero/HeroCarousel.vue'
```

to:

```ts
import HeroCarousel from '../../components/hero/HeroCarousel.vue'
```

- [ ] **Step 2: Replace the homepage shell classes and remove `<LineFab />`**

Change the template shell from:

```vue
<main data-homepage-shell class="mx-auto flex w-full max-w-full flex-col gap-7 px-4 pb-16 lg:max-w-[96rem] lg:px-0">
  <AppNavbar />
  <HeroCarousel />
  <MobileHeroIntro />
  <ProcessSection class="hidden lg:block" />
  <PortfolioSection />
  <TestimonialsSection />
  <FooterCtaSection />
  <LineFab />
</main>
```

to:

```vue
<main data-homepage-shell class="flex min-h-screen w-full max-w-full flex-col gap-7 overflow-x-hidden bg-white pb-16">
  <AppNavbar />
  <HeroCarousel />
  <MobileHeroIntro />
  <ProcessSection class="hidden lg:block" />
  <PortfolioSection />
  <TestimonialsSection />
  <FooterCtaSection />
</main>
```

- [ ] **Step 3: Run the page tests to verify they pass**

Run:

```bash
npm.cmd run test -- tests/unit/pages/index.spec.ts
```

Expected:

```text
Test Files  1 passed
Tests       3 passed
```

- [ ] **Step 4: Commit the homepage implementation**

```bash
git add app/pages/index.vue tests/unit/pages/index.spec.ts
git commit -m "fix: make homepage full width and remove chat fab"
```

---

### Task 3: Navbar LINE Contact Regression Tests

**Files:**
- Modify: `tests/unit/components/AppNavbar.spec.ts`

- [ ] **Step 1: Add a runtime config mock for the LINE official URL**

At the top of `tests/unit/components/AppNavbar.spec.ts`, after imports, add:

```ts
vi.mock('nuxt/app', () => ({
  useRuntimeConfig: () => ({
    public: {
      lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
    },
  }),
}))
```

- [ ] **Step 2: Add assertions for external `聯絡我們` behavior**

Inside `renders the VEXDi desktop navbar from the approved spec`, after the `cta` lookup, add:

```ts
const contactNav = wrapper.get('[data-nav-item="line-contact"]')

expect(contactNav.text()).toContain('聯絡我們')
expect(contactNav.attributes('href')).toBe('https://line.me/R/ti/p/@creative-tech-studio')
expect(contactNav.attributes('target')).toBe('_blank')
expect(contactNav.attributes('rel')).toBe('noreferrer')
expect(contactNav.attributes('data-active')).toBeUndefined()
```

- [ ] **Step 3: Add assertions that active tracking remains internal-only**

In the active-section test, after mounting `AppNavbar`, add:

```ts
expect(observe).toHaveBeenCalledTimes(3)
expect(wrapper.get('[data-nav-item="hero"]').attributes('data-active')).toBe('true')
expect(wrapper.get('[data-nav-item="process"]').attributes('data-active')).toBe('false')
expect(wrapper.get('[data-nav-item="portfolio"]').attributes('data-active')).toBe('false')
```

Remove any assertion that expects a contact section to be observed or active-tracked.

- [ ] **Step 4: Run the navbar tests to verify they fail**

Run:

```bash
npm.cmd run test -- tests/unit/components/AppNavbar.spec.ts
```

Expected:

```text
FAIL tests/unit/components/AppNavbar.spec.ts
Unable to find [data-nav-item="line-contact"]
```

- [ ] **Step 5: Commit the failing navbar tests**

```bash
git add tests/unit/components/AppNavbar.spec.ts
git commit -m "test: require navbar contact to open line externally"
```

---

### Task 4: Implement Navbar External LINE Contact Link

**Files:**
- Modify: `components/layout/AppNavbar.vue`

- [ ] **Step 1: Replace `navItems` with internal and external nav item groups**

Replace the current `navItems` array with:

```ts
const sectionNavItems = [
  { label: '首頁', href: '#hero', sectionId: 'hero' },
  { label: '服務項目', href: '#process', sectionId: 'process' },
  { label: '案例作品', href: '#portfolio', sectionId: 'portfolio' },
]

const contactNavItem = {
  label: '聯絡我們',
  href: lineLink,
}
```

Then update `activeSection`:

```ts
const activeSection = ref(sectionNavItems[0].sectionId)
```

And update all active tracking code to use `sectionNavItems` instead of `navItems`.

- [ ] **Step 2: Render internal section nav items with active tracking**

Change the desktop nav loop to:

```vue
<a
  v-for="item in sectionNavItems"
  :key="item.href"
  :href="item.href"
  :data-nav-item="item.sectionId"
  :data-active="String(activeSection === item.sectionId)"
  :aria-current="activeSection === item.sectionId ? 'page' : undefined"
  class="relative text-base font-semibold text-[#0D1117] transition hover:text-[#7B61FF]"
>
  {{ item.label }}
  <Transition name="nav-indicator-fade">
    <span
      v-if="activeSection === item.sectionId"
      data-active-nav-indicator
      class="absolute -bottom-4 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] transition-opacity duration-200"
    />
  </Transition>
</a>
```

- [ ] **Step 3: Render `聯絡我們` as the external LINE nav item**

Immediately after the internal desktop loop, add:

```vue
<a
  data-nav-item="line-contact"
  :href="contactNavItem.href"
  target="_blank"
  rel="noreferrer"
  class="relative text-base font-semibold text-[#0D1117] transition hover:text-[#7B61FF]"
>
  {{ contactNavItem.label }}
</a>
```

- [ ] **Step 4: Update mobile direct nav behavior**

Change the mobile loop to render internal items first:

```vue
<a
  v-for="item in sectionNavItems"
  :key="item.href"
  :href="item.href"
  :data-mobile-nav-item="item.sectionId"
  class="shrink-0 rounded-full border border-[#A6B4C8]/40 bg-white px-4 py-2 text-sm font-bold text-[#0D1117] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
>
  {{ item.label }}
</a>
```

Then add the external LINE mobile item:

```vue
<a
  data-mobile-nav-item="line-contact"
  :href="contactNavItem.href"
  target="_blank"
  rel="noreferrer"
  class="shrink-0 rounded-full border border-[#A6B4C8]/40 bg-white px-4 py-2 text-sm font-bold text-[#0D1117] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
>
  {{ contactNavItem.label }}
</a>
```

- [ ] **Step 5: Run navbar tests to verify they pass**

Run:

```bash
npm.cmd run test -- tests/unit/components/AppNavbar.spec.ts
```

Expected:

```text
Test Files  1 passed
Tests       3 passed
```

- [ ] **Step 6: Commit the navbar implementation**

```bash
git add components/layout/AppNavbar.vue tests/unit/components/AppNavbar.spec.ts
git commit -m "fix: link navbar contact to line externally"
```

---

### Task 5: Full Verification and Browser E2E

**Files:**
- No source files expected after this task unless verification finds a bug.

- [ ] **Step 1: Run focused tests**

Run:

```bash
npm.cmd run test -- tests/unit/pages/index.spec.ts tests/unit/components/AppNavbar.spec.ts
```

Expected:

```text
Test Files  2 passed
Tests       all passed
```

- [ ] **Step 2: Run the full test suite**

Run:

```bash
npm.cmd run test
```

Expected:

```text
Test Files  14 passed
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

Use the Browser plugin against `http://127.0.0.1:3000/` and verify:

```js
const shell = tab.playwright.locator('[data-homepage-shell]');
const navText = await tab.playwright.locator('[data-desktop-nav-bar]').innerText();
const contact = tab.playwright.locator('[data-nav-item="line-contact"]');
const result = {
  shellClass: await shell.getAttribute('class'),
  hasLineFab: await tab.playwright.locator('[data-line-fab]').count(),
  hasChatDialog: await tab.playwright.locator('[data-line-chat-dialog]').count(),
  navText,
  contactHref: await contact.getAttribute('href'),
  contactTarget: await contact.getAttribute('target'),
  contactRel: await contact.getAttribute('rel'),
};
nodeRepl.write(JSON.stringify(result, null, 2));
```

Expected JSON:

```json
{
  "hasLineFab": 0,
  "hasChatDialog": 0,
  "contactHref": "https://line.me/R/ti/p/@creative-tech-studio",
  "contactTarget": "_blank",
  "contactRel": "noreferrer"
}
```

Also confirm `shellClass` contains `w-full` and does not contain `mx-auto` or `lg:max-w-[96rem]`.

- [ ] **Step 5: Final commit if verification required fixes**

If Step 4 required any fixes:

```bash
git add app/pages/index.vue components/layout/AppNavbar.vue tests/unit/pages/index.spec.ts tests/unit/components/AppNavbar.spec.ts
git commit -m "fix: align homepage width and contact e2e"
```

If no fixes were needed, do not create an empty commit.

---

## Self-Review

- Spec coverage: full-width homepage shell is covered in Task 1 and Task 2; floating chat/dialog removal is covered in Task 1 and Task 2; navbar `聯絡我們` external LINE behavior is covered in Task 3 and Task 4; E2E verification is covered in Task 5.
- Placeholder scan: no unresolved placeholder phrases remain.
- Type consistency: `sectionNavItems`, `contactNavItem`, `activeSection`, `data-nav-item="line-contact"`, `data-line-fab`, and `data-line-chat-dialog` names are used consistently across test, implementation, and E2E steps.
