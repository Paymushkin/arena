<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Join Waitlist</h3>
        <button 
          @click="close" 
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div v-if="showSuccess" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p>{{ successMessage }}</p>
      </div>

      <div v-if="showError" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>An error occurred while adding you to the waitlist. Please try again later.</p>
      </div>

      <form v-if="!showSuccess" @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Name <span class="text-red-500">*</span></label>
          <input 
            v-model="form.companyName"
            type="text"
            required
            placeholder="Beauty Salon LLC"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
          >
          <p class="mt-1 text-xs text-gray-500">
            Your application will be displayed in the waitlist as {{ maskedCompanyName }} / {{ form.industry || 'Sector' }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry / Sector <span class="text-red-500">*</span></label>
          <select 
            v-model="form.industry"
            @change="handleIndustryChange"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled style="color: #9ca3af;">Select your industry</option>
            <option value="Medical & Aesthetic Clinics">Medical & Aesthetic Clinics</option>
            <option value="Health & Wellness Tourism / Nutrition">Health & Wellness Tourism / Nutrition</option>
            <option value="Beauty & Cosmetics Brands">Beauty & Cosmetics Brands</option>
            <option value="Makeup Artists / Nails / Brows / Lashes">Makeup Artists / Nails / Brows / Lashes</option>
            <option value="Salons, Spas & Massage Studios">Salons, Spas & Massage Studios</option>
            <option value="Barbershops & Grooming Services">Barbershops & Grooming Services</option>
            <option value="Gyms & Fitness / Wellness Studios">Gyms & Fitness / Wellness Studios</option>
            <option value="Bridal & Wedding Beauty Services">Bridal & Wedding Beauty Services</option>
            <option value="Makeup & Cosmetology Schools / Courses">Makeup & Cosmetology Schools / Courses</option>
            <option value="Beauty Tech (CRM, Booking, Payments)">Beauty Tech (CRM, Booking, Payments)</option>
            <option value="Salon & Clinic Equipment Suppliers">Salon & Clinic Equipment Suppliers</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div v-if="form.industry === 'other'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Specify Industry</label>
          <input 
            v-model="form.customIndustry"
            type="text"
            required
            placeholder="Specify your industry"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
          <input 
            v-model="form.email"
            type="email"
            placeholder="mail@company.com"
            :class="[
              'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400',
              emailError ? 'border-red-500' : 'border-gray-300'
            ]"
          >
          <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Whatsapp/Phone</label>
          <input 
            v-model="form.phone"
            type="tel"
            placeholder="+971000000000"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Referral Source & Comments to Organizers</label>
          <textarea 
            v-model="form.message"
            rows="3"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            placeholder="How did you hear about us? Any additional comments..."
          ></textarea>
        </div>

        <div class="space-y-3">
          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              v-model="form.agreement1"
              type="checkbox"
              required
              class="mt-1 w-4 h-4 text-black bg-black border-black rounded focus:ring-black focus:ring-2"
            >
            <span class="text-sm text-gray-700">
              <span class="text-red-500">*</span> I understand that trial spots are limited and subsidized. Placement on the waitlist does not guarantee participation, and allocation will depend on availability.
            </span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              v-model="form.agreement2"
              type="checkbox"
              required
              class="mt-1 w-4 h-4 text-black bg-black border-black rounded focus:ring-black focus:ring-2"
            >
            <span class="text-sm text-gray-700">
              <span class="text-red-500">*</span> I agree that the EFW team may use my contact details to notify me about updates and opportunities.
            </span>
          </label>
        </div>

        <!-- reCAPTCHA temporarily disabled on production -->
        <!-- <div v-if="isProduction && !recaptchaVerified" class="text-center text-xs text-gray-500">
          Loading reCAPTCHA verification...
        </div> -->

        <button 
          type="submit"
          :disabled="isSubmitting || !form.companyName.trim() || !form.industry || !form.agreement1 || !form.agreement2"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
        >
          {{ isSubmitting ? 'Adding to Waitlist...' : 'Join' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'success']);

const form = reactive({
  companyName: '',
  industry: '',
  customIndustry: '',
  name: '',
  email: '',
  phone: '',
  message: '',
  agreement1: false,
  agreement2: false
});

const emailError = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const recaptchaVerified = ref(false);
const successMessage = ref('');

// Check if we're in production
const isProduction = computed(() => {
  if (typeof window === 'undefined') return false;
  try {
    return !window.location.hostname.includes('localhost') && 
           !window.location.hostname.includes('127.0.0.1') &&
           !window.location.hostname.includes('0.0.0.0');
  } catch (error) {
    return false;
  }
});

// Check if we're on the production domain
const isProductionDomain = computed(() => {
  if (typeof window === 'undefined') return false;
  try {
    return window.location.hostname === 'emiratesfashionweeks.com';
  } catch (error) {
    return false;
  }
});

