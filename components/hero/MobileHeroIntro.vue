<script setup lang="ts">
import { computed, ref } from 'vue'

import { heroSlides } from '../../app/data/homepage'
import { useLineLink } from '../../composables/useLineLink'
import { useHeroStore } from '../../stores/hero'

const heroStore = useHeroStore()
const lineLink = useLineLink()
const touchStartX = ref<number | null>(null)
const touchStartY = ref<number | null>(null)
const swipeThreshold = 48

const currentSlide = computed(() => heroSlides[heroStore.activeIndex] ?? heroSlides[0])

function handleTouchStart(event: TouchEvent) {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
  touchStartY.value = event.changedTouches[0]?.clientY ?? null
}

function handleTouchEnd(event: TouchEvent) {
  if (touchStartX.value === null || touchStartY.value === null) return

  const touch = event.changedTouches[0]
  const touchEndX = touch?.clientX ?? touchStartX.value
  const touchEndY = touch?.clientY ?? touchStartY.value
  const deltaX = touchEndX - touchStartX.value
  const deltaY = touchEndY - touchStartY.value

  touchStartX.value = null
  touchStartY.value = null

  if (Math.abs(deltaY) > Math.abs(deltaX)) return
  if (Math.abs(deltaX) < swipeThreshold) return

  if (deltaX < 0) heroStore.nextSlide()
  else heroStore.previousSlide()
}
</script>

<template>
  <section id="hero" data-mobile-hero class="lg:hidden">
    <div
      data-mobile-hero-swipe-zone
      class="relative overflow-hidden rounded-[2rem] bg-white/90 p-5 shadow-[0_24px_70px_rgba(16,63,84,0.16)]"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div data-mobile-hero-slide :data-slide-key="currentSlide.key">
        <div class="relative z-10">
          <p class="inline-flex w-fit rounded-xl bg-brand-teal px-4 py-2 text-sm font-black uppercase text-white shadow-lg">
            {{ currentSlide.displayLabel }}
          </p>
          <h1 class="mt-5 text-[2.65rem] font-black leading-[1.15] tracking-[-0.02em] text-brand-ink">
            {{ currentSlide.title }}
          </h1>
          <p class="mt-5 max-w-[18rem] text-sm font-medium leading-7 text-slate-600">
            {{ currentSlide.description }}
          </p>
        </div>

        <div class="relative mt-4 overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
          <img
            data-mobile-hero-image
            :src="currentSlide.image"
            :alt="`${currentSlide.key} mobile hero artwork`"
            class="h-[27rem] w-full object-cover object-center"
            fetchpriority="high"
          >
          <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/80" />
        </div>

        <div data-mobile-hero-cta-container class="relative z-10 mt-5 flex flex-col">
          <a
            :href="lineLink"
            target="_blank"
            rel="noreferrer"
            class="flex items-center justify-between rounded-2xl bg-brand-coral px-7 py-4 text-xl font-black text-white shadow-[0_18px_38px_rgba(255,111,69,0.32)]"
          >
            <span>{{ currentSlide.primaryCta.label }}</span>
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-center gap-3">
        <button
          v-for="(slide, index) in heroSlides"
          :key="slide.key"
          type="button"
          :data-mobile-hero-dot="slide.key"
          :aria-current="index === heroStore.activeIndex ? 'true' : undefined"
          class="h-3 rounded-full transition"
          :class="index === heroStore.activeIndex ? 'w-10 bg-brand-teal' : 'w-3 bg-slate-300'"
          @click="heroStore.setSlide(index)"
        >
          <span class="sr-only">Switch to {{ slide.key }} slide</span>
        </button>
      </div>
    </div>
  </section>
</template>
