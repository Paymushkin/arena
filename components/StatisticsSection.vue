<template>
  <section ref="sectionRef" class="bg-black text-white 2xl:py-16 xl:py-12 py-8">
    <div class="container mx-auto px-4">
      <div v-if="statistics.length > 0" class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
          >
            <div
              v-for="(stat, index) in statistics"
              :key="index"
              class="flex-shrink-0 text-center px-4"
              :class="slideClass"
            >
              <h2 class="text-2xl xl:text-4xl 2xl:text-5xl font-light mb-2">
                {{ displayNumbers[index]?.displayNumber || stat.number }}
                <span v-if="stat.plus">+</span>
              </h2>
              <p class="text-white text-base xl:text-xl 2xl:text-2xl mb-1">
                {{ stat.title }}
              </p>
              <p class="text-white text-sm xl:text-lg 2xl:text-xl opacity-80">
                {{ stat.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12 text-white/60">
        <p>Ошибка загрузки данных</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNumberAnimation } from '~/composables/useNumberAnimation'

interface Statistic {
  title: string
  subtitle: string
  number: string
  plus: boolean
}

interface NumberAnimation {
  displayNumber: { value: string }
  animateNumber: (start: string, end: string) => void
}

const sectionRef = ref<HTMLElement | null>(null)
// Инициализируем с локальными данными из Google таблицы
const fallbackStatistics: Statistic[] = [
  { title: 'Title#1', subtitle: 'Subtitle#1', number: '100', plus: true },
  { title: 'Title#2', subtitle: 'Subtitle#2', number: '200', plus: false },
  { title: 'Title#3', subtitle: 'Subtitle#3', number: '300', plus: true },
  { title: 'Title#4', subtitle: 'Subtitle#4', number: '400', plus: true },
  { title: 'Title#5', subtitle: 'Subtitle#5', number: '500', plus: false },
  { title: 'Title#6', subtitle: 'Subtitle#6', number: '600', plus: true },
  { title: 'Title#7', subtitle: 'Subtitle#7', number: '700', plus: true }
]
const statistics = ref<Statistic[]>(fallbackStatistics)
const error = ref('')
const currentIndex = ref(0)
const slidesPerView = ref(1)
let autoPlayInterval: NodeJS.Timeout | null = null

// Вычисляем ширину слайда и класс в зависимости от количества слайдов на экране
const slideWidth = computed(() => {
  return 100 / slidesPerView.value
})

const slideClass = computed(() => {
  if (slidesPerView.value === 4) {
    return 'w-1/4'
  } else if (slidesPerView.value === 3) {
    return 'w-1/3'
  } else if (slidesPerView.value === 2) {
    return 'w-1/2'
  }
  return 'w-full'
})

// Создаем массив анимированных чисел
const displayNumbers = ref<NumberAnimation[]>([])

// Инициализируем анимацию чисел для локальных данных
displayNumbers.value = fallbackStatistics.map((stat: Statistic) => useNumberAnimation(stat.number) as NumberAnimation)

// Загрузка данных из Google Sheets
const fetchStatistics = async () => {
  try {
    error.value = ''

    const response = await $fetch('/api/statistics', {
      query: { _t: Date.now() }
    })

    if (response && response.success && response.statistics) {
      const newStatistics = response.statistics.filter((stat: Statistic) => stat.title && stat.number)

      if (newStatistics.length > 0) {
        // Плавно обновляем данные
        statistics.value = newStatistics

        // Создаем новые анимации для загруженных данных
        const newDisplayNumbers = newStatistics.map((stat: Statistic) => {
          const num = useNumberAnimation(stat.number)
          return num as NumberAnimation
        })

        // Плавно заменяем анимации
        displayNumbers.value = newDisplayNumbers

        // Обновляем количество слайдов после загрузки новых данных
        updateSlidesPerView()
      }
    } else {
      error.value = (response as { error?: string })?.error || 'Ошибка загрузки данных'
      // Оставляем локальные данные, не меняем их
    }
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error fetching statistics:', err)
    error.value = 'Ошибка загрузки данных'
    // Оставляем локальные данные, не меняем их
  }
}

// Функция для обновления количества слайдов на экране
const updateSlidesPerView = () => {
  if (!process.client) {
    return
  }
  const width = window.innerWidth
  if (width >= 1536) {
    // 2xl и больше - 4 слайда
    slidesPerView.value = 4
  } else if (width >= 1280) {
    // xl - 3 слайда
    slidesPerView.value = 3
  } else if (width >= 1024) {
    // lg - 2 слайда
    slidesPerView.value = 2
  } else {
    // md и меньше - 2 слайда для мобильных
    slidesPerView.value = 2
  }

  // Ограничиваем currentIndex, чтобы не выйти за границы
  const maxIndex = Math.max(0, statistics.value.length - slidesPerView.value)
  if (currentIndex.value > maxIndex) {
    currentIndex.value = maxIndex
  }
}
// Анимация чисел для всех видимых слайдов
const animateCurrentNumber = () => {
  const endIndex = Math.min(currentIndex.value + slidesPerView.value, statistics.value.length)
  for (let i = currentIndex.value; i < endIndex; i++) {
    if (displayNumbers.value[i] && statistics.value[i]) {
      const stat = statistics.value[i]
      displayNumbers.value[i].animateNumber(stat.number, stat.number)
    }
  }
}

// Автопрокрутка
const startAutoPlay = () => {
  if (statistics.value.length <= slidesPerView.value) {
    return
  }
  autoPlayInterval = setInterval(() => {
    const maxIndex = Math.max(0, statistics.value.length - slidesPerView.value)
    if (currentIndex.value >= maxIndex) {
      currentIndex.value = 0
    } else {
      currentIndex.value++
    }
    animateCurrentNumber()
  }, 5000) // Меняем каждые 5 секунд
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

// Анимация чисел при появлении секции
const animateNumbers = () => {
  const endIndex = Math.min(currentIndex.value + slidesPerView.value, statistics.value.length)
  for (let i = currentIndex.value; i < endIndex; i++) {
    if (displayNumbers.value[i] && statistics.value[i]) {
      const stat = statistics.value[i]
      displayNumbers.value[i].animateNumber(stat.number, stat.number)
    }
  }
}

onMounted(() => {
  // Инициализируем количество слайдов сразу
  updateSlidesPerView()

  // Слушаем изменения размера окна
  if (process.client) {
    window.addEventListener('resize', updateSlidesPerView)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers()
          startAutoPlay()
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  // Загружаем данные в фоне, не блокируя отображение
  fetchStatistics()
})

onUnmounted(() => {
  stopAutoPlay()
  if (process.client) {
    window.removeEventListener('resize', updateSlidesPerView)
  }
})
</script>
