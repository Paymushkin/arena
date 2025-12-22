<template>
  <div class="companies-list">
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">Loading error: {{ error }}</p>
    </div>
    
    <div v-else-if="companies.length === 0" class="text-center py-8">
      <p class="text-gray-600">No registered companies yet</p>
    </div>
    
    <div v-else class="space-y-3">
      <h3 class="text-lg font-semibold mb-4">COMPANIES APPLICATIONS ({{ companies.length }})</h3>
      <div class="space-y-3 relative">
        <div 
          v-for="(company, index) in companies" 
          :key="index"
          :class="[
            'flex items-center justify-between px-2 pb-2 md:p-3 pt-6 md:pt-3 rounded-lg border transition-all duration-300',
            isNewCompany(company) 
              ? 'bg-green-50 border-green-200 shadow-md' 
              : 'bg-gray-50 border-gray-200'
          ]"
        >
          <div class="flex items-center gap-3 flex-1">
            <div class="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <div class="text-xs md:text-base font-medium text-gray-900">
                  {{ maskCompanyName(company.companyName) }}{{ company.industry ? ' | ' + company.industry : '' }}
                </div>
                <span 
                  v-if="isNewCompany(company)" 
                  class="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full"
                >
                  NEW
                </span>
                <span :class="getStatusLabelStyle(company.status).class">
                  {{ getStatusLabelStyle(company.status).text }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useCompaniesCount } from '~/composables/useCompaniesCount'
import { GOOGLE_SHEETS_IDS, GOOGLE_SHEETS_GIDS } from '~/composables/useGoogleSheets'

const companies = ref([])
const loading = ref(true)
const error = ref('')
const newlyAddedCompany = ref(null)
const autoRefreshInterval = ref(null)

// Получаем глобальные счетчики
const { updateCompaniesCount, updateTrialWaitlistCount } = useCompaniesCount()

// Функция для маскировки названия компании
const maskCompanyName = (name) => {
  if (!name || name.length <= 2) return name
  
  const words = name.split(' ')
  
  if (words.length === 1) {
    // Если только одно слово - показываем первые 2 и последние 3
    const word = words[0]
    if (word.length < 5) {
      return word.substring(0, 2) + '*'.repeat(word.length - 2)
    } else {
      return word.substring(0, 2) + '*'.repeat(word.length - 5) + word.substring(word.length - 3)
    }
  } else {
    // Если несколько слов
    const maskedWords = words.map((word, index) => {
      if (index === 0) {
        // Первое слово - только первые 2 буквы
        return word.substring(0, 2) + '*'.repeat(word.length - 2)
      } else if (index === words.length - 1) {
        // Последнее слово - показываем только если ровно 3 буквы
        if (word.length === 3) {
          return word
        } else {
          return '*'.repeat(word.length)
        }
      } else {
        // Средние слова - полностью скрыты
        return '*'.repeat(word.length)
      }
    })
    
    return maskedWords.join(' ')
  }
}

// Функция для форматирования даты
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  
  try {
    const date = new Date(timestamp)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return timestamp
  }
}

// Функция для определения новой компании
const isNewCompany = (company) => {
  if (!newlyAddedCompany.value) return false
  const companyId = company.companyName + '_' + company.timestamp
  return companyId === newlyAddedCompany.value
}

// Функция для получения стиля лейбла статуса
const getStatusLabelStyle = (status) => {
  const normalizedStatus = (status || 'WAITLIST').toUpperCase()
  
  switch (normalizedStatus) {
    case 'GARANTEED':
    case 'GUARANTEED':
      return {
        class: 'absolute top-0 right-2 sm:static px-2 py-1 text-[8px] md:text-xs font-semibold text-green-700 md:bg-green-100 rounded-sm md:rounded-full',
        text: 'GARANTEED'
      }
    case 'RECOMMENDED':
    case 'RECOMENDED': // Учитываем опечатку в данных
    case 'RECOMМENDED': // Учитываем кириллическую М
      return {
        class: 'absolute top-0 right-2 sm:static px-2 py-1 text-[8px] md:text-xs font-semibold text-blue-700 md:bg-blue-100 rounded-sm md:rounded-full',
        text: 'RECOMMENDED'
      }
    case 'WAITLIST':
    default:
      return {
        class: 'absolute top-0 right-2 sm:static px-2 py-1 text-[8px] md:text-xs font-semibold text-orange-700 md:bg-orange-100 rounded-sm md:rounded-full',
        text: 'WAITLIST'
      }
  }
}

