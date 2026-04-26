<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()
</script>

<template>
  <a
    :href="lineLink"
    target="_blank"
    rel="noreferrer"
    class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#06c755] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(6,199,85,0.35)]"
  >
    <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">L</span>
    LINE
  </a>
</template>
