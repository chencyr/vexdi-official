<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40">
    <div class="mb-4 hidden w-80 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_70px_rgba(0,50,70,0.24)] sm:block lg:hidden">
      <div class="bg-[linear-gradient(135deg,#006d82,#13b7c1)] p-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-black">專案諮詢中</p>
            <p class="mt-1 text-xs text-white/80">線上 · 通常幾分鐘內回覆</p>
          </div>
          <span class="rounded-full bg-white/20 px-3 py-1 text-sm">LIVE</span>
        </div>
      </div>
      <div class="space-y-3 p-4 text-sm">
        <p class="ml-auto max-w-[13rem] rounded-2xl bg-brand-teal px-4 py-3 text-white">
          我想做品牌形象網站，方便估時程嗎？
        </p>
        <p class="max-w-[13rem] rounded-2xl bg-slate-100 px-4 py-3 text-slate-600">
          可以，先聊需求後我會提供初步規劃。
        </p>
        <div class="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-slate-400">
          <span class="grow">輸入訊息...</span>
          <span class="grid h-9 w-9 place-items-center rounded-full bg-brand-teal text-white">➤</span>
        </div>
      </div>
    </div>
    <a
      :href="lineLink"
      target="_blank"
      rel="noreferrer"
      class="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b7180,#12c4b9)] text-4xl text-white shadow-[0_0_0_10px_rgba(22,184,196,0.12),0_20px_50px_rgba(0,109,130,0.3)]"
      aria-label="開啟 LINE 諮詢"
    >
      💬
      <span class="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-red-500 text-sm font-black">1</span>
    </a>
  </div>
</template>
