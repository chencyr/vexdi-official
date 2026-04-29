<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import BrandLogo from '../icons/BrandLogo.vue'
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()

const navItems = [
  { label: '首頁', href: '#hero', sectionId: 'hero' },
  { label: '服務項目', href: '#process', sectionId: 'process' },
  { label: '案例作品', href: '#portfolio', sectionId: 'portfolio' },
  { label: '聯絡我們', href: '#contact', sectionId: 'contact' },
]

const activeSection = ref(navItems[0].sectionId)

let observer: IntersectionObserver | undefined
let removeScrollFallback: (() => void) | undefined

const updateActiveFromScroll = () => {
  const viewportFocusLine = window.innerHeight * 0.42
  const closest = navItems
    .map((item) => {
      const element = document.getElementById(item.sectionId)
      const rect = element?.getBoundingClientRect()

      return rect
        ? { item, distance: Math.abs(rect.top - viewportFocusLine) }
        : undefined
    })
    .filter((entry): entry is { item: typeof navItems[number], distance: number } => Boolean(entry))
    .sort((a, b) => a.distance - b.distance)[0]

  if (closest) {
    activeSection.value = closest.item.sectionId
  }
}

onMounted(() => {
  const sections = navItems
    .map((item) => document.getElementById(item.sectionId))
    .filter((element): element is HTMLElement => Boolean(element))

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        const focusedEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (focusedEntry?.target.id) {
          activeSection.value = focusedEntry.target.id
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer?.observe(section))
    updateActiveFromScroll()

    return
  }

  window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
  window.addEventListener('resize', updateActiveFromScroll)
  updateActiveFromScroll()
  removeScrollFallback = () => {
    window.removeEventListener('scroll', updateActiveFromScroll)
    window.removeEventListener('resize', updateActiveFromScroll)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  removeScrollFallback?.()
})
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
          :data-mobile-nav-item="item.sectionId"
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

<style scoped>
.nav-indicator-fade-enter-active,
.nav-indicator-fade-leave-active {
  transition: opacity 180ms ease;
}

.nav-indicator-fade-enter-from,
.nav-indicator-fade-leave-to {
  opacity: 0;
}
</style>
