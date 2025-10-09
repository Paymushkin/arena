# Быстрый старт 🚀

## Первые шаги

### 1. Установка зависимостей ✅

```bash
npm install
```

**Уже выполнено!** Все зависимости установлены.

### 2. Запуск dev сервера

```bash
npm run dev
```

Откроется на `http://localhost:3000`

### 3. Создание первой страницы

```bash
# Создайте новый файл
touch pages/my-page.vue
```

```vue
<template>
  <div class="container-custom py-16">
    <h1 class="text-4xl font-bold">Моя новая страница</h1>
    <p class="text-lg text-gray-600 mt-4">Добро пожаловать!</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Моя страница - The Arena'
})
</script>
```

Страница автоматически доступна по адресу `/my-page`

### 4. Создание компонента

```bash
# Создайте компонент
touch components/ui/Badge.vue
```

```vue
<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'success' | 'error' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info'
})

const badgeClasses = computed(() => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  }

  return `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    variants[props.variant]
  }`
})
</script>
```

Использование (автоматический импорт):

```vue
<template>
  <UiBadge variant="success">Активен</UiBadge>
</template>
```

### 5. Работа с API

```typescript
// В любом компоненте или composable
const { data, pending, error } = await useApi<User[]>('/api/users')

// POST запрос
const { data: newUser } = await useApiPost<User>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
```

### 6. Управление состоянием

```typescript
// Использование существующего store
const appStore = useAppStore()

// Установка loading
appStore.setLoading(true)

// Переключение темы
appStore.toggleTheme()
```

Создание нового store:

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[]
  }),

  actions: {
    async fetchUsers() {
      const { data } = await useApi<User[]>('/api/users')
      this.users = data.value || []
    }
  }
})
```

### 7. Уведомления (Toast)

```typescript
const toast = useToast()

// Показать уведомление
toast.success('Успешно сохранено!')
toast.error('Произошла ошибка')
toast.warning('Внимание!')
toast.info('Информация')
```

## Полезные команды

```bash
# Development
npm run dev              # Запустить dev сервер

# Production
npm run build            # Собрать для production
npm run generate         # Создать статическую версию
npm run preview          # Предпросмотр production сборки

# Деплой
npm run deploy           # Деплой на GitHub Pages

# Code Quality
npm run lint             # Проверить код
npm run lint:fix         # Исправить проблемы автоматически
```

## Готовые UI компоненты

### Button

```vue
<UiButton variant="primary" size="md">
  Нажми меня
</UiButton>

<UiButton variant="secondary" :loading="true">
  Загрузка...
</UiButton>
```

Варианты: `primary`, `secondary`, `outline`, `ghost`  
Размеры: `sm`, `md`, `lg`

### Card

```vue
<UiCard hover padding="lg">
  <template #header>
    <h3>Заголовок</h3>
  </template>
  
  Контент карточки
  
  <template #footer>
    <button>Действие</button>
  </template>
</UiCard>
```

### Input

```vue
<UiInput
  v-model="value"
  label="Email"
  type="email"
  placeholder="your@email.com"
  :required="true"
  :error="errorMessage"
  hint="Введите ваш email"
/>
```

## Tailwind утилиты

### Готовые классы в проекте:

```css
.container-custom  /* Контейнер с padding */
/* Контейнер с padding */
.btn-primary       /* Основная кнопка */
.btn-secondary     /* Вторичная кнопка */
.card             /* Карточка */
.card-body; /* Тело карточки */
```

### Цветовая палитра:

```vue
<div class="bg-primary-600 text-white">Primary</div>
<div class="bg-secondary-500 text-white">Secondary</div>
```

Доступные оттенки: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Шрифты:

```vue
<h1 class="font-heading">Заголовок (Poppins)</h1>
<p class="font-sans">Текст (Inter)</p>
```

## Примеры страниц

Уже созданы:

- ✅ `/` - Главная страница
- ✅ `/about` - О нас
- ✅ `/contact` - Контакты

## Структура типичной страницы

```vue
<template>
  <div class="container-custom py-16">
    <!-- Заголовок -->
    <h1 class="text-4xl font-bold font-heading mb-6">
      {{ title }}
    </h1>

    <!-- Контент -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiCard v-for="item in items" :key="item.id" hover>
        <div class="card-body">
          <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta теги
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Заголовок - The Arena',
  description: 'Описание страницы'
})

// Данные
const title = ref('Моя страница')
const items = ref([
  { id: 1, title: 'Item 1', description: 'Description 1' },
  { id: 2, title: 'Item 2', description: 'Description 2' }
])
</script>
```

## Работа с формами

```vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <UiInput v-model="form.name" label="Имя" :required="true" :error="errors.name" />

    <UiInput
      v-model="form.email"
      type="email"
      label="Email"
      :required="true"
      :error="errors.email"
    />

    <UiButton type="submit" :loading="loading"> Отправить </UiButton>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: ''
})

const errors = reactive({
  name: '',
  email: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true

  try {
    const { data } = await useApiPost('/api/submit', form)
    useToast().success('Форма отправлена!')
  } catch (error) {
    useToast().error('Ошибка отправки')
  } finally {
    loading.value = false
  }
}
</script>
```

## Навигация

```vue
<template>
  <!-- Обычная ссылка -->
  <NuxtLink to="/about" class="text-primary-600 hover:underline"> О нас </NuxtLink>

  <!-- Программная навигация -->
  <button @click="goToPage">Перейти</button>
</template>

<script setup lang="ts">
const router = useRouter()

const goToPage = () => {
  router.push('/contact')
}
</script>
```

## Адаптивность

```vue
<template>
  <!-- Mobile first подход -->
  <div
    class="
    text-sm         <!-- mobile -->
    md:text-base    <!-- tablet -->
    lg:text-lg      <!-- desktop -->
  "
  >
    Адаптивный текст
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- 1 колонка на mobile, 2 на tablet, 3 на desktop -->
  </div>
</template>
```

Breakpoints:

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

## Деплой на GitHub Pages

### Первая настройка:

1. Создайте репозиторий на GitHub
2. Залейте код:

```bash
git remote add origin https://github.com/YOUR_USERNAME/arena.git
git push -u origin main
```

3. В Settings → Pages выберите Source: **GitHub Actions**

4. Настройте DNS для домена `thearena.show` (см. DEPLOYMENT.md)

### Последующие деплои:

```bash
# Просто push в main - автоматический деплой через GitHub Actions
git add .
git commit -m "Update site"
git push

# Или локальный деплой
npm run deploy
```

## Следующие шаги

1. ✅ Запустите `npm run dev`
2. ✅ Откройте `http://localhost:3000`
3. ✅ Создайте свою первую страницу
4. ✅ Настройте под свои нужды
5. ✅ Задеплойте на GitHub Pages

## Полезные ссылки

- 📖 [README.md](README.md) - Основная документация
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура проекта
- 📁 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Структура проекта
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Руководство по деплою
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Гайд по контрибуции

## Получить помощь

- [Nuxt 3 Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

Удачной разработки! 🎉
