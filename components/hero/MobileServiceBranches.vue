<script setup lang="ts">
const serviceCards = [
  {
    title: '形象網站',
    icon: '▧',
    body: '客製化品牌官網設計與 RWD 響應式網站',
    accent: 'text-brand-teal',
  },
  {
    title: '遊戲開發',
    icon: '☍',
    body: '2D / 3D 遊戲開發、遊戲原型與系統設計',
    accent: 'text-[#5f56d9]',
  },
  {
    title: 'App 設計',
    icon: '▯',
    body: 'iOS / Android App 介面設計與使用體驗優化',
    accent: 'text-brand-coral',
  },
]
</script>

<template>
  <section class="space-y-4 lg:hidden">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-black text-brand-ink">我能提供的服務</h2>
      <a href="#portfolio" class="text-sm font-bold text-brand-teal">查看全部 →</a>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <article
        v-for="service in serviceCards"
        :key="service.title"
        class="rounded-[1.35rem] bg-white p-4 text-center shadow-[0_18px_46px_rgba(34,83,111,0.12)]"
      >
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-slate-100 text-4xl" :class="service.accent">
          {{ service.icon }}
        </div>
        <h3 class="mt-4 text-lg font-black" :class="service.accent">{{ service.title }}</h3>
        <p class="mt-2 text-xs font-medium leading-5 text-slate-500">{{ service.body }}</p>
        <p class="mt-3 text-xl" :class="service.accent">→</p>
      </article>
    </div>
  </section>
</template>