// Функция для фильтрации компаний (включая WAITLIST, GARANTEED и RECOMMENDED)
const filterWaitlistCompanies = (companiesList) => {
  const filteredCompanies = companiesList.filter(company => {
    // Показываем компании с пустым статусом, WAITLIST, GARANTEED и RECOMMENDED
    return !company.status || 
           company.status === '' ||
           company.status === 'WAITLIST' ||
           company.status === 'waitlist' ||
           company.status === 'GARANTEED' ||
           company.status === 'guaranteed' ||
           company.status === 'RECOMMENDED' ||
           company.status === 'recommended' ||
           company.status === 'RECOMENDED' || // Учитываем опечатку в данных
           company.status === 'recomended' ||
           company.status === 'RECOMМENDED' || // Учитываем кириллическую М
           company.status === 'recomмended'
  })
  
  return filteredCompanies
}

// Функция для загрузки списка компаний
const fetchCompanies = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Всегда используем прямые запросы к Google Sheets
    try {
      const CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_IDS.ARENA_MAIN}/export?format=csv&gid=${GOOGLE_SHEETS_GIDS.WAITLIST}`;
      
      console.log('Fetching companies from:', CSV_URL);
      
      const response = await fetch(CSV_URL);
      
      if (!response.ok) {
        throw new Error(`CSV export error: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      console.log('CSV text received:', csvText.substring(0, 200));
      
      // Парсим CSV правильно (учитывая запятые в кавычках)
      const lines = csvText.split('\n');
      const rows = lines.filter(line => line.trim()).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        
        values.push(current.trim());
        return values;
      });
      
      console.log('Parsed rows:', rows.length);
      
      // Преобразуем в формат компаний
      // Пропускаем заголовки (первую строку)
      const companiesFromCSV = rows.slice(1).map((row, index) => ({
        timestamp: row[0] || '',
        companyName: row[1] || '',
        industry: row[2] || '',
        name: row[3] || '',
        email: row[4] || '',
        phone: row[5] || '',
        message: row[6] || '',
        agreement1: row[7] || '',
        agreement2: row[8] || '',
        ipAddress: row[9] || '',
        userAgent: row[10] || '',
        status: row[11] || 'WAITLIST'
      })).filter(company => company.companyName && company.companyName.trim() !== '');
      
      console.log('Companies from CSV (after filter):', companiesFromCSV.length);
      
      // Фильтруем только waitlist компании
      const waitlistCompanies = filterWaitlistCompanies(companiesFromCSV);
      
      // Сортируем компании по дате (новые сверху)
      const sortedCompanies = waitlistCompanies.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp)
      });
      
      // Если есть подсвеченная компания, сохраняем её позицию
      if (newlyAddedCompany.value) {
        // Находим подсвеченную компанию в текущем списке
        const highlightedIndex = companies.value.findIndex(company => {
          const companyId = company.companyName + '_' + company.timestamp
          return companyId === newlyAddedCompany.value
        });
        
        if (highlightedIndex !== -1) {
          // Удаляем подсвеченную компанию из текущего списка
          const highlightedCompany = companies.value.splice(highlightedIndex, 1)[0];
          // Добавляем её в начало обновленного списка
          sortedCompanies.unshift(highlightedCompany);
        }
      }
      
      companies.value = sortedCompanies;
      console.log('CompaniesList: Обновляем счетчик компаний:', companies.value.length);
      emit('companies-count-updated', companies.value.length);
      updateCompaniesCount(companies.value.length);
      
      console.log('Companies loaded from Google Sheets:', companiesFromCSV.length);
      
    } catch (csvError) {
      console.error('CSV fetch error:', csvError);
      error.value = 'Ошибка загрузки данных из Google Sheets'
      companies.value = [];
      emit('companies-count-updated', 0);
      updateCompaniesCount(0);
    }
    
    loading.value = false;
  } catch (err) {
    console.error('Error fetching companies:', err)
    error.value = 'Ошибка загрузки данных'
    loading.value = false
  }
}

