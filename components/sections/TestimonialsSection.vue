<script setup lang="ts">
import { testimonials } from '../../app/data/homepage'
</script>

<template>
  <section id="testimonials" class="space-y-5 lg:px-16">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-black text-brand-ink lg:text-4xl">客戶怎麼說</h2>
      <a href="#contact" class="text-sm font-bold text-brand-teal">查看全部 →</a>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <article
        v-for="item in testimonials"
        :key="item.name"
        class="rounded-[1.35rem] bg-white p-5 shadow-[0_18px_46px_rgba(34,83,111,0.12)]"
      >
        <div class="flex items-center gap-4">
          <div class="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#d8fbff,#ffd3be)] font-black text-brand-ink">
            {{ item.name.slice(0, 1) }}
          </div>
          <div>
            <p class="font-black text-brand-ink">{{ item.name }} <span class="font-medium text-slate-400">/ {{ item.role }}</span></p>
            <p class="mt-1 text-brand-coral">★★★★★</p>
          </div>
        </div>
        <p class="mt-5 leading-7 text-slate-600">{{ item.quote }}</p>
      </article>
    </div>

    <div class="flex justify-center gap-2 lg:hidden">
      <span class="h-2 w-2 rounded-full bg-brand-teal" />
      <span class="h-2 w-2 rounded-full bg-slate-300" />
      <span class="h-2 w-2 rounded-full bg-slate-300" />
    </div>
  </section>
</template>
