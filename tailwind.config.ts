import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
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
