import { ref, onMounted, computed } from 'vue'
import { useGoogleSheets, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from './useGoogleSheets'

export const useWaitlistCount = () => {
  // Используем общий composable для загрузки данных
  const { data: waitlistRows, loading, error, fetchData } = useGoogleSheets<string[]>(
    {
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.WAITLIST
    },
    (rows) => {
      // Возвращаем все строки данных (без заголовков)
      return rows.slice(1)
    }
  )

  // Подсчитываем количество офферов
  const waitlistCount = computed(() => {
    let count = 0
    for (const row of waitlistRows.value) {
      // Проверяем, что строка не пустая (есть хотя бы название компании в колонке B, индекс 1)
      if (row[1] && row[1].trim() && row[1].trim() !== '') {
        count++
      }
    }
    return count
  })

  const fetchWaitlistCount = async () => {
    await fetchData()
  }

  // Автоматически загружаем при монтировании (только на клиенте)
  if (process.client) {
    onMounted(() => {
      fetchWaitlistCount()
    })
  }

  return {
    waitlistCount,
    loading,
    error,
    fetchWaitlistCount
  }
}