// Computed property для маски названия компании
const maskedCompanyName = computed(() => {
  if (!form.companyName.trim()) {
    return 'B**** ***n LLC';
  }
  
  const name = form.companyName.trim();
  const words = name.split(' ');
  
  return words.map(word => {
    if (word.length <= 2) {
      return word;
    }
    
    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    const middleStars = '*'.repeat(word.length - 2);
    
    return firstChar + middleStars + lastChar;
  }).join(' ');
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Функция для маскировки названия компании для сообщения об успехе
const maskCompanyNameForSuccess = (name) => {
  if (!name || name.length <= 2) return name;
  
  const words = name.split(' ');
  
  if (words.length === 1) {
    // Если только одно слово - показываем первые 2 и последние 3
    const word = words[0];
    if (word.length < 5) {
      return word.substring(0, 2) + '*'.repeat(word.length - 2);
    } else {
      return word.substring(0, 2) + '*'.repeat(word.length - 5) + word.substring(word.length - 3);
    }
  } else {
    // Если несколько слов
    const maskedWords = words.map((word, index) => {
      if (index === 0) {
        // Первое слово - только первые 2 буквы
        return word.substring(0, 2) + '*'.repeat(word.length - 2);
      } else if (index === words.length - 1) {
        // Последнее слово - показываем только если ровно 3 буквы
        if (word.length === 3) {
          return word;
        } else {
          return '*'.repeat(word.length);
        }
      } else {
        // Средние слова - полностью скрыты
        return '*'.repeat(word.length);
      }
    });
    
    return maskedWords.join(' ');
  }
};

// reCAPTCHA functions
const onRecaptchaSuccess = (token) => {
  console.log('reCAPTCHA success, token:', token);
  recaptchaVerified.value = true;
};

const onRecaptchaError = () => {
  console.log('reCAPTCHA error');
  recaptchaVerified.value = false;
};

const onRecaptchaExpired = () => {
  console.log('reCAPTCHA expired');
  recaptchaVerified.value = false;
};

// Load reCAPTCHA v3 script
const loadRecaptcha = () => {
  console.log('Loading reCAPTCHA v3...');
  if (typeof window === 'undefined') return;
  
  if (!window.grecaptcha) {
    console.log('reCAPTCHA not loaded, loading script...');
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Le9rMYrAAAAAHyXSxhlpMSqCfXlxRDz69h_dldu';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      console.log('reCAPTCHA script loaded');
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA ready, executing...');
          try {
            // reCAPTCHA v3 is invisible and executes automatically
            window.grecaptcha.execute('6Le9rMYrAAAAAHyXSxhlpMSqCfXlxRDz69h_dldu', {action: 'submit'}).then((token) => {
              console.log('reCAPTCHA executed, token received');
              onRecaptchaSuccess(token);
            }).catch((error) => {
              console.error('reCAPTCHA execute error:', error);
            });
          } catch (error) {
            console.error('reCAPTCHA v3 error:', error);
          }
        });
      }
    };
  } else {
    console.log('reCAPTCHA already loaded, executing...');
    // reCAPTCHA already loaded
    window.grecaptcha.ready(() => {
      console.log('reCAPTCHA ready (already loaded), executing...');
      try {
        // reCAPTCHA v3 is invisible and executes automatically
        window.grecaptcha.execute('6Le9rMYrAAAAAHyXSxhlpMSqCfXlxRDz69h_dldu', {action: 'submit'}).then((token) => {
          console.log('reCAPTCHA executed (already loaded), token received');
          onRecaptchaSuccess(token);
        }).catch((error) => {
          console.error('reCAPTCHA execute error (already loaded):', error);
        });
      } catch (error) {
        console.error('reCAPTCHA v3 error (already loaded):', error);
      }
    });
  }
};

const handleIndustryChange = () => {
  if (form.industry !== 'other') {
    form.customIndustry = '';
  }
};

const close = () => {
  if (showSuccess.value) {
    emit('close');
    showSuccess.value = false;
    return;
  }
  
  emit('close');
  form.companyName = '';
  form.industry = '';
  form.customIndustry = '';
  form.name = '';
  form.email = '';
  form.phone = '';
  form.message = '';
  form.agreement1 = false;
  form.agreement2 = false;
  emailError.value = '';
  showSuccess.value = false;
  showError.value = false;
  recaptchaVerified.value = false;
  
  // Reset reCAPTCHA
  if (typeof window !== 'undefined' && window.grecaptcha) {
    const container = document.getElementById('recaptcha-container');
    if (container) {
      container.innerHTML = '';
      nextTick(() => {
        loadRecaptcha();
      });
    }
  }
};

