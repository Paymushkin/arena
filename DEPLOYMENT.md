# Руководство по деплою

## Настройка GitHub Pages

### Шаг 1: Подготовка репозитория

1. Создайте репозиторий на GitHub (если еще не создан)
2. Убедитесь, что код находится в ветке `main`

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arena.git
git push -u origin main
```

### Шаг 2: Настройка GitHub Pages в репозитории

1. Перейдите в **Settings** → **Pages**
2. В разделе **Build and deployment**:
   - Source: выберите **GitHub Actions**
3. Сохраните настройки

### Шаг 3: Настройка кастомного домена

#### В GitHub:

1. В **Settings** → **Pages** → **Custom domain**
2. Введите: `thearena.show`
3. Нажмите **Save**
4. Включите **Enforce HTTPS** (после настройки DNS)

#### У вашего регистратора домена:

Добавьте следующие DNS записи:

**Для APEX домена (thearena.show):**

```
Тип: A
Имя: @
Значение: 185.199.108.153
```

```
Тип: A
Имя: @
Значение: 185.199.109.153
```

```
Тип: A
Имя: @
Значение: 185.199.110.153
```

```
Тип: A
Имя: @
Значение: 185.199.111.153
```

**Для WWW субдомена:**

```
Тип: CNAME
Имя: www
Значение: YOUR_USERNAME.github.io
```

**Альтернативный вариант (только CNAME):**

Если ваш регистратор поддерживает CNAME для APEX домена:

```
Тип: CNAME
Имя: @
Значение: YOUR_USERNAME.github.io
```

### Шаг 4: Первый деплой

#### Вариант 1: Через GitHub Actions (рекомендуется)

После push в ветку `main`, GitHub Actions автоматически:

1. Установит зависимости
2. Соберет проект
3. Задеплоит на GitHub Pages

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### Вариант 2: Локальный деплой

```bash
npm run deploy
```

Эта команда:

1. Соберет статическую версию сайта
2. Создаст CNAME файл
3. Опубликует в ветку `gh-pages`

### Шаг 5: Проверка

1. Подождите 5-10 минут для propagation DNS
2. Перейдите на https://thearena.show
3. Проверьте, что сайт работает корректно

## Переменные окружения

### Development (.env.development)

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
NODE_ENV=development
```

### Production (.env.production)

```env
NUXT_PUBLIC_API_BASE_URL=https://api.thearena.show
NODE_ENV=production
```

### GitHub Secrets

Для чувствительных данных используйте GitHub Secrets:

1. Перейдите в **Settings** → **Secrets and variables** → **Actions**
2. Нажмите **New repository secret**
3. Добавьте необходимые секреты

Использование в GitHub Actions:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

## CI/CD Pipeline

### GitHub Actions Workflow

Файл: `.github/workflows/deploy.yml`

Автоматически запускается при:

- Push в ветку `main`
- Ручном запуске (workflow_dispatch)

#### Что происходит:

1. **Build Job:**

   - Checkout кода
   - Установка Node.js 20
   - Установка зависимостей
   - Генерация статических файлов
   - Создание CNAME и .nojekyll
   - Загрузка артефакта

2. **Deploy Job:**
   - Деплой на GitHub Pages

### Мониторинг деплоя

1. Перейдите во вкладку **Actions** репозитория
2. Выберите последний workflow run
3. Проверьте логи сборки и деплоя

## Откат к предыдущей версии

### Через GitHub Actions:

1. Перейдите в **Actions** → выберите успешный предыдущий run
2. Нажмите **Re-run jobs**

### Через Git:

```bash
# Найдите коммит для отката
git log

# Создайте новый коммит с откатом
git revert <commit-hash>
git push origin main
```

### Через локальный деплой:

```bash
# Переключитесь на нужный коммит
git checkout <commit-hash>

# Задеплойте
npm run deploy

# Вернитесь на main
git checkout main
```

## Оптимизация

### 1. Минимизация размера сборки

```bash
# Анализ размера bundle
npm run build -- --analyze
```

### 2. Кэширование

GitHub Pages автоматически кэширует статические файлы.

Для кастомного кэширования создайте `public/_headers`:

```
/*
  Cache-Control: public, max-age=31536000, immutable

/_nuxt/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
```

### 3. Prerendering

Nuxt 3 автоматически prerender'ит все страницы при `npm run generate`.

Для динамических маршрутов добавьте в `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/blog/post-1', '/blog/post-2']
    }
  }
})
```

## Troubleshooting

### Проблема: 404 при переходе на страницу напрямую

**Решение:** Создайте файл `public/404.html` с редиректом на `index.html`

### Проблема: Стили не загружаются

**Проверьте:**

- Наличие файла `.nojekyll` в корне сборки
- Правильность baseURL в `nuxt.config.ts`

### Проблема: API запросы не работают

**Решение:** Убедитесь, что:

- API поддерживает CORS
- URL API правильный в environment variables
- HTTPS используется для production

### Проблема: Домен не резолвится

**Проверьте:**

- DNS записи настроены правильно
- CNAME файл присутствует в сборке
- Подождите до 48 часов для DNS propagation

```bash
# Проверка DNS
nslookup thearena.show

# Проверка CNAME файла
curl https://YOUR_USERNAME.github.io/arena/CNAME
```

## Monitoring и Analytics

### Google Analytics

Добавьте в `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          async: true
        }
      ]
    }
  }
})
```

### Plausible Analytics (privacy-friendly)

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://plausible.io/js/script.js',
          'data-domain': 'thearena.show',
          defer: true
        }
      ]
    }
  }
})
```

## Безопасность

### Content Security Policy

Создайте `public/_headers`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com; style-src 'self' 'unsafe-inline';
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## Поддержка и обновления

### Обновление зависимостей

```bash
# Проверка устаревших пакетов
npm outdated

# Обновление всех пакетов
npm update

# Обновление major версий
npx npm-check-updates -u
npm install
```

### Регулярное обслуживание

- Еженедельно проверяйте логи GitHub Actions
- Ежемесячно обновляйте зависимости
- Регулярно проверяйте security alerts

## Полезные команды

```bash
# Локальный preview production сборки
npm run preview

# Очистка кэша и node_modules
rm -rf node_modules .nuxt .output
npm install

# Проверка production сборки локально
npm run generate && npx serve .output/public
```

## Контакты для поддержки

- GitHub Issues: https://github.com/YOUR_USERNAME/arena/issues
- Email: support@thearena.show

---

Последнее обновление: Октябрь 2025
