// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'static',
  },
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
      title: 'Creative Tech Studio | 形象網站、遊戲提案與 App 設計',
      meta: [
        {
          name: 'description',
          content:
            '品牌敘事型 one-page 官網，整合形象網站、遊戲提案與 App UI/UX 設計，並以 LINE 作為主要轉換入口。',
        },
      ],
    },
  },
})
