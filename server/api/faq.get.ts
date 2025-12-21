import { FAQ_DATA, type FaqItem } from '~/constants/faqData'
import { fetchCSVFromGoogleSheets, parseCSV, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from '~/composables/useGoogleSheets'

interface FaqResponse {
  success: boolean
  faq: FaqItem[]
  error?: string
}

export default defineEventHandler(async (): Promise<FaqResponse> => {
  try {
    // Загружаем FAQ из Google Sheets
    const csvText = await fetchCSVFromGoogleSheets({
      spreadsheetId: GOOGLE_SHEETS_IDS.ARENA_MAIN,
      gid: GOOGLE_SHEETS_GIDS.FAQ
    })
    
    const rows = parseCSV(csvText)
    
    if (rows.length >= 2) {
      // Пропускаем первую строку, если она содержит заголовки
      const dataLines = rows.length > 0 && rows[0][0]?.toLowerCase().includes('entry') 
        ? rows.slice(1) 
        : rows.slice(1) // Всегда пропускаем заголовки
      
      // Преобразуем CSV строки в объекты FaqItem
      // Структура: Question (колонка 0), Answer (колонка 1), Order (колонка 2, опционально)
      const faqItems: FaqItem[] = []
      
      for (let i = 0; i < dataLines.length; i++) {
        const row = dataLines[i]
        
        if (!row[0] || !row[0].trim()) {
          continue
        }
        
        const question = row[0]?.trim() || ''
        const answer = row[1]?.trim() || ''
        const order = row[2] ? parseInt(row[2].trim(), 10) : (i + 1)
        
        if (question && answer) {
          faqItems.push({
            id: `faq-${i + 1}`,
            question,
            answer,
            order
          })
        }
      }
      
      // Сортируем по порядку
      faqItems.sort((a, b) => a.order - b.order)
      
      console.log('FAQ items from Google Sheets:', faqItems.length)
      
      return {
        success: true,
        faq: faqItems
      }
    }
    
    // Fallback на статические данные, если нет данных в таблице
    return {
      success: true,
      faq: FAQ_DATA
    }
  } catch (error) {
    console.error('Error fetching FAQ from Google Sheets:', error)
    
    // Fallback на статические данные при ошибке
    return {
      success: true,
      faq: FAQ_DATA
    }
  }
})



