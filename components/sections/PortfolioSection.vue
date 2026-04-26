<script setup lang="ts">
import { portfolioItems } from '../../app/data/homepage'
import { usePortfolioStore } from '../../stores/portfolio'
import PortfolioModal from '../overlay/PortfolioModal.vue'

const portfolioStore = usePortfolioStore()

const categoryLabels = {
  game: 'Game',
  website: 'Website',
  app: 'App',
}
</script>

<template>
  <section id="portfolio" class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Portfolio</p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">精選示意專案</h2>
      <p class="mt-3 max-w-2xl text-base leading-8 text-slate-600">
        先用三種不同類型的提案示意，把互動層次、品牌語氣與產品邏輯整理成可以快速理解的作品敘事。
      </p>
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <button
        v-for="item in portfolioItems"
        :key="item.slug"
        type="button"
        class="rounded-[32px] border border-white/70 bg-white/85 p-6 text-left shadow-lg backdrop-blur"
        @click="portfolioStore.open(item.slug)"
      >
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
          {{ categoryLabels[item.category] }}
        </p>
        <h3 class="mt-4 text-2xl font-bold text-brand-ink">{{ item.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ item.summary }}</p>
      </button>
    </div>

    <PortfolioModal
      :open="portfolioStore.isOpen"
      :item="portfolioStore.activeItem"
      @close="portfolioStore.close()"
    />
  </section>
</template>
