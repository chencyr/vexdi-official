<script setup lang="ts">
import { heroSlides } from '../../app/data/homepage'
import { useLineLink } from '../../composables/useLineLink'
import HeroVisualGame from './HeroVisualGame.vue'

const lineLink = useLineLink()
const gameSlide = heroSlides[0]
const servicePills = ['Game', 'Website', 'App']
</script>

<template>
  <section id="hero" class="lg:hidden">
    <div class="hero-surface rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[var(--shell-shadow)] backdrop-blur">
      <p
        data-mobile-hero-ribbon
        class="hero-ribbon inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
      >
        LINE Official Account · Direct Contact
      </p>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="pill in servicePills"
          :key="pill"
          data-mobile-hero-pill
          class="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
        >
          {{ pill }}
        </span>
      </div>

      <p class="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">
        {{ gameSlide.eyebrow }}
      </p>
      <h1 class="font-display mt-4 text-4xl font-black leading-tight text-brand-ink">
        {{ gameSlide.title }}
      </h1>
      <p class="mt-4 text-base leading-7 text-slate-600">
        {{ gameSlide.description }}
      </p>

      <div class="hero-visual-frame mt-6 rounded-[28px] bg-[linear-gradient(180deg,rgba(22,184,196,0.18),rgba(95,120,255,0.06))] p-4">
        <HeroVisualGame />
      </div>

      <div class="mt-6 flex flex-col gap-3">
        <a
          :href="lineLink"
          target="_blank"
          rel="noreferrer"
          class="rounded-full bg-brand-coral px-6 py-4 text-center font-semibold text-white"
        >
          {{ gameSlide.primaryCta.label }}
        </a>
        <a
          :href="gameSlide.secondaryCta.href"
          class="rounded-full border border-slate-200 bg-white px-6 py-4 text-center font-semibold text-slate-700"
        >
          {{ gameSlide.secondaryCta.label }}
        </a>
      </div>
    </div>
  </section>
</template>
