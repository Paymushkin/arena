# Настройка Google Sheets для формы Inquire Offer

## Шаг 1: Настройка Google Apps Script

1. Откройте Google Sheets: https://docs.google.com/spreadsheets/d/1z3JLJVzDADNCa6oSq3R701xLB8K5yyuCFlPZpSMXa1s/edit?gid=181198927

2. Перейдите в **Extensions** > **Apps Script**

3. Удалите весь код по умолчанию и вставьте код из файла `google-apps-script.js`

4. Сохраните проект:
   - Нажмите **File** > **Save** (или `Cmd+S` / `Ctrl+S`)
   - Дайте проекту имя, например: "Arena Inquire Form Handler"

## Шаг 2: Развертывание как веб-приложение

1. Нажмите **Deploy** > **New deployment**

2. Нажмите на иконку шестеренки ⚙️ рядом с "Select type" и выберите **Web app**

3. Заполните форму:
   - **Description**: `Arena Inquire Form Handler` (или любое описание)
   - **Execute as**: `Me` (ваш аккаунт)
   - **Who has access**: `Anyone` (чтобы можно было вызывать без авторизации)

4. Нажмите **Deploy**

5. При первом развертывании Google попросит авторизовать доступ:
   - Нажмите **Authorize access**
   - Выберите ваш Google аккаунт
   - Нажмите **Advanced** > **Go to Arena Inquire Form Handler (unsafe)**
   - Нажмите **Allow**

6. Скопируйте **Web app URL** (URL веб-приложения)

## Шаг 3: Настройка переменной окружения

1. Файл `.env` уже создан в корне проекта с рабочим URL:
   ```
   NUXT_PUBLIC_ARENA_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwH0jt9H9lWFVGovjfZB_fm-sWe8ynwBC2Do8IdLp8HB7rHNbvo1MxJHPP6_Yr3DSCAOA/exec
   ```

2. Если нужно изменить URL, отредактируйте файл `.env`

3. Перезапустите dev-сервер (`npm run dev`) после изменения `.env`

## Структура данных

Форма отправляет следующие данные в Google Sheets:

| Колонка | Описание | Источник |
|---------|----------|----------|
| ID | ID молекулы | `moleculeId` из props |
| DAY | Выбранный день | `selectedDay` из формы |
| SLOT | Временной слот | `selectedTimeSlot` из формы |
| COMPANY | Название компании | `companyName` из формы |
| EMAIL | Email | `email` из формы |
| COMMENT | Комментарий | `comment` из формы (до 240 символов) |
| TIMESTAMP | Время отправки | Автоматически генерируется |

## Тестирование

После настройки:

1. Откройте форму "Inquire offer" на сайте
2. Заполните все обязательные поля
3. Отправьте форму
4. Проверьте Google Sheets - должна появиться новая строка с данными

## Troubleshooting

### Данные не сохраняются в таблицу

- Проверьте, что URL веб-приложения правильный в `.env`
- Проверьте логи в Apps Script: **Executions** в левом меню
- Убедитесь, что таблица доступна для записи (права доступа)

### Ошибка CORS

- Скрипт автоматически пытается использовать `no-cors` режим как fallback
- Проверьте, что в настройках развертывания выбрано "Anyone" для доступа

### Ошибка авторизации

- Убедитесь, что вы авторизовали доступ при первом развертывании
- Проверьте, что скрипт выполняется от вашего имени ("Execute as: Me")

