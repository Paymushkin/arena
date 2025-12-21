import { onMounted, computed } from 'vue'
import { useGoogleSheets, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from './useGoogleSheets'

export interface Partner {
  id: string
  name: string
  image: string
  order: number
}

/**
 * Composable для загрузки партнеров из Google Sheets
 */
export const usePartners = () => {
  // Локальные данные по умолчанию
  const defaultPartners: Partner[] = [
    {
      id: 'partner-1',
      name: 'Partner 1',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
      order: 1
    },
    {
      id: 'partner-2',
      name: 'Partner 2',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
      order: 2
    },
    {
      id: 'partner-3',
      name: 'Partner 3',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
      order: 3
    }
  ]

  // Используем общий composable для загрузки данных
  const { data: partnersData, loading, error, fetchData } = useGoogleSheets<Partner>(
    {
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.PARTNERS
    },
    (rows) => {
      // Первая строка - заголовки (NAME, LOGO_URL, ORDER)
      const headers = rows[0].map(h => h.toLowerCase().trim())
      console.log('📋 Заголовки партнеров:', headers)

      // Находим индексы колонок
      const nameIndex = headers.indexOf('name')
      const logoUrlIndex = headers.indexOf('logo_url')
      const orderIndex = headers.indexOf('order')

      if (nameIndex === -1) {
        throw new Error('Не найдена обязательная колонка: NAME')
      }

      if (logoUrlIndex === -1) {
        throw new Error('Не найдена обязательная колонка: LOGO_URL')
      }

      // Преобразуем строки в данные партнеров
      const partnersList: Partner[] = []

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]

        // Пропускаем пустые строки (проверяем NAME)
        if (!row[nameIndex] || !row[nameIndex].trim()) {
          continue
        }

        const name = row[nameIndex]?.trim() || ''
        const image = row[logoUrlIndex]?.trim() || ''
        const orderStr = orderIndex !== -1 ? (row[orderIndex]?.trim() || `${i}`) : `${i}`
        const order = parseInt(orderStr, 10) || i

        if (name && image) {
          partnersList.push({
            id: `partner-${i}`,
            name,
            image,
            order
          })
        }
      }

      // Сортируем по порядку (ORDER)
      partnersList.sort((a, b) => a.order - b.order)

      console.log('✅ Загружено партнеров:', partnersList.length)
      return partnersList
    }
  )

  const fetchPartners = async () => {
    await fetchData()
  }

  // Автоматически загружаем при монтировании (только на клиенте)
  if (process.client) {
    onMounted(() => {
      fetchPartners()
    })
  }

  // Отображаем загруженные данные или локальные по умолчанию
  const partners = computed(() => {
    return partnersData.value.length > 0 ? partnersData.value : defaultPartners
  })

  return {
    partners,
    loading,
    error,
    fetchPartners
  }
}

