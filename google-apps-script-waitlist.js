/**
 * Google Apps Script для записи данных формы "Waitlist" в Google Sheets
 * 
 * Инструкция по настройке:
 * 1. Откройте Google Sheets: https://docs.google.com/spreadsheets/d/1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s/edit?gid=1951533282
 * 2. Перейдите в Extensions > Apps Script
 * 3. Вставьте этот код
 * 4. Сохраните проект (File > Save)
 * 5. Разверните как веб-приложение:
 *    - Нажмите "Deploy" > "New deployment"
 *    - Выберите тип "Web app"
 *    - Description: "Arena Waitlist Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (чтобы можно было вызывать без авторизации)
 *    - Нажмите "Deploy"
 * 6. Скопируйте URL веб-приложения (Web app URL) и используйте в компоненте WaitlistForm.vue
 */

function doGet(e) {
  try {
    Logger.log('=== Arena Waitlist Form doGet ВЫЗВАН ===');
    Logger.log('Параметры:', e.parameter);
    
    if (e.parameter && e.parameter.action === 'submit') {
      Logger.log('Обрабатываем submit action для формы Waitlist');
      
      const data = e.parameter;
      Logger.log('Данные из формы:', data);
      
      // Открываем таблицу
      const spreadsheet = SpreadsheetApp.openById('1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s');
      // Используем gid для выбора нужного листа (WAITLIST)
      const sheet = spreadsheet.getSheetById(1951533282) || spreadsheet.getActiveSheet();
      Logger.log('Таблица открыта:', sheet.getName());
      
      // Добавляем заголовки, если лист пустой
      if (sheet.getLastRow() === 0) {
        const headers = ['TIMESTAMP', 'COMPANY_NAME', 'INDUSTRY', 'NAME', 'EMAIL', 'PHONE', 'MESSAGE', 'AGREEMENT1', 'AGREEMENT2', 'TIMESTAMP_ISO', 'SOURCE', 'STATUS'];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        Logger.log('Заголовки добавлены');
      }
      
      // Форматируем timestamp в формат DD.MM.YYYY HH:MM:SS
      const now = new Date();
      const formattedTimestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss');
      const isoTimestamp = now.toISOString();
      
      // Подготавливаем данные для записи
      // Структура: TIMESTAMP, COMPANY_NAME, INDUSTRY, NAME, EMAIL, PHONE, MESSAGE, AGREEMENT1, AGREEMENT2, TIMESTAMP_ISO, SOURCE, STATUS
      const rowData = [
        formattedTimestamp, // A: TIMESTAMP (DD.MM.YYYY HH:MM:SS)
        data.companyName || '', // B: COMPANY_NAME
        data.industry || '', // C: INDUSTRY
        data.name || '', // D: NAME
        data.email || '', // E: EMAIL
        data.phone || '', // F: PHONE
        data.message || '', // G: MESSAGE
        data.agreement1 === 'true' ? 'Yes' : 'No', // H: AGREEMENT1
        data.agreement2 === 'true' ? 'Yes' : 'No', // I: AGREEMENT2
        isoTimestamp, // J: TIMESTAMP_ISO
        data.source || 'Waitlist Form', // K: SOURCE
        data.status || 'WAITLIST' // L: STATUS
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
        message: 'Waitlist data saved successfully',
        row: lastRow
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Простая проверка работоспособности
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Arena Waitlist Apps Script is working',
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
function testWaitlistFunction() {
  const testData = {
    action: 'submit',
    companyName: 'Test Company LLC',
    industry: 'Beauty & Cosmetics Brands',
    name: 'Test Name',
    email: 'test@example.com',
    phone: '+971501234567',
    message: 'Test message',
    agreement1: 'true',
    agreement2: 'true',
    source: 'Waitlist Form',
    status: 'WAITLIST'
  };
  
  const mockEvent = {
    parameter: testData
  };
  
  const result = doGet(mockEvent);
  Logger.log('Test result:', result.getContent());
}

