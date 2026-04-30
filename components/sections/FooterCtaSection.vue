<script setup lang="ts">
import { useLineLink } from '../../composables/useLineLink'

const lineLink = useLineLink()
</script>

<template>
  <section
    id="contact"
    class="mx-4 rounded-[1.6rem] bg-[linear-gradient(135deg,#13b7c1_0%,#006d82_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,109,130,0.24)] lg:mx-16 lg:p-10"
  >
    <h2 class="text-center text-3xl font-black lg:text-left lg:text-5xl">有專案想一起合作嗎？</h2>
    <p class="mt-3 text-center text-lg font-medium text-white/85 lg:text-left">
      把你的想法告訴我，我會給你最合適的建議！
    </p>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
      <a
        :href="lineLink"
        target="_blank"
        rel="noreferrer"
        class="flex items-center justify-center gap-3 rounded-2xl bg-brand-coral px-6 py-4 text-lg font-black text-white"
      >
        ✉ 聯絡我
      </a>
      <a
        :href="lineLink"
        target="_blank"
        rel="noreferrer"
        class="flex items-center justify-center gap-3 rounded-2xl border border-white/70 px-6 py-4 text-lg font-black text-white"
      >
        ▣ 預約諮詢
      </a>
    </div>
  </section>
</template>
