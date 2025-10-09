/**
 * Скрипт деплоя на GitHub Pages
 */

import { publish } from 'gh-pages'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = join(__dirname, '../.output/public')

// Проверяем существование директории сборки
if (!fs.existsSync(distDir)) {
  console.error('❌ Директория сборки не найдена. Запустите npm run generate сначала.')
  process.exit(1)
}

// Создаем файл CNAME для кастомного домена
const cnamePath = join(distDir, 'CNAME')
fs.writeFileSync(cnamePath, 'thearena.show')
console.log('✅ Файл CNAME создан')

// Создаем .nojekyll для GitHub Pages
const nojekyllPath = join(distDir, '.nojekyll')
fs.writeFileSync(nojekyllPath, '')
console.log('✅ Файл .nojekyll создан')

// Проверяем, что файлы действительно созданы
if (fs.existsSync(cnamePath) && fs.existsSync(nojekyllPath)) {
  console.log('✅ Все файлы созданы успешно')
} else {
  console.error('❌ Ошибка создания файлов')
  process.exit(1)
}

// Публикуем на GitHub Pages
console.log('🚀 Начинаем деплой на GitHub Pages...')

publish(
  distDir,
  {
    branch: 'gh-pages',
    dotfiles: true,
    message: `Deploy to GitHub Pages - ${new Date().toISOString()}`
  },
  (err) => {
    if (err) {
      console.error('❌ Ошибка при деплое:', err)
      process.exit(1)
    } else {
      console.log('✅ Деплой успешно завершен!')
      console.log('🌐 Ваш сайт будет доступен по адресу: https://thearena.show')
    }
  }
)
