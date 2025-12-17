import { FAQ_DATA, type FaqItem } from '~/constants/faqData'

interface FaqResponse {
  success: boolean
  faq: FaqItem[]
  error?: string
}

export default defineEventHandler<FaqResponse>(() => {
  // Простой API‑эндпоинт, который всегда
  // возвращает актуальные FAQ из constants/faqData.ts
  return {
    success: true,
    faq: FAQ_DATA
  }
})


