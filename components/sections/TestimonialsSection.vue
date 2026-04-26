<script setup lang="ts">
import { testimonials } from '../../app/data/homepage'
</script>

<template>
  <section class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">
        Testimonials
      </p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">合作回饋，讓信任更快成立</h2>
      <p class="mt-3 max-w-2xl text-base leading-8 text-slate-600">
        保留固定 3 張卡片，讓這一段像作品說明後的補強證據，不搶主視覺，但能穩定補上可信度。
      </p>
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <article
        v-for="item in testimonials"
        :key="item.name"
        class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-lg font-bold text-brand-ink">{{ item.name }}</p>
            <p class="mt-1 text-sm font-semibold text-brand-teal">{{ item.role }}</p>
          </div>
          <span
            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
          >
            Review
          </span>
        </div>
        <p class="mt-5 leading-7 text-slate-600">{{ item.quote }}</p>
      </article>
    </div>
  </section>
</template>
