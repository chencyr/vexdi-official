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

      <div class="relative mt-2 min-h-[27rem]">
        <div class="absolute left-1/2 top-0 h-[27rem] w-[14rem] -translate-x-1/2 rounded-[7rem_7rem_4rem_4rem] bg-[linear-gradient(180deg,#122843_0%,#23bcc7_43%,#f7fbff_44%,#182b4d_100%)] shadow-2xl">
          <div class="absolute left-1/2 top-7 h-24 w-24 -translate-x-1/2 rounded-full bg-[#f6d5c9] shadow-[0_0_0_18px_rgba(12,31,58,0.92)]" />
          <div class="absolute -left-9 top-24 h-44 w-20 rotate-12 rounded-full bg-[#102744]" />
          <div class="absolute -right-9 top-24 h-44 w-20 -rotate-12 rounded-full bg-[#102744]" />
          <div class="absolute left-1/2 top-36 h-28 w-28 -translate-x-1/2 rounded-[2rem] border-4 border-white/80 bg-white/70" />
        </div>
        <div class="absolute left-0 top-20 w-36 rotate-[-8deg] rounded-2xl bg-slate-900 p-2 text-white shadow-xl">
          <p class="mb-2 w-fit rounded-full bg-brand-teal px-2 py-1 text-[10px] font-black">GAME UI</p>
          <div class="grid grid-cols-5 gap-1">
            <span v-for="item in 10" :key="item" class="aspect-square rounded bg-white/15" />
          </div>
        </div>
        <div class="absolute right-0 top-8 w-36 rotate-6 rounded-2xl bg-white p-2 shadow-xl">
          <p class="mb-2 w-fit rounded-full bg-brand-teal px-2 py-1 text-[10px] font-black text-white">WEBSITE</p>
          <div class="h-20 rounded-xl bg-[linear-gradient(135deg,#d9f9ff,#b7c3ff)]" />
        </div>
        <div class="absolute bottom-0 right-2 w-28 rounded-[1.6rem] bg-slate-950 p-2 shadow-xl">
          <p class="mb-2 w-fit rounded-full bg-brand-teal px-2 py-1 text-[10px] font-black text-white">APP</p>
          <div class="h-40 rounded-[1.2rem] bg-[linear-gradient(180deg,#d8fbff,#245a74)]" />
        </div>
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
