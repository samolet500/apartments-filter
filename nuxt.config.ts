// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/styles/index.scss', '@vueform/slider/themes/default.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;\n'
        }
      }
    }
  },
  image: {
    dir: 'assets/images'
  },
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons'
      },
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt'
  ]
})