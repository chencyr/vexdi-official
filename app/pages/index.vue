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
  title: 'Creative Tech Studio | Website, Game Proposal, App Design',
  description:
    'Creative and technical one-page portfolio site for websites, game proposals, app UI/UX, and LINE-first conversion.',
  ogTitle: 'Creative Tech Studio',
  ogDescription:
    'One-page studio homepage for website, game, and app design services.',
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
