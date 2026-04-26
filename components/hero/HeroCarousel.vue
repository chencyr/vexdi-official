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
    <div class="relative overflow-hidden px-0 pb-10 pt-4">
      <button
        type="button"
        class="absolute left-5 top-[24rem] z-20 grid h-16 w-16 place-items-center rounded-full bg-white text-4xl text-brand-ink shadow-xl"
        @click="heroStore.previousSlide()"
      >
        ‹
      </button>
      <button
        type="button"
        data-next-slide
        class="absolute right-5 top-[24rem] z-20 grid h-16 w-16 place-items-center rounded-full bg-white text-4xl text-brand-ink shadow-xl"
        @click="heroStore.nextSlide()"
      >
        ›
      </button>

      <div class="grid grid-cols-[10rem_1fr_10rem] gap-7 xl:grid-cols-[14rem_1fr_14rem]">
        <aside class="mt-12 min-h-[38rem] overflow-hidden rounded-r-[1.6rem] bg-[linear-gradient(160deg,#dbeafe,#ffffff)] p-6 shadow-lg opacity-90">
          <p class="rounded-full bg-brand-teal px-4 py-2 text-sm font-black uppercase text-white">
            {{ previousSlide.key }}
          </p>
          <h3 class="mt-16 text-3xl font-black leading-tight text-brand-ink">{{ previousSlide.title }}</h3>
          <img
            :src="previousSlide.image"
            :alt="`${previousSlide.key} carousel preview`"
            class="mt-10 h-80 w-full rounded-[2rem] object-cover object-center shadow-xl"
            loading="lazy"
          >
        </aside>

        <div class="rounded-[1.8rem] border border-white/80 bg-white/88 p-10 shadow-[0_30px_90px_rgba(32,73,110,0.12)] backdrop-blur-xl">
          <div class="grid min-h-[36rem] grid-cols-[0.82fr_1.18fr] gap-8">
            <div class="flex flex-col justify-center">
              <p class="text-lg font-black text-brand-ink">
                <span class="text-3xl">0{{ heroStore.activeIndex + 1 }}</span>
                <span class="text-slate-300"> / 03</span>
              </p>
              <p class="mt-7 inline-flex w-fit rounded-xl bg-brand-teal px-5 py-3 text-lg font-black uppercase text-white shadow-lg">
                {{ currentSlide.key }}
              </p>
              <h1 class="mt-8 text-6xl font-black leading-[1.08] tracking-[-0.01em] text-brand-ink">
                {{ currentSlide.title }}
              </h1>
              <p class="mt-6 max-w-lg text-lg leading-9 text-slate-600">
                {{ currentSlide.description }}
              </p>
              <div class="mt-8 flex gap-5">
                <a
                  :href="lineLink"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-4 rounded-2xl bg-brand-coral px-8 py-4 text-lg font-black text-white shadow-[0_18px_42px_rgba(255,111,69,0.28)]"
                >
                  ▣ 聊聊你的遊戲企劃 <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#portfolio"
                  class="inline-flex items-center gap-4 rounded-2xl border border-brand-ink/30 bg-white px-8 py-4 text-lg font-bold text-brand-ink"
                >
                  查看遊戲作品 <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul class="mt-10 grid grid-cols-3 gap-6">
                <li v-for="stat in currentSlide.stats" :key="stat.label" class="text-center">
                  <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-brand-teal shadow-lg">◇</div>
                  <p class="mt-4 font-bold text-brand-ink">{{ stat.value }}</p>
                  <p class="mt-1 text-sm text-slate-500">{{ stat.label }}</p>
                </li>
              </ul>
            </div>

            <div class="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(22,66,92,0.16)]">
              <img
                :src="currentSlide.image"
                :alt="`${currentSlide.key} carousel artwork`"
                class="h-full min-h-[36rem] w-full object-cover object-center"
                fetchpriority="high"
              >
              <div class="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/70" />
            </div>
          </div>
        </div>

        <aside class="mt-12 min-h-[38rem] overflow-hidden rounded-l-[1.6rem] bg-[linear-gradient(160deg,#ddd6fe,#ffffff)] p-8 shadow-lg opacity-90">
          <p class="text-right text-2xl font-black text-white">03 / 03</p>
          <p class="ml-auto mt-8 w-fit rounded-full bg-brand-teal px-5 py-3 text-lg font-black uppercase text-white">
            {{ nextSlide.key }}
          </p>
          <h3 class="mt-16 text-4xl font-black leading-tight text-brand-ink">{{ nextSlide.title }}</h3>
          <p class="mt-5 text-slate-600">{{ nextSlide.description }}</p>
          <img
            :src="nextSlide.image"
            :alt="`${nextSlide.key} carousel preview`"
            class="mt-10 h-72 w-full rounded-[2rem] object-cover object-center shadow-xl"
            loading="lazy"
          >
        </aside>
      </div>

      <div class="mx-auto mt-6 flex max-w-xl items-center justify-center gap-5">
        <button
          v-for="(slide, index) in heroSlides"
          :key="slide.key"
          type="button"
          class="h-3 rounded-full transition"
          :class="index === heroStore.activeIndex ? 'w-12 bg-brand-teal' : 'w-3 bg-slate-300'"
          @click="heroStore.setSlide(index)"
        >
          <span class="sr-only">切換到{{ slide.key }}</span>
        </button>
        <div class="ml-4 h-1 w-64 overflow-hidden rounded-full bg-slate-300">
          <div class="h-full rounded-full bg-brand-teal" :style="{ width: `${((heroStore.activeIndex + 1) / heroSlides.length) * 100}%` }" />
        </div>
        <span class="text-sm font-semibold text-slate-500">0{{ heroStore.activeIndex + 1 }} — 03</span>
      </div>

      <div class="mx-auto mt-12 grid max-w-[78rem] grid-cols-[1.1fr_0.9fr] gap-8">
        <section>
          <h2 class="text-2xl font-black text-brand-ink">我能為你帶來的價值</h2>
          <div class="mt-8 grid grid-cols-4 gap-6">
            <article v-for="value in values" :key="value.title" class="flex items-center gap-4">
              <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brand-teal text-brand-teal">◇</span>
              <div>
                <h3 class="font-bold text-brand-ink">{{ value.title }}</h3>
                <p class="mt-1 text-sm text-slate-500">{{ value.body }}</p>
              </div>
            </article>
          </div>
        </section>
        <article class="flex items-center gap-6 rounded-[1.6rem] bg-white/85 p-6 shadow-xl">
          <div class="grid h-24 w-24 place-items-center rounded-full bg-[linear-gradient(135deg,#d8fbff,#ffcfb5)] text-3xl">陳</div>
          <div>
            <p class="font-black text-brand-ink">陳先生 <span class="text-sm font-medium text-slate-500">/ 遊戲工作室負責人</span></p>
            <p class="mt-2 text-brand-coral">★★★★★</p>
            <p class="mt-2 leading-7 text-slate-600">合作過程非常順利，對於美術風格呈現與系統設計都超出預期。</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
