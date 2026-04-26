<script setup lang="ts">
import { useSeoMeta } from '#imports'

import LineFab from '../../components/floating/LineFab.vue'
import HeroCarousel from '../../components/hero/HeroCarousel.vue'
import MobileHeroIntro from '../../components/hero/MobileHeroIntro.vue'
import MobileServiceBranches from '../../components/hero/MobileServiceBranches.vue'
import AppNavbar from '../../components/layout/AppNavbar.vue'
import AboutSection from '../../components/sections/AboutSection.vue'
import FooterCtaSection from '../../components/sections/FooterCtaSection.vue'
import PortfolioSection from '../../components/sections/PortfolioSection.vue'
import ProcessSection from '../../components/sections/ProcessSection.vue'
import ServicesSection from '../../components/sections/ServicesSection.vue'
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
  <main class="mx-auto flex w-full max-w-[96rem] flex-col gap-7 px-4 pb-16 lg:px-0">
    <AppNavbar />
    <HeroCarousel />
    <MobileHeroIntro />
    <MobileServiceBranches />
    <AboutSection class="hidden lg:grid" />
    <ServicesSection class="hidden lg:block" />
    <ProcessSection class="hidden lg:block" />
    <PortfolioSection />
    <TestimonialsSection />
    <FooterCtaSection />
    <LineFab />
  </main>
</template>
