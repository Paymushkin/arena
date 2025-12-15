<template>
  <div class="container-custom py-16">
    <AppSeo
      title="О нас - The Leads Arena"
      description="Узнайте больше о The Leads Arena - современной платформе для генерации и управления лидами. Наша миссия, технологии и подход."
      keywords="о нас, команда, миссия, технологии, лиды, генерация лидов"
    />
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold font-heading text-gray-900 mb-6">
        О нас
      </h1>

      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 mb-8">
          The Arena - это современная платформа, созданная с использованием
          новейших веб-технологий.
        </p>

        <div class="card mb-8">
          <div class="card-body">
            <h2 class="text-2xl font-semibold mb-4">Наша миссия</h2>
            <p class="text-gray-600">
              Мы стремимся создавать лучшие веб-приложения, которые сочетают
              в себе современный дизайн, высокую производительность и отличный
              пользовательский опыт.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <div class="card-body">
              <h3 class="text-xl font-semibold mb-2">Инновации</h3>
              <p class="text-gray-600">
                Мы используем самые современные технологии и подходы
                в разработке.
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h3 class="text-xl font-semibold mb-2">Качество</h3>
              <p class="text-gray-600">
                Каждая строка кода проходит тщательную проверку и оптимизацию.
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h3 class="text-xl font-semibold mb-2">Скорость</h3>
              <p class="text-gray-600">
                Быстрая загрузка и отзывчивый интерфейс - наши приоритеты.
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h3 class="text-xl font-semibold mb-2">Поддержка</h3>
              <p class="text-gray-600">
                Мы всегда готовы помочь и ответить на ваши вопросы.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

