import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './pages/**/*.{vue,js,ts}',
    './stores/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#16b8c4',
          blue: '#5f78ff',
          coral: '#ff8b4d',
          ink: '#15294f',
        },
      },
    },
  },
}
