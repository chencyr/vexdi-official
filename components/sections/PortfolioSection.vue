<script setup lang="ts">
import { portfolioItems } from '../../app/data/homepage'
import { usePortfolioStore } from '../../stores/portfolio'
import PortfolioModal from '../overlay/PortfolioModal.vue'

const portfolioStore = usePortfolioStore()

const categoryLabels = {
  game: '遊戲開發',
  website: '網頁設計',
  app: 'App 設計',
}
</script>

<template>
  <section id="portfolio" class="mx-4 space-y-5 lg:mx-0 lg:px-16">
    <div class="flex items-end justify-between">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.28em] text-brand-teal lg:hidden">Portfolio</p>
        <h2 class="text-3xl font-black text-brand-ink lg:text-4xl">精選作品</h2>
      </div>
      <a href="#contact" class="text-sm font-bold text-brand-teal">查看全部 →</a>
    </div>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      <button
        v-for="(item, index) in portfolioItems.concat(portfolioItems.slice(0, 1))"
        :key="`${item.slug}-${index}`"
        type="button"
        class="overflow-hidden rounded-[1.35rem] bg-white text-left shadow-[0_18px_46px_rgba(34,83,111,0.14)] transition hover:-translate-y-1"
        @click="portfolioStore.open(item.slug)"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="h-36 w-full object-cover lg:h-44"
          loading="lazy"
        >
        <div class="p-4">
          <h3 class="text-base font-black text-brand-ink">{{ item.title }}</h3>
          <span class="mt-3 inline-flex rounded-lg bg-brand-teal/12 px-3 py-1 text-xs font-black text-brand-teal">
            {{ categoryLabels[item.category] }}
          </span>
        </div>
      </button>
    </div>

    <PortfolioModal
      :open="portfolioStore.isOpen"
      :item="portfolioStore.activeItem"
      @close="portfolioStore.close()"
    />
  </section>
</template>
