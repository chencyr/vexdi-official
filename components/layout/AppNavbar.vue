<script setup lang="ts">
import BrandLogo from '../icons/BrandLogo.vue'
import MobileNavPanel from './MobileNavPanel.vue'
import { useLineLink } from '../../composables/useLineLink'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
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
  <header class="sticky top-0 z-40 px-4 py-4 lg:px-0">
    <div
      class="mx-auto flex max-w-[92rem] items-center justify-between rounded-[2rem] border border-white/70 bg-white/90 px-5 py-3 shadow-[0_18px_60px_rgba(20,55,90,0.08)] backdrop-blur-xl lg:rounded-none lg:border-x-0 lg:px-16"
    >
      <a href="#hero" class="flex min-w-0 items-center gap-3 overflow-hidden" aria-label="回到首頁">
        <BrandLogo />
      </a>

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

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="hidden h-11 w-11 items-center justify-center rounded-full text-2xl text-brand-ink lg:inline-flex"
          aria-label="切換主題"
        >
          ☼
        </button>
        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="hidden items-center gap-2 rounded-2xl bg-brand-coral px-6 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(255,111,69,0.28)] lg:inline-flex"
        >
          <span aria-hidden="true">▣</span>
          預約諮詢
        </a>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xl text-brand-ink lg:hidden"
          @click="uiStore.toggleMobileMenu()"
        >
          <span class="sr-only">開啟選單</span>
          ☰
        </button>
      </div>
    </div>

    <MobileNavPanel
      :open="uiStore.mobileMenuOpen"
      :items="navItems"
      @close="uiStore.closeMobileMenu()"
    />
  </header>
</template>
