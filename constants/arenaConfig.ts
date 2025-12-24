/**
 * Константы для Arena Section
 */

// Интервалы и таймауты
export const ARENA_TIMING = {
  MOLECULE_CAROUSEL_INTERVAL: 5000, // 5 секунд
  SCROLL_UPDATE_TIMEOUT: 1000, // 1 секунда
} as const

// Количество спикеров для отображения
export const SPEAKERS_LIMITS = {
  SIDEBAR: 3,
  GRID: 8,
} as const

// Маппинг секций к типам сайдбара
export type SectionType = 'arena1' | 'arena2' | 'arena3' | 'forum1'
export type SidebarType = 'forum1' | 'arena1' | 'arena2' | 'arena3'

export const SECTION_TO_SIDEBAR_MAP: Record<SectionType, SidebarType> = {
  arena1: 'forum1', // При скролле к arena1 показываем forum1 sidebar
  arena2: 'arena2', // При скролле к arena2 показываем arena2 sidebar
  arena3: 'arena3', // При скролле к arena3 показываем arena3 sidebar
  forum1: 'arena1', // При скролле к forum1 показываем arena1 sidebar
} as const

// Начальное состояние для каждого типа сайдбара
export const DEFAULT_SIDEBAR_TYPE: Record<SidebarType, SidebarType> = {
  forum1: 'forum1',
  arena1: 'arena1',
  arena2: 'arena2',
  arena3: 'arena3',
} as const

// Маппинг типов сайдбара к типам статистики
export const SIDEBAR_TYPE_MAP: Record<SidebarType, number> = {
  forum1: 1, // forum1 sidebar показывает статистики с type === 1
  arena1: 2, // arena1 sidebar показывает статистики с type === 2
  arena2: 2, // arena2 sidebar показывает статистики с type === 2
  arena3: 2, // arena3 sidebar показывает статистики с type === 2
} as const

