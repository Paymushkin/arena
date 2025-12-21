/**
 * Google Apps Script для записи данных формы "Inquire Offer" в Google Sheets
 * 
 * Инструкция по настройке:
 * 1. Откройте Google Sheets: https://docs.google.com/spreadsheets/d/1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s/edit?gid=181198927
 * 2. Перейдите в Extensions > Apps Script
 * 3. Вставьте этот код
 * 4. Сохраните проект (File > Save)
 * 5. Разверните как веб-приложение:
 *    - Нажмите "Deploy" > "New deployment"
 *    - Выберите тип "Web app"
 *    - Description: "Arena Inquire Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (чтобы можно было вызывать без авторизации)
 *    - Нажмите "Deploy"
 * 6. Скопируйте URL веб-приложения (Web app URL) и используйте в компоненте InquireOfferModal.vue
 */

function doGet(e) {
  try {
    Logger.log('=== Arena Inquire Offer doGet ВЫЗВАН ===');
    Logger.log('Параметры:', e.parameter);
    
    if (e.parameter && e.parameter.action === 'submit') {
      Logger.log('Обрабатываем submit action для формы Inquire Offer');
      
      const data = e.parameter;
      Logger.log('Данные из формы:', data);
      
      // Открываем таблицу
      const spreadsheet = SpreadsheetApp.openById('1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s');
      // Используем gid для выбора нужного листа
      const sheet = spreadsheet.getSheetById(181198927) || spreadsheet.getActiveSheet();
      Logger.log('Таблица открыта:', sheet.getName());
      
      // Добавляем заголовки, если лист пустой
      if (sheet.getLastRow() === 0) {
        const headers = ['ID', 'DAY', 'SLOT', 'COMPANY', 'EMAIL', 'COMMENT', 'TIMESTAMP'];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        Logger.log('Заголовки добавлены');
      }
      
      // Подготавливаем данные для записи
      const rowData = [
        data.id || '',
        data.day || '',
        data.slot || '',
        data.company || '',
        data.email || '',
        data.comment || '',
        data.timestamp || new Date().toISOString()
      ];
      
      Logger.log('Данные для записи:', rowData);
      
      // Записываем в таблицу
      sheet.appendRow(rowData);
      Logger.log('Данные записаны в таблицу');
      
      // Проверяем последнюю записанную строку
      const lastRow = sheet.getLastRow();
      Logger.log('Последняя строка:', lastRow);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Inquire offer data saved successfully',
        row: lastRow
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Простая проверка работоспособности
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Arena Apps Script is working',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Ошибка в doGet:', error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Функция для тестирования (можно запустить вручную)
 */
function testFunction() {
  const testData = {
    id: 'molecule-1',
    day: 'monday',
    slot: '10-14',
    company: 'Test Company',
    email: 'test@example.com',
    comment: 'Test comment',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    parameter: {
      action: 'submit',
      ...testData
    }
  };
  
  const result = doGet(mockEvent);
  Logger.log('Test result:', result.getContent());
}