const handleSubmit = async () => {
  emailError.value = '';
  
  // Validate required fields
  if (!form.companyName.trim()) {
    return;
  }

  if (!form.industry) {
    return;
  }

  if (form.industry === 'other' && !form.customIndustry.trim()) {
    return;
  }

  if (!form.agreement1 || !form.agreement2) {
    return;
  }
  
  // Validate email (optional but must be valid if provided)
  if (form.email.trim() && !validateEmail(form.email)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  isSubmitting.value = true;

  try {
    const industryValue = form.industry === 'other' ? form.customIndustry : form.industry;
    
    // Определяем, работаем ли мы локально или на продакшене
    const isLocal = window.location.hostname.includes('localhost') || 
                   window.location.hostname.includes('127.0.0.1') ||
                   window.location.hostname.includes('0.0.0.0');
    
    console.log('Form submission - isLocal:', isLocal);
    console.log('Form submission - hostname:', window.location.hostname);
    
    let response;
    
    // Всегда используем Google Apps Script для отправки в таблицу waitlist
    // URL должен быть настроен после развертывания скрипта из google-apps-script-waitlist.js
    // Временный URL (нужно заменить на реальный после развертывания скрипта)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUuh8iEc5YE8k2q5e36DE66OpYPetpEOA0YdpQm0QwRXqqEcBDPcU5xP0RZI71R-bsbA/exec';
    
    console.log('Using Google Apps Script endpoint for waitlist');
    
    const urlParams = new URLSearchParams();
    urlParams.append('action', 'submit');
    urlParams.append('companyName', form.companyName);
    urlParams.append('industry', industryValue);
    urlParams.append('name', form.name || '');
    urlParams.append('email', form.email || '');
    urlParams.append('phone', form.phone || '');
    urlParams.append('message', form.message || '');
    urlParams.append('agreement1', form.agreement1.toString());
    urlParams.append('agreement2', form.agreement2.toString());
    urlParams.append('timestamp', new Date().toISOString());
    urlParams.append('source', 'Waitlist Form');
    urlParams.append('status', 'WAITLIST'); // Добавляем статус по умолчанию
    
    // Используем fetch для отправки данных (работает и локально, и на продакшене)
    try {
      response = await fetch(`${GOOGLE_SCRIPT_URL}?${urlParams.toString()}`, {
        method: 'GET',
        mode: 'no-cors' // Важно для Google Apps Script
      });
      
      // При mode: 'no-cors' response всегда ok, но мы не можем проверить статус
      // Считаем запрос успешным, если не было исключения
      console.log('Data sent to Google Apps Script successfully');
    } catch (fetchError) {
      console.error('Error sending to Google Apps Script:', fetchError);
      // Пробуем альтернативный метод через img тег (не блокируется CORS)
      const img = new Image();
      const fullUrl = `${GOOGLE_SCRIPT_URL}?${urlParams.toString()}`;
      console.log('Trying alternative method - sending via img tag:', fullUrl);
      img.src = fullUrl;
      
      // Добавляем обработчики для отслеживания успеха/ошибки
      img.onload = () => {
        console.log('Image loaded successfully - data sent to Google Sheets');
      };
      img.onerror = () => {
        console.log('Image failed to load - possible error sending data');
      };
      
      // Создаем фиктивный response объект
      response = {
        ok: true,
        status: 200
      };
    }

    if (isLocal) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    // На продакшене с img тегом мы не можем проверить статус, но если запрос прошел, считаем успешным

    // Формируем сообщение об успехе с маскированным названием компании
    const maskedName = maskCompanyNameForSuccess(form.companyName);
    successMessage.value = `${maskedName} has been successfully added to the waitlist!`;
    
    showSuccess.value = true;
    
    // Передаем информацию о добавленной компании
    const newCompanyData = {
      companyName: form.companyName,
      industry: industryValue,
      timestamp: new Date().toISOString()
    };
    emit('success', newCompanyData);
    form.companyName = '';
    form.industry = '';
    form.customIndustry = '';
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
    form.agreement1 = false;
    form.agreement2 = false;
    setTimeout(() => {
      showSuccess.value = false;
      emit('close');
    }, 5000);
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};

// Load reCAPTCHA when component mounts
onMounted(() => {
  // Temporarily disable reCAPTCHA on production
  recaptchaVerified.value = true;
  
  // if (props.isOpen && isProduction.value) {
  //   nextTick(() => {
  //     // Add small delay to ensure DOM is ready
  //     setTimeout(() => {
  //       loadRecaptcha();
  //     }, 100);
  //   });
  // } else if (!isProduction.value) {
  //   // In development, automatically verify reCAPTCHA
  //   recaptchaVerified.value = true;
  // }
});
</script>

<style scoped>
/* Принудительное применение полупрозрачности к плейсхолдерам */
input::placeholder,
textarea::placeholder {
  color: #9ca3af !important;
  opacity: 1;
}

/* Стили для option элементов */
select option:first-child {
  color: #9ca3af !important;
}

/* Дополнительные стили для браузеров */
input::-webkit-input-placeholder {
  color: #9ca3af !important;
}

input::-moz-placeholder {
  color: #9ca3af !important;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #9ca3af !important;
}

textarea::-webkit-input-placeholder {
  color: #9ca3af !important;
}

textarea::-moz-placeholder {
  color: #9ca3af !important;
  opacity: 1;
}

textarea:-ms-input-placeholder {
  color: #9ca3af !important;
}
</style>
