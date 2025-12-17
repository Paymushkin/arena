<template>
  <div class="bg-black w-full py-3 md:py-4">
    <div class="container mx-auto md:px-4 px-2">
      <div class="grid grid-cols-3 gap-4 items-center">
        <!-- Левый блок: Анонс события (ротация) -->
        <div class="text-left">
          <transition name="fade" mode="out-in">
            <a 
              v-if="leftEvent"
              :key="leftEvent.name"
              :href="leftEvent.url"
              target="_blank"
              class="block text-white hover:text-gray-300 transition-colors"
            >
              <div class="text-xs md:text-sm font-medium truncate">{{ leftEvent.name }}</div>
              <div class="text-[10px] md:text-xs text-gray-400 truncate">{{ leftEvent.date }}</div>
            </a>
          </transition>
        </div>

        <!-- Центральный блок: Текущий ивент (не ссылка) -->
        <div class="text-center">
          <div v-if="currentEvent" class="text-white">
            <div class="text-sm md:text-base font-bold truncate">{{ currentEvent.name }}</div>
            <div class="text-xs md:text-sm text-gray-400 truncate">{{ currentEvent.date }}</div>
          </div>
        </div>

        <!-- Правый блок: Анонс события (ротация) -->
        <div class="text-right">
          <transition name="fade" mode="out-in">
            <a 
              v-if="rightEvent"
              :key="rightEvent.name"
              :href="rightEvent.url"
              target="_blank"
              class="block text-white hover:text-gray-300 transition-colors"
            >
              <div class="text-xs md:text-sm font-medium truncate">{{ rightEvent.name }}</div>
              <div class="text-[10px] md:text-xs text-gray-400 truncate">{{ rightEvent.date }}</div>
            </a>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentEvent, getUpcomingEvents, type Event } from '~/constants/events'

const currentEvent = ref<Event | undefined>(getCurrentEvent())
const upcomingEvents = ref<Event[]>(getUpcomingEvents())
const leftEvent = ref<Event | undefined>()
const rightEvent = ref<Event | undefined>()
let rotationInterval: NodeJS.Timeout | null = null
let currentIndex = ref(0)

const updateEvents = () => {
  if (upcomingEvents.value.length === 0) return

  if (upcomingEvents.value.length === 1) {
    // Если только одно будущее событие, показываем его слева
    leftEvent.value = upcomingEvents.value[0]
    rightEvent.value = undefined
  } else if (upcomingEvents.value.length === 2) {
    // Если два будущих события, показываем их статично
    leftEvent.value = upcomingEvents.value[0]
    rightEvent.value = upcomingEvents.value[1]
  } else {
    // Если больше двух, делаем ротацию
    const totalEvents = upcomingEvents.value.length
    const leftIndex = currentIndex.value % totalEvents
    const rightIndex = (currentIndex.value + 1) % totalEvents

    leftEvent.value = upcomingEvents.value[leftIndex]
    rightEvent.value = upcomingEvents.value[rightIndex]
  }
}

onMounted(() => {
  if (!process.client) {
    return
  }
  
  updateEvents()
  
  // Запускаем ротацию только если больше 2 событий
  if (upcomingEvents.value.length > 2) {
    rotationInterval = setInterval(() => {
      currentIndex.value++
      updateEvents()
    }, 5000) // Меняем каждые 5 секунд
  }
})

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

