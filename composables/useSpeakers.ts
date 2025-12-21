import { onMounted } from 'vue'
import { useGoogleSheets, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from './useGoogleSheets'

export interface SpeakerData {
  id: string
  name: string
  company: string
  photo: string
  order: number
}

export const useSpeakers = () => {
  // Используем общий composable для загрузки данных
  const { data: speakers, loading, error, fetchData } = useGoogleSheets<SpeakerData>(
    {
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.SPEAKERS
    },
    (rows) => {
      // Первая строка - заголовки (NAME, COMPANY, PHOTO, ORDER)
      const headers = rows[0].map(h => h.toLowerCase().trim())
      console.log('📋 Заголовки спикеров:', headers)

      // Находим индексы колонок
      const nameIndex = headers.indexOf('name')
      const companyIndex = headers.indexOf('company')
      const photoIndex = headers.indexOf('photo')
      const orderIndex = headers.indexOf('order')

      if (nameIndex === -1) {
        throw new Error('Не найдена обязательная колонка: NAME')
      }

      // Преобразуем строки в данные спикеров
      const speakersData: SpeakerData[] = []

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]

        // Пропускаем пустые строки (проверяем NAME)
        if (!row[nameIndex] || !row[nameIndex].trim()) {
          continue
        }

        const name = row[nameIndex]?.trim() || ''
        const company = companyIndex !== -1 ? (row[companyIndex]?.trim() || '') : ''
        const photo = photoIndex !== -1 ? (row[photoIndex]?.trim() || '') : ''
        const orderStr = orderIndex !== -1 ? (row[orderIndex]?.trim() || `${i}`) : `${i}`
        const order = parseInt(orderStr, 10) || i

        speakersData.push({
          id: `speaker-${i}`,
          name,
          company,
          photo,
          order
        })
      }

      // Сортируем по порядку (ORDER)
      speakersData.sort((a, b) => a.order - b.order)

      console.log('✅ Загружено спикеров:', speakersData.length)
      return speakersData
    }
  )

  const fetchSpeakers = async () => {
    await fetchData()
  }

  // Автоматически загружаем при монтировании (только на клиенте)
  if (process.client) {
    onMounted(() => {
      fetchSpeakers()
    })
  }

  return {
    speakers,
    loading,
    error,
    fetchSpeakers
  }
}

