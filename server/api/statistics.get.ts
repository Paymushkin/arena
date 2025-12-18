export default defineEventHandler(async (event) => {
  try {
    const spreadsheetId = '1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s'
    const gid = '0'
    
    // Загружаем данные из Google Sheets в формате CSV
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`
    
    const response = await fetch(csvUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheets: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    
    // Функция для парсинга CSV строки
    const parseCSVLine = (line: string) => {
      const values = []
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
    
    // Парсим CSV
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      throw new Error('Not enough data in spreadsheet')
    }
    
    // Пропускаем заголовок (первая строка)
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const values = parseCSVLine(line)
      
      // Структура: Title, Subtitle, Number, Plus
      // Проверяем, что есть минимум Title и Number
      if (values.length >= 3 && values[0] && values[2]) {
        const title = values[0].replace(/^"|"$/g, '')
        const subtitle = values[1] ? values[1].replace(/^"|"$/g, '') : ''
        const number = values[2].replace(/^"|"$/g, '')
        const plusValue = values[3] ? values[3].replace(/^"|"$/g, '').toUpperCase().trim() : ''
        const plus = plusValue === 'TRUE' || plusValue === '1' || plusValue === 'YES'
        
        // Пропускаем пустые строки
        if (title && number) {
          data.push({
            title,
            subtitle,
            number,
            plus
          })
        }
      }
    }
    
    return {
      success: true,
      statistics: data
    }
  } catch (error: unknown) {
    console.error('Error fetching statistics from Google Sheets:', error)

    // Возвращаем fallback данные
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      statistics: [
        { title: 'SEASON', subtitle: 'Dubai Arena', number: '1', plus: false },
        { title: 'DESIGNERS', subtitle: 'expected', number: '100', plus: true },
        { title: 'VISITORS', subtitle: 'anticipated', number: '1000', plus: true }
      ]
    }
  }
})
