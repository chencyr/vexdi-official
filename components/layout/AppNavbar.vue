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
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 px-4 py-4 lg:px-8">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-[var(--shell-shadow)] backdrop-blur"
    >
      <a href="#hero" class="flex min-w-0 items-center gap-3 overflow-hidden" aria-label="回到首頁">
        <BrandLogo />
      </a>

      <nav class="hidden items-center gap-7 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-semibold text-slate-700 transition hover:text-brand-teal"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="hidden rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,139,77,0.35)] lg:inline-flex"
        >
          加 LINE 諮詢
        </a>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden"
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
