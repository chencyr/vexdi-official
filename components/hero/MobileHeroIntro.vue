<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()
</script>

<template>
  <section id="hero" class="lg:hidden">
    <div class="relative overflow-hidden rounded-[2rem] bg-white/90 p-5 shadow-[0_24px_70px_rgba(16,63,84,0.16)]">
      <div class="relative z-10">
        <h1 class="pt-2 text-[2.65rem] font-black leading-[1.15] tracking-[-0.02em] text-brand-ink">
          創意 × 技術<br>
          打造有價值的<br>
          <span class="text-brand-teal">數位體驗</span>
        </h1>
        <p class="mt-5 max-w-[18rem] text-sm font-medium leading-7 text-slate-600">
          專注於形象網站、遊戲開發與 App 設計，協助品牌與創作者打造出色的數位作品。
        </p>
      </div>

      <div class="relative mt-4 overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
        <img
          src="/images/carousel/game-hero.png"
          alt="game carousel artwork"
          class="h-[27rem] w-full object-cover object-[58%_center]"
          fetchpriority="high"
        >
        <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/80" />
      </div>

      <div class="relative z-10 -mt-5 flex flex-col gap-3">
        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="flex items-center justify-between rounded-2xl bg-brand-coral px-7 py-4 text-xl font-black text-white shadow-[0_18px_38px_rgba(255,111,69,0.32)]"
        >
          <span>▣ 預約諮詢</span>
          <span>→</span>
        </a>
        <a
          href="#portfolio"
          class="flex items-center justify-between rounded-2xl bg-white px-7 py-4 text-lg font-bold text-brand-ink shadow-lg"
        >
          <span>查看作品</span>
          <span>→</span>
        </a>
      </div>
    </div>
  </section>
</template>
