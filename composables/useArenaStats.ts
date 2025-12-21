import { onMounted } from 'vue'
import { useGoogleSheets, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from './useGoogleSheets'

export interface ArenaStat {
  title: string
  subtitle: string
  number: number
  plus: boolean
  type: number
}

export const useArenaStats = () => {
  // Используем общий composable для загрузки данных
  const { data: stats, loading, error, fetchData } = useGoogleSheets<ArenaStat>(
    {
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.STATS
    },
    (rows) => {
      // Первая строка - заголовки (Title, Subtitle, Number, Plus, Type)
      // Пропускаем заголовки и парсим данные
      const parsedStats: ArenaStat[] = []

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]

        // Проверяем, что строка не пустая (есть хотя бы Title)
        if (!row[0] || !row[0].trim()) {
          continue
        }

        const title = row[0]?.trim() || ''
        const subtitle = row[1]?.trim() || ''
        const numberStr = row[2]?.trim() || '0'
        const plusStr = row[3]?.trim() || 'FALSE'
        const typeStr = row[4]?.trim() || '1'

        // Парсим число
        const number = parseInt(numberStr, 10) || 0

        // Парсим булево значение (TRUE/FALSE)
        const plus = plusStr.toUpperCase() === 'TRUE'

        // Парсим тип
        const type = parseInt(typeStr, 10) || 1

        parsedStats.push({
          title,
          subtitle,
          number,
          plus,
          type
        })
      }

      console.log('✅ Найдено статистик:', parsedStats.length)
      return parsedStats
    }
  )

  // Получить статистику по типу
  const getStatsByType = (type: number): ArenaStat[] => {
    return stats.value.filter(stat => stat.type === type)
  }

  const fetchStats = async () => {
    await fetchData()
  }

  // Автоматически загружаем при монтировании (только на клиенте)
  if (process.client) {
    onMounted(() => {
      fetchStats()
    })
  }

  return {
    stats,
    loading,
    error,
    fetchStats,
    getStatsByType
  }
}
