<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Contact Us</h3>
        <button 
          @click="close" 
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div v-if="showSuccess" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p>Your message has been sent successfully!</p>
      </div>

      <div v-if="showError" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>An error occurred while sending your message. Please try again later.</p>
      </div>

      <form v-if="!showSuccess" @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            v-model="form.name"
            type="text"
            required
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="form.email"
            type="email"
            required
            :class="[
              'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-black',
              emailError ? 'border-red-500' : 'border-gray-300'
            ]"
          >
          <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea 
            v-model="form.message"
            required
            rows="4"
            class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <button 
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const emailError = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const config = useRuntimeConfig();

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const close = () => {
  if (showSuccess.value) {
    emit('close');
    showSuccess.value = false;
    return;
  }
  
  emit('close');
  form.name = '';
  form.email = '';
  form.message = '';
  emailError.value = '';
  showSuccess.value = false;
  showError.value = false;
};

const handleSubmit = async () => {
  emailError.value = '';
  
  if (!validateEmail(form.email)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  isSubmitting.value = true;

  try {
    // Используем Formspree для отправки формы
    // Зарегистрируйтесь на formspree.io и замените "YOUR_FORM_ID" на ID вашей формы
    const response = await fetch('https://formspree.io/f/mwplnlgo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    showSuccess.value = true;
    form.name = '';
    form.email = '';
    form.message = '';
    setTimeout(() => {
      showSuccess.value = false;
      emit('close');
    }, 5000);
  } catch (error) {
    console.error('Error sending message:', error);
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script> 