<template>
  <div class="container-custom py-16">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold font-heading text-gray-900 mb-6">
        Контакты
      </h1>

      <p class="text-xl text-gray-600 mb-12">
        Свяжитесь с нами любым удобным способом
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="card">
          <div class="card-body">
            <div class="text-3xl mb-4">📧</div>
            <h3 class="font-semibold text-lg mb-2">Email</h3>
            <a href="mailto:info@thearena.show" class="text-primary-600 hover:underline">
              info@thearena.show
            </a>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="text-3xl mb-4">🌐</div>
            <h3 class="font-semibold text-lg mb-2">Website</h3>
            <a href="https://thearena.show" class="text-primary-600 hover:underline">
              thearena.show
            </a>
          </div>
        </div>
      </div>

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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Ваше сообщение..."
              />
            </div>

            <button type="submit" class="btn-primary w-full">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Контакты - The Arena',
  description: 'Свяжитесь с нами по любым вопросам',
  ogTitle: 'Контакты - The Arena',
  ogDescription: 'Свяжитесь с нами по любым вопросам'
})

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Здесь будет логика отправки формы
  console.log('Form submitted:', form)

  // Сброс формы
  form.name = ''
  form.email = ''
  form.message = ''

  alert('Спасибо! Ваше сообщение отправлено.')
}
</script>

