import { useRuntimeConfig } from 'nuxt/app'

export const useLineLink = () => useRuntimeConfig().public.lineOfficialAccountUrl
