<script setup lang="ts">
import BrandLogo from '../icons/BrandLogo.vue'
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()

const navItems = [
  { label: '首頁', href: '#hero' },
  { label: '服務項目', href: '#process' },
  { label: '案例作品', href: '#portfolio' },
  { label: '關於我們', href: '#testimonials' },
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
