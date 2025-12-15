<template>
  <section class="bg-black w-full overflow-hidden">
    <div :class="[
      'whitespace-nowrap  flex justify-center',
      !isStatic && 'animate-marquee'
    ]">
      <!-- Если передан массив изображений -->
      <template v-if="Array.isArray(content)">
        <div v-for="(item, index) in content" :key="index" class="inline-block py-4">
          <img 
            :src="item" 
            alt="Marquee Image" 
            class="md:max-h-11 max-h-8 w-auto object-contain mx-20"
          />
        </div>
      </template>
      <!-- Если передан текст -->
      <template v-else>
        <span 
          class="inline-block text-white  px-4"
          :class="isStatic ? 'text-base py-2' : 'md:text-lg text-base py-4'"
          >
          {{ content }}
        </span>
      </template>
    </div>
  </section>
</template>

<script setup>
// Изменяем props для поддержки как строки, так и массива
defineProps({
  content: {
    type: [String, Array], // Разрешаем оба типа: String и Array
    required: true
  },
  isStatic: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}
</style>

