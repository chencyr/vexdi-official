<script setup lang="ts">
import { processSteps } from '../../app/data/homepage'
</script>

<template>
  <section id="process" class="space-y-5 lg:px-16">
    <div>
      <p data-process-eyebrow class="text-sm font-black uppercase tracking-[0.28em] text-brand-teal lg:hidden">Process</p>
      <h2 class="mt-3 text-3xl font-black text-brand-ink lg:text-4xl">
        從想法到上線，流程保持清楚可追蹤
      </h2>
    </div>

    <div class="grid gap-4 lg:grid-cols-4">
      <article
        v-for="step in processSteps"
        :key="step.number"
        data-step
        class="rounded-[1.35rem] bg-white p-6 shadow-[0_18px_46px_rgba(34,83,111,0.12)]"
      >
        <p class="text-sm font-semibold tracking-[0.18em] text-brand-teal">{{ step.number }}</p>
        <h3 class="mt-4 text-xl font-bold text-brand-ink">{{ step.title }}</h3>
        <p class="mt-3 leading-7 text-slate-600">{{ step.description }}</p>
      </article>
    </div>
  </section>
</template>
