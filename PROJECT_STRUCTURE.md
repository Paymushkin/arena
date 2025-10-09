# Структура проекта The Arena

```
arena/
│
├── .github/                          # GitHub конфигурация
│   └── workflows/
│       └── deploy.yml               # CI/CD для автодеплоя
│
├── .nuxt/                           # Генерируется автоматически (git ignored)
├── .output/                         # Результат сборки (git ignored)
├── node_modules/                    # Зависимости (git ignored)
│
├── assets/                          # Ассеты, обрабатываемые Vite
│   ├── css/
│   │   ├── main.css                # Основные стили
│   │   └── tailwind.css            # Tailwind директивы
│   ├── fonts/                      # Кастомные шрифты
│   │   └── .gitkeep
│   ├── images/                     # Изображения для оптимизации
│   │   └── .gitkeep
│   └── icons/                      # SVG иконки
│       └── .gitkeep
│
├── components/                      # Vue компоненты (автоимпорт)
│   ├── AppHeader.vue               # Глобальный header
│   ├── AppFooter.vue               # Глобальный footer
│   ├── icons/                      # Компоненты SVG иконок
│   │   └── .gitkeep
│   └── ui/                         # Переиспользуемые UI компоненты
│       ├── Button.vue              # Компонент кнопки
│       ├── Card.vue                # Компонент карточки
│       └── Input.vue               # Компонент input
│
├── composables/                     # Vue Composition API composables
│   ├── useApi.ts                   # HTTP запросы
│   └── useToast.ts                 # Система уведомлений
│
├── constants/                       # Константы приложения
│   └── index.ts                    # Все константы
│
├── layouts/                         # Nuxt layouts
│   └── default.vue                 # Дефолтный layout
│
├── middleware/                      # Route middleware
│   └── .gitkeep
│
├── pages/                           # Страницы (file-based routing)
│   ├── index.vue                   # Главная страница (/)
│   ├── about.vue                   # О нас (/about)
│   └── contact.vue                 # Контакты (/contact)
│
├── plugins/                         # Nuxt плагины
│   └── .gitkeep
│
├── public/                          # Статические файлы
│   ├── favicon.ico                 # Иконка сайта
│   └── robots.txt                  # Для SEO
│
├── scripts/                         # Вспомогательные скрипты
│   └── deploy.js                   # Скрипт деплоя на GitHub Pages
│
├── stores/                          # Pinia stores
│   └── app.ts                      # Глобальное состояние приложения
│
├── types/                           # TypeScript типы
│   └── index.ts                    # Общие типы
│
├── utils/                           # Утилитарные функции
│   └── index.ts                    # Хелперы и утилиты
│
├── .editorconfig                    # EditorConfig конфигурация
├── .env.example                     # Пример переменных окружения
├── .eslintignore                    # ESLint игнорирование
├── .eslintrc.cjs                    # ESLint конфигурация
├── .gitignore                       # Git игнорирование
├── .prettierrc                      # Prettier конфигурация
│
├── app.vue                          # Корневой компонент приложения
├── nuxt.config.ts                   # Nuxt конфигурация
├── package.json                     # NPM зависимости и скрипты
├── package-lock.json                # Lockfile зависимостей
├── tailwind.config.ts               # Tailwind CSS конфигурация
├── tsconfig.json                    # TypeScript конфигурация
│
├── ARCHITECTURE.md                  # Архитектура проекта
├── CONTRIBUTING.md                  # Руководство по контрибуции
├── DEPLOYMENT.md                    # Руководство по деплою
├── PROJECT_STRUCTURE.md             # Этот файл
└── README.md                        # Основная документация

```

## Описание основных директорий

### 📁 `/assets`

Файлы, которые будут обработаны Vite (оптимизация, минификация).

