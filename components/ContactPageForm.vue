<template>
  <div class="card">
    <div class="card-body">
      <h2 class="text-2xl font-semibold mb-6">Напишите нам</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="Ваше имя"
          >
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="your@email.com"
          >
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
            Сообщение
          </label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none"
            placeholder="Ваше сообщение..."
          />
        </div>

        <BaseButton type="submit" variant="primary" class="w-full">
          Отправить сообщение
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Здесь будет логика отправки формы
  // Пока что просто выводим данные в консоль и сбрасываем форму
  // чтобы не менять текущее поведение страницы
  // eslint-disable-next-line no-console
  console.log('Form submitted:', form)

  form.name = ''
  form.email = ''
  form.message = ''

  alert('Спасибо! Ваше сообщение отправлено.')
}
</script>




