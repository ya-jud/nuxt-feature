export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/icon'
  ],

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    },
    database: {
      type: 'sqlite',
      filename: 'SQLITE_DB_LOCATION'
    },
    watch: {
      port: 4000,
      showURL: true
    }
  }
})