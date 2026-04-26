<script setup lang="ts">
import type { PortfolioItem } from '../../app/types/homepage'
import { useLineLink } from '../../composables/useLineLink'

defineProps<{
  open: boolean
  item: PortfolioItem | null
}>()

defineEmits<{
  close: []
}>()

const lineLink = useLineLink()
</script>

<template>
  <teleport to="body">
    <div
      v-if="open && item"
      class="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-4xl rounded-[36px] bg-white p-6 shadow-2xl lg:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {{ item.category }}
            </p>
            <h3 class="mt-3 text-3xl font-black text-brand-ink">{{ item.title }}</h3>
          </div>
          <button
            type="button"
            class="rounded-full border border-slate-200 px-4 py-2"
            @click="$emit('close')"
          >
            關閉
          </button>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-[28px] bg-slate-100 p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Preview
            </p>
            <div class="mt-4 h-72 rounded-[24px] bg-[linear-gradient(135deg,rgba(22,184,196,0.22),rgba(95,120,255,0.12))]" />
          </div>

          <div>
            <p class="leading-8 text-slate-600">{{ item.summary }}</p>
            <ul class="mt-5 space-y-3">
              <li
                v-for="highlight in item.highlights"
                :key="highlight"
                class="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {{ highlight }}
              </li>
            </ul>
            <a
              :href="lineLink"
              target="_blank"
              rel="noreferrer"
              class="mt-6 inline-flex rounded-full bg-brand-coral px-6 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(255,139,77,0.35)]"
            >
              {{ item.ctaLabel }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
