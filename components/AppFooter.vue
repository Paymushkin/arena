<template>
  <footer class="bg-gray-900 text-white mt-auto">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Брендинг -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold font-heading mb-4">The Arena</h3>
          <p class="text-gray-400 mb-4 max-w-md">
            Современное веб-приложение, построенное с использованием новейших технологий
            для лучшего пользовательского опыта.
          </p>
        </div>

        <!-- Навигация -->
        <div>
          <h4 class="font-semibold mb-4">Навигация</h4>
          <ul class="space-y-2">
            <li v-for="item in footerLinks" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Социальные сети -->
        <div>
          <h4 class="font-semibold mb-4">Следите за нами</h4>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {{ currentYear }} The Arena. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { NavigationItem, SocialLink } from '~/types'

const currentYear = new Date().getFullYear()

const footerLinks: NavigationItem[] = [
  { name: 'Главная', path: '/' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contact' }
]

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'IconGitHub'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'IconTwitter'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'IconLinkedIn'
  }
]
</script>

