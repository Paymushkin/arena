<template>
  <!-- Полноэкранная презентация -->
  <div class="min-h-screen bg-black flex items-center justify-center">
    <iframe src="https://slides.com/meyou/for-ministry-of-ai-joindubai/embed?byline=hidden&share=hidden" width="100%"
      height="100%" title="The Leads Arena" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen
      allowfullscreen class="absolute inset-0 w-full h-full" />
  </div>
</template>

<script setup lang="ts">
// Метаданные страницы
definePageMeta({
  layout: false // Убираем layout для полноэкранного режима
})

useSeoMeta({
  title: 'The Leads Arena - Презентация',
  description: 'The Leads Arena - Презентация проекта',
  ogTitle: 'The Leads Arena',
  ogDescription: 'The Leads Arena - Презентация проекта',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Убираем скролл у body для полноэкранного режима
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
