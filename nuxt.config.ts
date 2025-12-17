// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-20',

  // SSR включен для SEO
  ssr: true,

  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'The Leads Arena',
      meta: [
        { name: 'description', content: 'The Leads Arena - современная платформа для генерации и управления лидами' },
        { name: 'color-scheme', content: 'light' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      ]
    }
  },

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

  // Настройки для Vercel
  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server',
    routeRules: {
      // Все страницы уже используют SSR по умолчанию (ssr: true установлен глобально)
      // Указываем только специальные правила для статических файлов
      '/sitemap.xml': { static: true },
      '/__sitemap__/**': { static: true }
    }
  },

  // Настройки sitemap
  sitemap: {
    hostname: 'https://thearena.show', // TODO: заменить на ваш домен
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    },
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1.0
      },
      {
        url: '/slides',
        changefreq: 'monthly',
        priority: 0.7
      },
      // Страницы /about и /contact удалены
    ]
  } as any,

  site: {
    url: 'https://thearena.show' // TODO: заменить на ваш домен
  }
})
