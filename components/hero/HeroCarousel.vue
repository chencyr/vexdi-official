<script setup lang="ts">
import { computed } from 'vue'

import { heroSlides } from '../../app/data/homepage'
import { useLineLink } from '../../composables/useLineLink'
import { useHeroStore } from '../../stores/hero'
import HeroVisualApp from './HeroVisualApp.vue'
import HeroVisualGame from './HeroVisualGame.vue'
import HeroVisualWebsite from './HeroVisualWebsite.vue'

const heroStore = useHeroStore()
const lineLink = useLineLink()

const currentSlide = computed(() => heroSlides[heroStore.activeIndex])
const visuals = {
  game: HeroVisualGame,
  website: HeroVisualWebsite,
  app: HeroVisualApp,
}
const servicePills = [
  { key: 'game', label: 'Game' },
  { key: 'website', label: 'Website' },
  { key: 'app', label: 'App' },
]
</script>

<template>
  <section id="hero" class="hidden lg:block">
    <div
      class="hero-surface grid gap-10 rounded-[42px] border border-white/70 bg-white/85 p-8 shadow-[var(--shell-shadow)] backdrop-blur xl:grid-cols-[1.05fr_1.2fr]"
    >
      <div class="flex flex-col justify-between gap-8">
        <div class="space-y-6">
          <p
            data-hero-ribbon
            class="hero-ribbon inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            LINE Official Account · Fast Reply
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="pill in servicePills"
              :key="pill.key"
              data-hero-pill
              class="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition"
              :class="
                currentSlide.key === pill.key
                  ? 'border-brand-teal bg-brand-teal/10 text-brand-ink'
                  : 'border-slate-200 bg-white text-slate-500'
              "
            >
              {{ pill.label }}
            </span>
          </div>

          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">
            {{ currentSlide.eyebrow }}
          </p>
          <h1 class="font-display text-[3.35rem] font-black leading-[1.02] text-brand-ink">
            {{ currentSlide.title }}
          </h1>
          <p class="max-w-xl text-lg leading-8 text-slate-600">
            {{ currentSlide.description }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="lineLink"
            target="_blank"
            rel="noreferrer"
            class="rounded-full bg-brand-coral px-7 py-4 font-semibold text-white shadow-[0_20px_42px_rgba(255,139,77,0.35)] transition hover:-translate-y-0.5"
          >
            {{ currentSlide.primaryCta.label }}
          </a>
          <a
            :href="currentSlide.secondaryCta.href"
            class="rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:-translate-y-0.5"
          >
            {{ currentSlide.secondaryCta.label }}
          </a>
          <p class="text-sm font-medium text-slate-500">Response time: within 24h</p>
        </div>

        <ul class="grid gap-3 sm:grid-cols-3">
          <li
            v-for="stat in currentSlide.stats"
            :key="`${stat.label}-${stat.value}`"
            class="rounded-3xl border border-white/70 bg-slate-50/85 px-4 py-4"
          >
            <p class="text-xs uppercase tracking-[0.18em] text-slate-400">{{ stat.label }}</p>
            <p class="mt-2 font-display text-base font-bold text-slate-700">{{ stat.value }}</p>
          </li>
        </ul>
      </div>

      <div class="space-y-5">
        <div
          class="hero-visual-frame relative overflow-hidden rounded-[38px] bg-[linear-gradient(135deg,rgba(22,184,196,0.18),rgba(95,120,255,0.12))] p-6"
        >
          <span class="hero-glow hero-glow-left" aria-hidden="true" />
          <span class="hero-glow hero-glow-right" aria-hidden="true" />
          <component :is="visuals[currentSlide.key]" />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <button
              v-for="(slide, index) in heroSlides"
              :key="slide.key"
              type="button"
              class="h-3 rounded-full transition"
              :class="index === heroStore.activeIndex ? 'w-10 bg-brand-teal' : 'w-3 bg-slate-300'"
              @click="heroStore.setSlide(index)"
            >
              <span class="sr-only">切換到{{ slide.key }}</span>
            </button>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-full border border-slate-200 bg-white px-4 py-3"
              @click="heroStore.previousSlide()"
            >
              Prev
            </button>
            <button
              type="button"
              data-next-slide
              class="rounded-full border border-slate-200 bg-white px-4 py-3"
              @click="heroStore.nextSlide()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
