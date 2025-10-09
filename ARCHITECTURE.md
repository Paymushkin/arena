# Архитектура проекта The Arena

## Обзор технологического стека

- **Frontend Framework**: Vue 3 с Composition API
- **Meta Framework**: Nuxt 3 для SSG (Static Site Generation)
- **Styling**: Tailwind CSS 3
- **Language**: TypeScript
- **State Management**: Pinia
- **Deployment**: GitHub Pages
- **Domain**: thearena.show

## Структура проекта

### `/assets`

Статические ресурсы, которые обрабатываются Vite:

- **css/** - Глобальные стили и Tailwind конфигурация
- **fonts/** - Кастомные шрифты (для локального использования)
- **images/** - Изображения, оптимизируемые при сборке
- **icons/** - SVG иконки

### `/components`

Vue компоненты с автоматическим импортом:

- **AppHeader.vue** - Глобальный header с навигацией
- **AppFooter.vue** - Глобальный footer
- **icons/** - Компоненты SVG иконок
- **ui/** - Переиспользуемые UI компоненты (Button, Input, Card и т.д.)

### `/composables`

Vue Composition API composables для переиспользования логики:

- **useApi.ts** - HTTP запросы с стандартизированной обработкой
- **useToast.ts** - Система уведомлений

### `/constants`

Константы приложения:

- API endpoints
- Конфигурация
- Статические данные
- Перечисления

### `/layouts`

Nuxt layouts для оборачивания страниц:

- **default.vue** - Основной layout с header и footer

### `/middleware`

Route middleware для:

- Аутентификации
- Авторизации
- Валидации
- Редиректов

### `/pages`

File-based routing. Каждый .vue файл автоматически становится маршрутом:

- `index.vue` → `/`
- `about.vue` → `/about`
- `contact.vue` → `/contact`
- `blog/index.vue` → `/blog`
- `blog/[slug].vue` → `/blog/:slug`

### `/plugins`

Nuxt плагины для:

- Глобальных библиотек
- Настройки сторонних сервисов
- Инициализации при старте приложения

### `/public`

Статические файлы, копируемые как есть:

- favicon.ico
- robots.txt
- sitemap.xml
- Другие статические ресурсы

### `/scripts`

Вспомогательные скрипты:

- **deploy.js** - Деплой на GitHub Pages

### `/stores`

Pinia stores для управления состоянием:

- **app.ts** - Глобальное состояние приложения

### `/types`

TypeScript определения типов

### `/utils`

Утилитарные функции:

- Форматирование
- Валидация
- Хелперы

## Паттерны и лучшие практики

### Именование компонентов

```
PascalCase для компонентов:
- AppHeader.vue
- UserProfile.vue
- BlogPostCard.vue

kebab-case для использования в шаблонах:
<app-header />
<user-profile />
<blog-post-card />
```

### Композиция компонентов

```vue
<script setup lang="ts">
// 1. Импорты типов
import type { User } from '~/types'

// 2. Props и emits
interface Props {
  user: User
}

const props = defineProps<Props>()
const emit = defineEmits<{
  update: [user: User]
}>()

// 3. Composables
const route = useRoute()
const { data } = useApi('/api/users')

// 4. Reactive state
const isOpen = ref(false)
const form = reactive({ ... })

// 5. Computed
const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`)

// 6. Methods
const handleSubmit = () => { ... }

// 7. Lifecycle hooks
onMounted(() => { ... })
</script>
```

### Работа с API

```typescript
// Используйте composable useApi
const { data, pending, error } = await useApi<User>('/api/user/1')

// Для POST запросов
const { data } = await useApiPost<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
```

### Управление состоянием

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser
  },

  actions: {
    async fetchUser() {
      const { data } = await useApi<User>('/api/user')
      this.currentUser = data.value
    }
  }
})

// Использование в компонентах
const userStore = useUserStore()
await userStore.fetchUser()
```

### TypeScript

- Всегда типизируйте props, emits, и функции
- Используйте interface для объектов
- Используйте type для union types и утилитарных типов
- Избегайте any, используйте unknown если тип неизвестен

### Стилизация

- Используйте Tailwind утилиты в первую очередь
- Создавайте переиспользуемые утилитарные классы в `assets/css/main.css`
- Для специфических стилей компонентов используйте scoped styles

## Маршрутизация

Nuxt 3 использует file-based routing:

```
pages/
  index.vue           → /
  about.vue           → /about
  users/
    index.vue         → /users
    [id].vue          → /users/:id
    [id]/
      edit.vue        → /users/:id/edit
```

### Middleware

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

// Использование в странице
definePageMeta({
  middleware: 'auth'
})
```

## Процесс сборки и деплоя

### Development

```bash
npm run dev
```

Запускает dev сервер с HMR на `http://localhost:3000`

### Production Build

```bash
npm run generate
```

Генерирует статические файлы в `.output/public/`

### Deployment

```bash
npm run deploy
```

Выполняет:

1. `npm run generate`
2. Создает CNAME файл для домена
3. Публикует в ветку gh-pages

### CI/CD

GitHub Actions автоматически деплоит при push в main ветку.

## Оптимизация производительности

### Code Splitting

Nuxt автоматически разделяет код:

- По маршрутам
- По компонентам с lazy loading

```vue
<script setup>
const LazyComponent = defineAsyncComponent(() => import('~/components/HeavyComponent.vue'))
</script>
```

### Image Optimization

Используйте компонент `<nuxt-img>` для автоматической оптимизации:

```vue
<nuxt-img src="/images/hero.jpg" alt="Hero" />
```

### Prefetching

Nuxt автоматически prefetch'ит страницы при наведении на ссылки.

## SEO

### Meta Tags

```typescript
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
```

### Sitemap

Генерируется автоматически или вручную в `public/sitemap.xml`

## Безопасность

- Всегда валидируйте пользовательский ввод
- Используйте environment variables для секретов
- Никогда не коммитьте `.env` файлы
- Sanitize HTML перед рендерингом

## Тестирование

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

## Дополнительные ресурсы

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Pinia Documentation](https://pinia.vuejs.org)
