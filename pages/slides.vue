<template>
  <!-- Полноэкранная презентация -->
  <div class="relative min-h-screen bg-black flex items-center justify-center">
    <AppSeo
      title="Презентация - The Leads Arena"
      description="Презентация проекта The Leads Arena - современной платформы для генерации и управления лидами"
      keywords="презентация, лиды, генерация лидов, управление лидами"
    />

    <!-- Лоадер поверх презентации -->
    <div
      v-if="isLoading"
      class="z-10 flex flex-col items-center justify-center text-white"
    >
      <div class="h-10 w-10 border-2 border-white/40 border-t-white rounded-full animate-spin mb-4" />
      <p class="text-sm md:text-base text-white/80">
        Загрузка презентации...
      </p>
    </div>

    <iframe
      src="https://slides.com/meyou/for-ministry-of-ai-joindubai/embed?byline=hidden&share=hidden"
      width="100%"
      height="100%"
      title="The Leads Arena"
      scrolling="no"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
      class="absolute inset-0 w-full h-full transition-opacity duration-300"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

// Метаданные страницы
definePageMeta({
  layout: false // Убираем layout для полноэкранного режима
})

// Убираем скролл у body для полноэкранного режима
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

const handleLoad = () => {
  isLoading.value = false
}

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
