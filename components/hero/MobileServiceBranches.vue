<script setup lang="ts">
import { services } from '../../app/data/homepage'
</script>

<template>
  <section class="grid gap-4 lg:hidden">
    <article
      v-for="service in services"
      :id="service.key"
      :key="service.key"
      class="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-lg backdrop-blur"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
        {{ service.key }}
      </p>
      <h2 class="mt-3 text-2xl font-bold text-brand-ink">{{ service.title }}</h2>
      <p class="mt-3 leading-7 text-slate-600">{{ service.description }}</p>
    </article>
  </section>
</template>
