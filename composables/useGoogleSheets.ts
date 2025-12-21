import { ref } from 'vue'

/**
 * Общий composable для работы с Google Sheets
 * Предоставляет базовую функциональность для загрузки и парсинга CSV данных
 */

export interface GoogleSheetsConfig {
  spreadsheetId: string
  gid: string
}

export interface GoogleSheetsResponse<T> {
  data: T[]
  loading: boolean
  error: string | null
}

/**
 * Парсит CSV строку с учетом кавычек и запятых внутри них
 */
export function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Экранированная кавычка
        current += '"'
        i++ // Пропускаем следующую кавычку
      } else {
        // Начало/конец кавычек
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // Разделитель вне кавычек
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  // Добавляем последнее значение
  values.push(current.trim())
  
  return values
}

/**
 * Парсит CSV текст в массив строк
 */
export function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim())
  return lines.map(line => parseCSVLine(line))
}

/**
 * Загружает CSV данные из Google Sheets
 */
export async function fetchCSVFromGoogleSheets(
  config: GoogleSheetsConfig
): Promise<string> {
  const { spreadsheetId, gid } = config
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`

  const response = await fetch(CSV_URL)

  if (!response.ok) {
    throw new Error(`CSV export error: ${response.statusText}`)
  }

  return await response.text()
}

/**
 * Базовый composable для загрузки данных из Google Sheets
 */
export function useGoogleSheets<T>(
  config: GoogleSheetsConfig,
  transformFn: (rows: string[][]) => T[]
) {
  const data = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      console.log(`🌐 Запрашиваем данные из Google Sheets (gid=${config.gid})...`)

      const csvText = await fetchCSVFromGoogleSheets(config)
      console.log('📊 Получены CSV данные:', csvText.substring(0, 200) + '...')

      const rows = parseCSV(csvText)

      if (rows.length < 2) {
        throw new Error('Недостаточно данных в таблице')
      }

      // Преобразуем данные с помощью переданной функции
      const transformedData = transformFn(rows)

      console.log(`✅ Найдено записей: ${transformedData.length}`)
      data.value = transformedData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      console.error('❌ Ошибка загрузки данных из Google Sheets:', err)
      error.value = errorMessage
      data.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchData
  }
}

/**
 * Константы для ID таблиц
 */
export const GOOGLE_SHEETS_IDS = {
  ARENA_MAIN: '1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s'
} as const

/**
 * GID для различных листов
 */
export const GOOGLE_SHEETS_GIDS = {
  STATS: '0',
  MOLECULES: '1618170568',
  WAITLIST: '1951533282',
  INQUIRIES: '181198927',
  SPEAKERS: '928261669',
  FAQ: '229786536', // GID для FAQ таблицы (из efw2025 проекта)
  PARTNERS: '1218733921' // GID для партнеров
} as const

