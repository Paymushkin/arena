import { ref, onMounted } from 'vue'
import { useGoogleSheets, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from './useGoogleSheets'

export interface MoleculeData {
  id: string
  leftText: string
  rightText: string
  avatar: string
  name: string
  company: string
}

export const useMolecules = () => {
  const isDataUpdated = ref(false)

  // Используем общий composable для загрузки данных
  const { data: molecules, loading, error, fetchData } = useGoogleSheets<MoleculeData>(
    {
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.MOLECULES
    },
    (rows) => {
      // Первая строка - заголовки
      const headers = rows[0].map(h => h.toLowerCase().trim())
      console.log('📋 Заголовки:', headers)

      // Находим индексы колонок
      const idIndex = headers.indexOf('id')
      const nameIndex = headers.indexOf('name')
      const surnameIndex = headers.indexOf('surname')
      const companyIndex = headers.indexOf('company')
      const usefulIndex = headers.indexOf('useful')
      const offerIndex = headers.indexOf('offer')
      const avatarIndex = headers.indexOf('avatar')

      if (idIndex === -1 || nameIndex === -1 || companyIndex === -1) {
        throw new Error('Не найдены обязательные колонки: ID, NAME, COMPANY')
      }

      // Преобразуем строки в данные молекул
      const moleculesData: MoleculeData[] = []

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]

        // Пропускаем пустые строки
        if (!row[idIndex] || !row[idIndex].trim()) {
          continue
        }

        const name = row[nameIndex] || ''
        const surname = row[surnameIndex] || ''
        const fullName = surname ? `${name} ${surname}`.trim() : name.trim()

        if (!fullName) {
          continue
        }

        moleculesData.push({
          id: row[idIndex]?.trim() || `molecule-${i}`,
          leftText: row[usefulIndex]?.trim() || '',
          rightText: row[offerIndex]?.trim() || '',
          avatar: row[avatarIndex]?.trim() || '',
          name: fullName,
          company: row[companyIndex]?.trim() || ''
        })
      }

      console.log('✅ Загружено молекул:', moleculesData.length)
      console.log('📊 Данные молекул:', moleculesData)

      isDataUpdated.value = true
      return moleculesData
    }
  )

  const fetchMolecules = async () => {
    // Если данные уже обновлены, не делаем повторный запрос
    if (isDataUpdated.value) {
      console.log('📋 Данные молекул уже обновлены, пропускаем запрос')
      return
    }
    await fetchData()
  }

  // Автоматически загружаем при монтировании (только на клиенте)
  if (process.client) {
    onMounted(() => {
      fetchMolecules()
    })
  }

  return {
    molecules,
    loading,
    error,
    isDataUpdated,
    fetchMolecules
  }
}
