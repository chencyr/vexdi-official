<script setup lang="ts">
import { processSteps } from '../../app/data/homepage'
</script>

<template>
  <section id="process" class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Process</p>
      <h2 class="mt-3 text-4xl font-black text-brand-ink">
        從想法到上線，流程保持清楚可追蹤
      </h2>
    </div>

    <div class="grid gap-4 lg:grid-cols-4">
      <article
        v-for="step in processSteps"
        :key="step.number"
        data-step
        class="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur"
      >
        <p class="text-sm font-semibold tracking-[0.18em] text-brand-teal">{{ step.number }}</p>
        <h3 class="mt-4 text-xl font-bold text-brand-ink">{{ step.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ step.description }}</p>
      </article>
    </div>
  </section>
</template>
