/**
 * Константы приложения
 */

// API конфигурация
export const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.thearena.show'

// Настройки пагинации
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100
} as const

// Роли пользователей
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest'
} as const

// Статусы
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  ARCHIVED: 'archived'
} as const

// Таймауты
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 секунд
  TOAST_MESSAGE: 5000, // 5 секунд
  DEBOUNCE: 300 // 300 мс
} as const

// Размеры файлов
export const FILE_SIZE = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5 МБ
  MAX_FILE_SIZE: 10 * 1024 * 1024 // 10 МБ
} as const

// Форматы файлов
export const ALLOWED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const ALLOWED_DOCUMENT_FORMATS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

// Регулярные выражения
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
} as const

// Социальные сети
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  FACEBOOK: 'https://facebook.com',
  INSTAGRAM: 'https://instagram.com'
} as const
