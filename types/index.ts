/**
 * Основные типы приложения
 */

export interface NavigationItem {
  name: string
  path: string
  icon?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta
}
