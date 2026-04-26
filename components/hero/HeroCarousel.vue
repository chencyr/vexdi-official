<script setup lang="ts">
import { computed } from 'vue'

import { heroSlides } from '../../app/data/homepage'
import { useLineLink } from '../../composables/useLineLink'
import { useHeroStore } from '../../stores/hero'

const heroStore = useHeroStore()
const lineLink = useLineLink()

const currentSlide = computed(() => heroSlides[heroStore.activeIndex])
const previousSlide = computed(() => heroSlides[(heroStore.activeIndex + heroSlides.length - 1) % heroSlides.length])
const nextSlide = computed(() => heroSlides[(heroStore.activeIndex + 1) % heroSlides.length])

const values = [
  { title: '專業溝通流程', body: '需求釐清更精準' },
  { title: '彈性協作模式', body: '配合度高更安心' },
  { title: '高品質交付', body: '細節把關不馬虎' },
  { title: '長期合作夥伴', body: '一起成長與優化' },
]
</script>

<template>
  <section id="hero" class="hidden lg:block">
    <div class="relative overflow-hidden px-0 pb-10 pt-8">
      <button
        type="button"
        aria-label="Previous slide"
        class="absolute left-[7.25rem] top-[22rem] z-30 grid h-16 w-16 place-items-center rounded-full bg-white text-3xl font-black text-brand-ink shadow-xl xl:left-[7.5rem]"
        @click="heroStore.previousSlide()"
      >
        &lt;
      </button>
      <button
        type="button"
        data-next-slide
        aria-label="Next slide"
        class="absolute right-[7.25rem] top-[22rem] z-30 grid h-16 w-16 place-items-center rounded-full bg-white text-3xl font-black text-brand-ink shadow-xl xl:right-[7.5rem]"
        @click="heroStore.nextSlide()"
      >
        &gt;
      </button>

      <div class="relative min-h-[39rem]">
        <aside
          data-hero-preview="previous"
          class="absolute left-0 top-3 h-[36rem] w-[10.5rem] overflow-hidden rounded-r-[1.6rem] bg-white shadow-[0_22px_62px_rgba(21,54,88,0.16)] xl:w-[10.5rem]"
        >
          <img
            :src="previousSlide.image"
            :alt="`${previousSlide.key} carousel preview`"
            class="h-full w-full object-cover object-center"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.38))]" />
          <p class="absolute left-6 top-14 rounded-full bg-brand-teal px-4 py-2 text-sm font-black uppercase text-white shadow-lg">
            {{ previousSlide.displayLabel }}
          </p>
        </aside>

        <div
          data-hero-banner-stage
          class="relative mx-auto min-h-[36rem] max-w-[70rem] overflow-hidden rounded-[1.7rem] border border-white/80 bg-white shadow-[0_30px_90px_rgba(32,73,110,0.15)] xl:max-w-[70rem]"
        >
          <Transition name="hero-fade">
            <div
              :key="currentSlide.key"
              data-hero-fade-frame
              :data-slide-key="currentSlide.key"
              class="absolute inset-0"
            >
              <img
                data-hero-banner-artwork
                :src="currentSlide.image"
                :alt="`${currentSlide.key} carousel artwork`"
                class="absolute inset-y-0 right-0 h-full w-[66%] object-cover object-center"
                fetchpriority="high"
              >
              <div class="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_34%,rgba(255,255,255,0.88)_45%,rgba(255,255,255,0.08)_70%,rgba(255,255,255,0)_100%)]" />

              <div class="relative z-10 flex min-h-[36rem] max-w-[31rem] flex-col justify-center px-10 py-12">
                <p class="inline-flex w-fit rounded-xl bg-brand-teal px-5 py-3 text-lg font-black uppercase text-white shadow-lg">
                  {{ currentSlide.displayLabel }}
                </p>
                <h1 class="mt-7 text-6xl font-black leading-[1.08] text-brand-ink">
                  {{ currentSlide.title }}
                </h1>
                <p class="mt-6 max-w-lg text-lg leading-9 text-slate-600">
                  {{ currentSlide.description }}
                </p>
                <div class="mt-8 flex gap-5">
                  <a
                    data-primary-hero-cta
                    :href="lineLink"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center gap-3 whitespace-nowrap rounded-2xl bg-brand-coral px-6 py-4 text-lg font-black text-white shadow-[0_18px_42px_rgba(255,111,69,0.28)]"
                  >
                    {{ currentSlide.primaryCta.label }}
                    <svg data-hero-cta-icon class="h-5 w-5" aria-hidden="true" viewBox="0 0 32 32" fill="none">
                      <path d="M7 16h16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                      <path d="M17 9l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="#portfolio"
                    class="inline-flex items-center gap-3 whitespace-nowrap rounded-2xl border border-brand-ink/30 bg-white/90 px-6 py-4 text-lg font-bold text-brand-ink"
                  >
                    {{ currentSlide.secondaryCta.label }}
                    <svg data-hero-cta-icon class="h-5 w-5" aria-hidden="true" viewBox="0 0 32 32" fill="none">
                      <path d="M7 16h16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                      <path d="M17 9l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </a>
                </div>
                <ul class="mt-10 grid grid-cols-3 gap-6">
                  <li v-for="stat in currentSlide.stats" :key="stat.label" class="text-center">
                    <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white shadow-lg">
                      <img
                        data-hero-stat-icon
                        :src="stat.icon"
                        :alt="stat.value"
                        class="h-8 w-8"
                        loading="lazy"
                      >
                    </div>
                    <p class="mt-4 font-bold text-brand-ink">{{ stat.value }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ stat.label }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </div>

        <aside
          data-hero-preview="next"
          class="absolute right-0 top-3 h-[36rem] w-[10.5rem] overflow-hidden rounded-l-[1.6rem] bg-white shadow-[0_22px_62px_rgba(21,54,88,0.16)] xl:w-[10.5rem]"
        >
          <img
            :src="nextSlide.image"
            :alt="`${nextSlide.key} carousel preview`"
            class="h-full w-full object-cover object-center"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-[linear-gradient(270deg,rgba(255,255,255,0.08),rgba(255,255,255,0.42))]" />
          <p class="absolute right-6 top-14 rounded-full bg-brand-teal px-4 py-2 text-sm font-black uppercase text-white shadow-lg">
            {{ nextSlide.displayLabel }}
          </p>
        </aside>
      </div>

      <div class="mx-auto mt-2 flex max-w-xl items-center justify-center gap-5">
        <button
          v-for="(slide, index) in heroSlides"
          :key="slide.key"
          type="button"
          class="h-3 rounded-full transition"
          :class="index === heroStore.activeIndex ? 'w-12 bg-brand-teal' : 'w-3 bg-slate-300'"
          @click="heroStore.setSlide(index)"
        >
          <span class="sr-only">切換到 {{ slide.key }}</span>
        </button>
        <div class="ml-4 h-1 w-64 overflow-hidden rounded-full bg-slate-300">
          <div class="h-full rounded-full bg-brand-teal" :style="{ width: `${((heroStore.activeIndex + 1) / heroSlides.length) * 100}%` }" />
        </div>
        <span class="text-sm font-semibold text-slate-500">0{{ heroStore.activeIndex + 1 }} — 03</span>
      </div>

      <div class="mx-auto mt-12 grid max-w-[84rem] grid-cols-[1.1fr_0.9fr] gap-8 px-8">
        <section>
          <h2 class="text-2xl font-black text-brand-ink">我能為你帶來的價值</h2>
          <div class="mt-8 grid grid-cols-4 gap-6">
            <article v-for="value in values" :key="value.title" class="flex items-center gap-4">
              <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brand-teal text-brand-teal">+</span>
              <div>
                <h3 class="font-bold text-brand-ink">{{ value.title }}</h3>
                <p class="mt-1 text-sm text-slate-500">{{ value.body }}</p>
              </div>
            </article>
          </div>
        </section>
        <article class="flex items-center gap-6 rounded-[1.6rem] bg-white/85 p-6 shadow-xl">
          <div class="grid h-24 w-24 place-items-center rounded-full bg-[linear-gradient(135deg,#d8fbff,#ffcfb5)] text-3xl">AD</div>
          <div>
            <p class="font-black text-brand-ink">陳先生 <span class="text-sm font-medium text-slate-500">/ 遊戲工作室負責人</span></p>
            <p class="mt-2 text-brand-coral">★★★★★</p>
            <p class="mt-2 leading-7 text-slate-600">合作過程非常順利，對於美術風格呈現與系統設計都超出預期，完成度很高！</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.hero-fade-enter-to,
.hero-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
