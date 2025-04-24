export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],

  css: ['~/assets/styles/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'error']
    }
  },
  app: {
    head: {
      script: [
        { src: '/init-theme.js', tagPosition: 'head' }
      ]
    }
  }
})