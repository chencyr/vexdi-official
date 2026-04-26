<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()
</script>

<template>
  <section
    id="contact"
    class="rounded-[36px] bg-[linear-gradient(135deg,#16b8c4_0%,#1a7fd4_55%,#2f5ef3_100%)] px-8 py-10 text-white shadow-[0_24px_70px_rgba(31,61,110,0.18)]"
  >
    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Start a Project</p>
    <h2 class="mt-3 text-4xl font-black leading-tight">有想法，就讓我們用設計把它說清楚</h2>
    <p class="mt-4 max-w-2xl text-base leading-8 text-white/85">
      不論你現在要整理品牌首頁、遊戲提案視覺，或是 App 介面方向，都可以直接加
      LINE 官方帳號，我會先陪你把需求拆清楚。
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a
        :href="lineLink"
        target="_blank"
        rel="noreferrer"
        class="rounded-full bg-white px-6 py-4 font-semibold text-brand-ink"
      >
        加 LINE 諮詢
      </a>
      <a
        href="#portfolio"
        class="rounded-full border border-white/30 px-6 py-4 font-semibold text-white"
      >
        查看作品
      </a>
    </div>
  </section>
</template>
