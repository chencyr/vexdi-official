<script setup lang="ts">
import { useSeoMeta } from '#imports'

import HeroCarousel from '../../components/hero/HeroCarousel.vue'
import MobileHeroIntro from '../../components/hero/MobileHeroIntro.vue'
import AppNavbar from '../../components/layout/AppNavbar.vue'
import FooterCtaSection from '../../components/sections/FooterCtaSection.vue'
import PortfolioSection from '../../components/sections/PortfolioSection.vue'
import ProcessSection from '../../components/sections/ProcessSection.vue'
import TestimonialsSection from '../../components/sections/TestimonialsSection.vue'

useSeoMeta({
  title: 'Creative Tech Studio | 形象網站、遊戲提案與 App 設計',
  description:
    '以創意與技術打造有記憶點的數位體驗，整合形象網站、遊戲提案、App UI/UX 與 LINE-first 轉換路徑。',
  ogTitle: 'Creative Tech Studio',
  ogDescription:
    '一頁式接案官網，整合網站、遊戲與 App 設計能力，並以 LINE 作為主要轉換入口。',
  ogImage: '/og-homepage.svg',
})
</script>

<template>
  <main data-homepage-shell class="flex min-h-screen w-full max-w-full flex-col gap-7 overflow-x-hidden bg-white pb-16">
    <AppNavbar />
    <HeroCarousel />
    <MobileHeroIntro />
    <ProcessSection class="hidden lg:block" />
    <PortfolioSection />
    <TestimonialsSection />
    <FooterCtaSection />
  </main>
</template>
