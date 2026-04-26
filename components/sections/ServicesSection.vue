<script setup lang="ts">
import { services } from '../../app/data/homepage'
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Services</p>
        <h2 class="mt-3 text-4xl font-black text-brand-ink">三種服務，對齊同一個品牌故事</h2>
      </div>
      <a href="#contact" class="hidden text-sm font-semibold text-brand-teal lg:inline-flex">
        開始討論
      </a>
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <article
        v-for="service in services"
        :id="service.key"
        :key="service.key"
        class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur"
      >
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
          {{ service.key }}
        </p>
        <h3 class="mt-4 text-2xl font-bold text-brand-ink">{{ service.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>
