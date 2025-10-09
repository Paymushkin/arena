// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Режим генерации статических страниц для GitHub Pages
  ssr: true,

  app: {
    // Базовый URL для GitHub Pages
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'The Arena',
      meta: [{ name: 'description', content: 'The Arena - Platform' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  // Модули
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // Настройки Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  },

  // TypeScript настройки
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Настройки CSS
  css: ['~/assets/css/main.css'],

  // Автоимпорт компонентов
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue']
    }
  ],

  // Настройки сборки
  nitro: {
    preset: 'static',
    output: {
      publicDir: '.output/public'
    }
  },

  compatibilityDate: '2024-10-09'
})
