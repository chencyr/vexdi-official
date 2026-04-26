<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

interface NavItem {
  label: string
  href: string
}

defineProps<{
  open: boolean
  items: NavItem[]
}>()

defineEmits<{
  close: []
}>()

const lineLink = useLineLink()
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-slate-950/40 px-4 py-24 lg:hidden"
    >
      <div class="mx-auto max-w-sm rounded-[28px] bg-white p-6 shadow-2xl">
        <div class="mb-5 flex items-center justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">Menu</p>
          <button
            type="button"
            class="rounded-full border border-slate-200 px-3 py-1"
            @click="$emit('close')"
          >
            關閉
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <a
            v-for="item in items"
            :key="item.href"
            :href="item.href"
            class="rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-slate-700"
            @click="$emit('close')"
          >
            {{ item.label }}
          </a>

          <a
            :href="lineLink"
            target="_blank"
            rel="noreferrer"
            class="rounded-2xl bg-brand-coral px-4 py-3 text-center font-semibold text-white"
          >
            加 LINE 諮詢
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