- **css/** - Стили приложения
- **fonts/** - Локальные шрифты (.woff2, .woff, .ttf)
- **images/** - Изображения, которые нужно оптимизировать
- **icons/** - SVG иконки для использования в CSS

### 📁 `/components`

Vue компоненты с автоматическим импортом.

```vue
<!-- Не нужно импортировать, используется напрямую -->
<template>
  <AppHeader />
  <UiButton>Click me</UiButton>
</template>
```

Структура:

- **Глобальные компоненты** - в корне (AppHeader, AppFooter)
- **icons/** - SVG иконки как Vue компоненты
- **ui/** - Переиспользуемые UI элементы

### 📁 `/composables`

Переиспользуемая логика (Vue Composition API).

```typescript
// Автоимпорт
const { data } = await useApi('/endpoint')
const toast = useToast()
```

### 📁 `/constants`

Все константы приложения:

- API endpoints
- Конфигурационные значения
- Перечисления (enums)
- Статические данные

### 📁 `/layouts`

Обертки для страниц.

```vue
<!-- pages/index.vue -->
<script setup>
definePageMeta({
  layout: 'default'
})
</script>
```

### 📁 `/middleware`

Route guards и middleware.

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Логика проверки
})
```

### 📁 `/pages`

File-based routing. Структура файлов = структура URL.

```
pages/
  index.vue           → /
  about.vue           → /about
  blog/
    index.vue         → /blog
    [slug].vue        → /blog/:slug
  users/
    [id]/
      index.vue       → /users/:id
      edit.vue        → /users/:id/edit
```

### 📁 `/plugins`

Плагины, выполняющиеся при инициализации приложения.

```typescript
// plugins/my-plugin.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Инициализация
})
```

### 📁 `/public`

Статические файлы, копируемые в корень сборки без изменений.

- Доступны по URL: `public/image.jpg` → `/image.jpg`
- Не обрабатываются Vite

### 📁 `/scripts`

Вспомогательные скрипты:

- Деплой
- Генерация данных
- Утилиты для разработки

### 📁 `/stores`

Pinia хранилища для управления состоянием.

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({ ... }),
  actions: { ... }
})

// Использование
const userStore = useUserStore()
```

### 📁 `/types`

TypeScript типы и интерфейсы.

```typescript
export interface User {
  id: string
  name: string
}
```

### 📁 `/utils`

Утилитарные функции:

- Форматирование
- Валидация
- Хелперы

## Конфигурационные файлы

### `nuxt.config.ts`

Основная конфигурация Nuxt:

- Модули
- Build настройки
- SSG/SSR режим
- Plugins
- CSS

### `tailwind.config.ts`

Конфигурация Tailwind CSS:

- Кастомные цвета
- Шрифты
- Breakpoints
- Плагины

### `tsconfig.json`

TypeScript конфигурация:

- Компилятор опции
- Path aliases
- Strict mode

### `package.json`

NPM зависимости и скрипты:

```bash
npm run dev        # Development server
npm run build      # Production build
npm run generate   # Static generation
npm run deploy     # Deploy to GitHub Pages
```

## Соглашения по именованию

### Файлы и директории

- **Компоненты**: PascalCase (`UserProfile.vue`)
- **Composables**: camelCase с `use` (`useAuth.ts`)
- **Pages**: kebab-case (`user-profile.vue`)
- **Utils**: camelCase (`formatDate.ts`)
- **Stores**: kebab-case (`user-store.ts`)

### В коде

- **Переменные**: camelCase (`userName`)
- **Константы**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Типы**: PascalCase (`UserProfile`)
- **Интерфейсы**: PascalCase с I или без (`User`, `IUser`)

## Auto-import

Nuxt автоматически импортирует:

- ✅ Компоненты из `/components`
- ✅ Composables из `/composables`
- ✅ Utils из `/utils`
- ✅ Nuxt встроенные функции (`ref`, `computed`, `useRoute` и т.д.)

Не нужно писать:

```typescript
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'
```

## Git workflow

```bash
# Создание feature ветки
git checkout -b feature/new-page

# Коммит изменений
git add .
git commit -m "feat: add new page"

# Push
git push origin feature/new-page

# Создать PR на GitHub
```

## Полезные пути

### Path aliases

```typescript
~/           # Корень проекта
@/           # Алиас для ~/
#/           # .nuxt директория
```

Примеры:

```typescript
import { User } from '~/types'
import Button from '~/components/ui/Button.vue'
import { API_BASE_URL } from '~/constants'
```

## Добавление новых страниц

1. Создайте файл в `/pages`:

```bash
touch pages/new-page.vue
```

2. Добавьте контент:

```vue
<template>
  <div>New Page</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'New Page - The Arena'
})
</script>
```

3. Страница автоматически доступна по `/new-page`

## Добавление новых компонентов

1. Создайте файл в `/components`:

```bash
touch components/ui/MyComponent.vue
```

2. Используйте без импорта:

```vue
<template>
  <UiMyComponent />
</template>
```

## Переменные окружения

```bash
# .env
NUXT_PUBLIC_API_BASE_URL=https://api.example.com
SECRET_KEY=secret_value
```

Использование:

```typescript
const config = useRuntimeConfig()
console.log(config.public.apiBaseUrl)  // NUXT_PUBLIC_ доступны на клиенте
console.log(config.secretKey)          # Только на сервере
```

## Дополнительная информация

- 📖 [README.md](README.md) - Основная документация
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Деплой
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Контрибуция

---

Последнее обновление: Октябрь 2025
