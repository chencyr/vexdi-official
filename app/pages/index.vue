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
    '用品牌敘事把形象網站、遊戲提案與 App 介面整合成同一套首頁體驗，所有主 CTA 統一導向 LINE 官方帳號。',
  ogTitle: 'Creative Tech Studio',
  ogDescription:
    '品牌敘事型 one-page 官網，整合網站、遊戲與 App 接案能力，並以 LINE 作為主要轉換入口。',
  ogImage: '/og-homepage.svg',
})
</script>

<template>
  <main class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-3 lg:px-8">
    <AppNavbar />
    <HeroCarousel />
    <MobileHeroIntro />
    <MobileServiceBranches />
    <AboutSection />
    <ServicesSection />
    <ProcessSection />
    <PortfolioSection />
    <TestimonialsSection />
    <FooterCtaSection />
    <LineFab />
  </main>
</template>
