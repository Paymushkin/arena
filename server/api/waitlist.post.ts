import { fetchCSVFromGoogleSheets, parseCSV, GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from '~/composables/useGoogleSheets'

interface WaitlistRequest {
  companyName: string
  industry: string
  name?: string
  email?: string
  phone?: string
  message?: string
  agreement1: boolean
  agreement2: boolean
}

interface WaitlistResponse {
  success: boolean
  message?: string
  error?: string
}

export default defineEventHandler(async (event): Promise<WaitlistResponse> => {
  try {
    const body = await readBody<WaitlistRequest>(event)
    
    console.log('Waitlist form submission received:', body)
    
    // Валидация обязательных полей
    if (!body.companyName || !body.industry) {
      return {
        success: false,
        error: 'Company name and industry are required'
      }
    }
    
    if (!body.agreement1 || !body.agreement2) {
      return {
        success: false,
        error: 'Both agreements must be accepted'
      }
    }
    
    // В реальном приложении здесь должна быть запись в Google Sheets через Google Apps Script
    // Для локальной разработки просто возвращаем успех
    // На продакшене используется Google Apps Script напрямую из компонента
    
    console.log('Waitlist data validated successfully')
    
    return {
      success: true,
      message: 'Waitlist data received successfully. In production, this would be saved to Google Sheets via Google Apps Script.'
    }
  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})

