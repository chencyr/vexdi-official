<script setup lang="ts">
import BrandLogo from '../icons/BrandLogo.vue'
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()

const navItems = [
  { label: 'Game', href: '#game' },
  { label: 'Website', href: '#website' },
  { label: 'App', href: '#app' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 px-4 py-4 lg:px-0 lg:py-0">
    <div
      data-desktop-nav-bar
      class="mx-auto flex max-w-[92rem] flex-col gap-3 rounded-[2rem] border border-white/70 bg-white/90 px-5 py-3 shadow-[0_18px_60px_rgba(20,55,90,0.08)] backdrop-blur-xl lg:h-[4.625rem] lg:max-w-full lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:rounded-none lg:border-x-0 lg:px-16 lg:py-0 lg:shadow-none"
    >
      <div class="flex w-full items-center justify-between gap-4 lg:w-auto">
        <a href="#hero" class="flex min-w-0 items-center gap-3 overflow-hidden" aria-label="回到首頁">
          <BrandLogo />
        </a>

        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="inline-flex shrink-0 items-center rounded-2xl bg-brand-coral px-4 py-2.5 text-sm font-bold text-white shadow-[0_18px_36px_rgba(255,111,69,0.22)] lg:hidden"
        >
          預約諮詢
        </a>
      </div>

      <nav class="hidden items-center gap-12 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="relative text-base font-medium text-brand-ink transition hover:text-brand-teal"
        >
          {{ item.label }}
          <span
            v-if="item.label === 'Game'"
            class="absolute -bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-teal"
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
          class="shrink-0 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-teal hover:text-brand-teal"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-4 lg:flex">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl text-brand-ink"
          aria-label="切換主題"
        >
          ☼
        </button>
        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 rounded-2xl bg-brand-coral px-6 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(255,111,69,0.28)]"
        >
          <span aria-hidden="true">▣</span>
          預約諮詢
        </a>
      </div>
    </div>
  </header>
</template>
