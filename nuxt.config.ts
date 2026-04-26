// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      lineOfficialAccountUrl: 'https://line.me/R/ti/p/@creative-tech-studio',
      siteUrl: 'https://creative-tech-studio.local',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant',
      },
      title: '創意 x 技術 | 接案形象官網',
      meta: [
        {
          name: 'description',
          content: '承接形象網站、遊戲頁與 App 設計的 one-page 接案形象官網。',
        },
      ],
    },
  },
})
