<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="handleBackdropClick"
  >
    <div 
      class="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto relative"
      @click.stop
    >
      <!-- Close Button - Positioned relative to modal -->
      <button 
        @click="close" 
        class="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors z-10 flex items-center justify-center"
        aria-label="Close"
      >
        <XIcon />
      </button>

      <!-- Header -->
      <div class="mb-4 pr-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
          <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
          <!-- Test: Display molecule ID -->
          <p v-if="moleculeId" class="text-xs text-gray-400 mt-1 font-mono">
            Molecule ID: {{ moleculeId }}
          </p>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p>{{ successMessage || 'Your inquiry has been submitted successfully!' }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="showError" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{{ errorMessage || 'An error occurred while submitting your inquiry. Please try again later.' }}</p>
      </div>

      <!-- Form -->
      <form v-if="!showSuccess" @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Day Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Day <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.selectedDay"
            :class="[
              'custom-select w-full px-3 pr-10 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white',
              dayError ? 'border-red-500' : 'border-gray-300'
            ]"
          >
            <option value="" disabled>Choose a day</option>
            <option
              v-for="day in availableDays"
              :key="day.value"
              :value="day.value"
            >
              {{ day.label }}
            </option>
          </select>
          <p v-if="dayError" class="mt-1 text-sm text-red-500">{{ dayError }}</p>
        </div>

        <!-- Time Slot Selection -->
        <div v-if="form.selectedDay">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Time Slot <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="slot in timeSlots"
              :key="slot.value"
              type="button"
              @click="form.selectedTimeSlot = slot.value"
              :class="[
                'px-4 py-2 rounded-md border transition-colors text-sm font-medium',
                form.selectedTimeSlot === slot.value
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              ]"
            >
              {{ slot.label }}
            </button>
          </div>
          <p v-if="timeSlotError" class="mt-1 text-sm text-red-500">{{ timeSlotError }}</p>
        </div>

        <!-- Company Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.companyName"
            type="text"
            required
            :class="[
              'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black',
              companyError ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Enter company name"
          >
          <p v-if="companyError" class="mt-1 text-sm text-red-500">{{ companyError }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.email"
            type="email"
            required
            :class="[
              'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black',
              emailError ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="your@email.com"
          >
          <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
        </div>

        <!-- Comment -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Comment <span class="text-gray-500 text-xs">(optional, max 240 characters)</span>
          </label>
          <textarea 
            v-model="form.comment"
            rows="4"
            maxlength="240"
            :class="[
              'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none',
              commentError ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Add any additional information..."
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <p v-if="commentError" class="text-sm text-red-500">{{ commentError }}</p>
            <p class="text-xs text-gray-500 ml-auto">
              {{ form.comment.length }}/240
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-3 pt-2">
          <button 
            type="button"
            @click="close"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>{{ isSubmitting ? 'Submitting...' : 'Submit' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import XIcon from '~/components/icons/XIcon.vue'

const config = useRuntimeConfig()

interface Props {
  isOpen: boolean
  title?: string
  subtitle?: string
  moleculeId?: string
  availableDays?: Array<{ value: string; label: string }>
  timeSlots?: Array<{ value: string; label: string }>
  successMessage?: string
  errorMessage?: string
  onSubmit?: (data: FormData) => Promise<void> | void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Inquire Offer',
  subtitle: '',
  moleculeId: '',
  availableDays: () => [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' }
  ],
  timeSlots: () => [
    { value: '10-14', label: '10:00 - 14:00' },
    { value: '14-18', label: '14:00 - 18:00' }
  ],
  successMessage: '',
  errorMessage: ''
})

const emit = defineEmits<{
  close: []
  submit: [data: FormData]
}>()

interface FormData {
  selectedDay: string
  selectedTimeSlot: string
  companyName: string
  email: string
  comment: string
}

const form = reactive<FormData>({
  selectedDay: '',
  selectedTimeSlot: '',
  companyName: '',
  email: '',
  comment: ''
})

const emailError = ref('')
const companyError = ref('')
const dayError = ref('')
const timeSlotError = ref('')
const commentError = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const isFormValid = computed(() => {
  return (
    form.selectedDay !== '' &&
    form.selectedTimeSlot !== '' &&
    form.companyName.trim() !== '' &&
    form.email.trim() !== '' &&
    validateEmail(form.email) &&
    form.comment.length <= 240
  )
})

const resetForm = () => {
  form.selectedDay = ''
  form.selectedTimeSlot = ''
  form.companyName = ''
  form.email = ''
  form.comment = ''
  emailError.value = ''
  companyError.value = ''
  dayError.value = ''
  timeSlotError.value = ''
  commentError.value = ''
  showSuccess.value = false
  showError.value = false
}

const close = () => {
  if (showSuccess.value) {
    resetForm()
    emit('close')
    return
  }
  
  resetForm()
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close()
  }
}

const handleSubmit = async () => {
  // Reset errors
  emailError.value = ''
  companyError.value = ''
  dayError.value = ''
  timeSlotError.value = ''
  commentError.value = ''
  showError.value = false

  // Validate day
  if (!form.selectedDay) {
    dayError.value = 'Please select a day'
    return
  }

  // Validate time slot
  if (!form.selectedTimeSlot) {
    timeSlotError.value = 'Please select a time slot'
    return
  }

  // Validate company name
  if (!form.companyName.trim()) {
    companyError.value = 'Company name is required'
    return
  }

  // Validate email
  if (!form.email.trim()) {
    emailError.value = 'Email is required'
    return
  }

  if (!validateEmail(form.email)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  // Validate comment length
  if (form.comment.length > 240) {
    commentError.value = 'Comment must be 240 characters or less'
    return
  }

  isSubmitting.value = true

  try {
    // If custom onSubmit handler is provided, use it
    if (props.onSubmit) {
      await props.onSubmit(form)
    } else {
      // Default: send to Google Sheets via Google Apps Script
      await submitToGoogleSheets(form)
    }

    showSuccess.value = true
    
    // Auto close after 3 seconds
    setTimeout(() => {
      resetForm()
      emit('close')
    }, 3000)
  } catch (error) {
    console.error('Error submitting form:', error)
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

// Function to submit data to Google Sheets via Google Apps Script
const submitToGoogleSheets = async (formData: FormData) => {
  // Get Google Apps Script URL from runtime config
  // Set NUXT_PUBLIC_ARENA_SCRIPT_URL in .env file after deploying the script
  const GOOGLE_APPS_SCRIPT_URL = config.public.arenaScriptUrl
  
  console.log('Google Apps Script URL from config:', GOOGLE_APPS_SCRIPT_URL)
  
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn('⚠️ Google Apps Script URL not configured. Emitting submit event instead.')
    console.warn('Please set NUXT_PUBLIC_ARENA_SCRIPT_URL in .env file and restart dev server')
    emit('submit', formData)
    return
  }

  // Prepare data for Google Sheets
  const data = {
    action: 'submit',
    id: props.moleculeId || '',
    day: formData.selectedDay || '',
    slot: formData.selectedTimeSlot || '',
    company: formData.companyName || '',
    email: formData.email || '',
    comment: formData.comment || '',
    timestamp: new Date().toISOString()
  }

  // Convert data to URL parameters
  const params = new URLSearchParams({
    action: data.action,
    id: data.id,
    day: data.day,
    slot: data.slot,
    company: data.company,
    email: data.email,
    comment: data.comment,
    timestamp: data.timestamp
  })

  // Send request to Google Apps Script
  console.log('Sending inquire offer data:', data)
  console.log('URL:', `${GOOGLE_APPS_SCRIPT_URL}?${params}`)

  try {
    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?${params}`, {
      method: 'GET',
      mode: 'cors' // Try CORS first
    })

    if (response.ok) {
      const result = await response.json()
      console.log('Google Apps Script response:', result)

      if (result.success) {
        console.log('✅ Inquire offer submitted successfully:', result.message)
      } else {
        console.error('❌ Submission failed:', result.error)
        throw new Error(result.error || 'Submission failed')
      }
    } else {
      console.error('❌ HTTP error:', response.status, response.statusText)
      throw new Error(`HTTP error: ${response.status}`)
    }
  } catch (corsError) {
    console.log('CORS error, trying no-cors mode...')

    // Fallback to no-cors mode
    await fetch(`${GOOGLE_APPS_SCRIPT_URL}?${params}`, {
      method: 'GET',
      mode: 'no-cors'
    })

    console.log('Inquire offer data sent (no-cors mode)')
  }
}
</script>

<style scoped>
.custom-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-position: right 12px center;
  background-repeat: no-repeat;
}
</style>