// Функция для автоматического обновления (без подсветки и лоадера)
const autoRefresh = async () => {
  try {
    // Используем прямой запрос CSV из Google Sheets
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_IDS.ARENA_MAIN}/export?format=csv&gid=${GOOGLE_SHEETS_GIDS.WAITLIST}`;
    
    const response = await fetch(CSV_URL);
    
    if (!response.ok) {
      throw new Error(`CSV export error: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    // Парсим CSV правильно (учитывая запятые в кавычках)
    const lines = csvText.split('\n');
    const rows = lines.filter(line => line.trim()).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      values.push(current.trim());
      return values;
    });
    
    // Преобразуем в формат компаний
    const companiesFromCSV = rows.map((row, index) => ({
      timestamp: row[0] || '',
      companyName: row[1] || '',
      industry: row[2] || '',
      name: row[3] || '',
      email: row[4] || '',
      phone: row[5] || '',
      message: row[6] || '',
      agreement1: row[7] || '',
      agreement2: row[8] || '',
      ipAddress: row[9] || '',
      userAgent: row[10] || '',
      status: row[11] || 'WAITLIST'
    })).filter(company => company.companyName);
    
    // Фильтруем только waitlist компании
    const waitlistCompanies = filterWaitlistCompanies(companiesFromCSV);
    
    // Сортируем компании по дате (новые сверху)
    const sortedCompanies = waitlistCompanies.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp)
    });
    
    // Если есть подсвеченная компания, сохраняем её позицию
    if (newlyAddedCompany.value) {
      // Находим подсвеченную компанию в текущем списке
      const highlightedIndex = companies.value.findIndex(company => {
        const companyId = company.companyName + '_' + company.timestamp
        return companyId === newlyAddedCompany.value
      });
      
      if (highlightedIndex !== -1) {
        // Удаляем подсвеченную компанию из текущего списка
        const highlightedCompany = companies.value.splice(highlightedIndex, 1)[0];
        // Добавляем её в начало обновленного списка
        sortedCompanies.unshift(highlightedCompany);
      }
    }
    
    companies.value = sortedCompanies;
    console.log('CompaniesList autoRefresh: Обновляем счетчик компаний:', companies.value.length);
    emit('companies-count-updated', companies.value.length);
    updateCompaniesCount(companies.value.length);
    
  } catch (error) {
    console.error('Error during auto refresh:', error)
    // Не показываем ошибку пользователю при автоматическом обновлении
  }
}

// Функция для обновления списка с подсветкой новой компании
const refresh = async (newCompanyData = null) => {
  // Если передана информация о новой компании, добавляем её сразу в начало списка
  if (newCompanyData) {
    const companyId = newCompanyData.companyName + '_' + newCompanyData.timestamp
    newlyAddedCompany.value = companyId
    
    // Добавляем новую компанию в начало списка
    companies.value.unshift(newCompanyData)
    
    // Подсветка остается до перезагрузки страницы
  }
  
  // Затем обновляем весь список из Google Sheets
  await fetchCompanies()
}

// Экспортируем функции для внешнего использования
defineExpose({
  refresh,
  fetchCompanies
})

// Эмитим событие при изменении количества компаний
const emit = defineEmits(['companies-count-updated'])

// Следим за изменением количества компаний
watch(companies, (newCompanies) => {
  emit('companies-count-updated', newCompanies.length)
  updateCompaniesCount(newCompanies.length)
}, { immediate: true })

onMounted(() => {
  fetchCompanies()
  
  // Запускаем автоматическое обновление каждую минуту
  autoRefreshInterval.value = setInterval(() => {
    autoRefresh()
  }, 60000) // 60 секунд = 1 минута
})

onUnmounted(() => {
  // Очищаем интервал при размонтировании компонента
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value)
  }
})
</script>

<style scoped>
.companies-list {
  max-width: 100%;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Кастомный скроллбар */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Для Firefox */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}
</style>
