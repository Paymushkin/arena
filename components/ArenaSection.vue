<template>
  <section
    id="arena"
    class="arena-section w-full min-h-screen bg-[#f9fafb] relative"
  >
    <div class="flex flex-row w-full relative container mx-auto">
      <!-- Sidebar (скрыт на мобильных) -->
      <aside
        ref="sidebarRef"
        class="sidebar z-10 hidden md:block"
      >
        <ArenaSidebar
          :active-sidebar-type="activeSidebarType"
          :displayed-speakers="displayedSpeakers"
          :sidebar-stats="sidebarStats"
          :arena1Stands="arena1Stands"
          :arena2Stands="arena2Stands"
          :arena3Stands="arena3Stands"
          @scroll-to-section="scrollToSection"
        />
      </aside>

      <!-- Main Content -->
      <main class="content flex-1 min-h-screen bg-white py-4 md:py-6 w-full">
        <!-- Arena 1 Section -->
        <section
          ref="exhibitionSection1Ref"
          class="exhibition-section"
        >
          <div ref="exhibitionContainer1Ref" class="px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
            <h2 id="arena1-offers" class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">Arena Participants' offers</h2>
            <h3 class="text-base md:text-lg lg:text-xl text-black-70 mb-4 md:mb-6">Markets are built by those who show up</h3>

            <!-- Molecule Carousel -->
            <div class="relative md:mt-[100px] mt-14 lg:mb-12 mb-8 molecule-carousel-container">
              <template v-if="molecules.length > 0">
                <MoleculeCard
                  v-for="(layer, index) in moleculeLayers"
                  :key="`molecule-layer-${layer.index}-${layer.layer}`"
                  :id="molecules[layer.index].id"
                  :left-text="molecules[layer.index].leftText"
                  :right-text="molecules[layer.index].rightText"
                  :avatar="molecules[layer.index].avatar"
                  :name="molecules[layer.index].name"
                  :company="molecules[layer.index].company"
                  :class="{
                    'molecule-layer': true,
                    [`molecule-layer-${layer.layer}`]: true,
                    'molecule-animating': isMoleculeExiting,
                    'molecule-entering': layer.isEntering && isMoleculeEntering
                  }"
                />
              </template>
            </div>

            <!-- Empty Molecule -->
            <div class="mt-12 md:mt-16">
              <h2 id="arena1-offer" class="text-xl md:text-2xl lg:text-3xl font-bold mb-10 md:mb-12">
                Show your offer
              </h2> 
              <MoleculeCard
                :is-empty="true"
                empty-button-text="You are usefull with..."
                :on-empty-button-click="() => scrollToSection('arena1')"
              />
            </div>

            <!-- Show Your Offer Section -->
            <div class="mt-12 md:mt-16 mb-8 md:mb-10">
              <h2 id="arena1-trial" class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
                Trial Showcase stand
              </h2>
              <h3 class="text-base md:text-lg lg:text-xl text-black-70 mb-4 md:mb-6">
                Trial 1 hour Showcase Spot (FREE) +5 leads (FREE)
              </h3>
              <p class="text-sm md:text-base">
                Need only representative + laptop with presentation
              </p>
            </div>


            <div class="flex flex-col md:flex-row  gap-4">
              <!-- WhatsApp Button -->
              <WhatsAppButton
                phone-number="971585753302"
                text="Contact us about Showcase spot"
              />
              <a
                href="#join-waitlist"
                class="inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-3xl transition-colors border border-black hover:bg-gray-100 w-fit"
                @click.prevent="scrollToSection('arena1')"
              >
                <span>2h Free Trial Spot Waitlist</span>
                <span
                  id="trial-waitlist-count-arena"
                  style="background-color: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 12px; font-weight: bold;"
                >
                  {{ waitlistCount }}
                </span>
                <span>></span>
              </a>
            </div>
          </div>
        </section>

        <div class="mobile-section-wrapper flex flex-row">
          <!-- Мобильный сайдбар -->
          <ArenaMobileSidebar
            :active-sidebar-type="activeSidebarType"
            :displayed-speakers="displayedSpeakers"
            :sidebar-stats="sidebarStats"
            :arena1Stands="arena1Stands"
            :arena2Stands="arena2Stands"
            :arena3Stands="arena3Stands"
            @scroll-to-section="scrollToSection"
          />

          <!-- Контент секций -->
          <div class="mobile-section-content flex-1">
            <!-- Forum 1 Section -->
            <ForumSection
              ref="forumSectionComponentRef"
              :show-view-all-button="showViewAllButton"
              :grid-speakers="gridSpeakers"
              :program-tabs="programTabs"
              :partners="partners"
              @scroll-to-section="scrollToSection"
            />

            <!-- Arena 2 Section -->
            <ArenaTrialSection
              ref="arenaTrialSectionRef"
              @open-waitlist="showWaitlistForm = true"
              @companies-count-updated="updateCompaniesCount"
            />

        <!-- Arena 3 Section -->
            <ShowcaseSection
              ref="showcaseSectionRef"
              :waitlist-count="waitlistCount"
              @open-waitlist="showWaitlistForm = true"
            />
          </div>
        </div>
      </main>
    </div>

    <!-- Waitlist Form Modal -->
    <WaitlistForm
      :is-open="showWaitlistForm"
      @close="showWaitlistForm = false"
      @success="handleWaitlistSuccess"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide, watch, computed } from 'vue'
import '~/assets/styles/molecule-carousel.css'
import { useMolecules } from '~/composables/useMolecules'
import { useWaitlistCount } from '~/composables/useWaitlistCount'
import { useArenaStats } from '~/composables/useArenaStats'
import { useSpeakers } from '~/composables/useSpeakers'
import { usePartners } from '~/composables/usePartners'
import BaseButton from '~/components/ui/BaseButton.vue'
import WaitlistForm from '~/components/WaitlistForm.vue'
import MoleculeCard from '~/components/MoleculeCard.vue'
import ForumSection from '~/components/ForumSection.vue'
import WhatsAppButton from '~/components/ui/WhatsAppButton.vue'
import ArenaTrialSection from '~/components/ArenaTrialSection.vue'
import ShowcaseSection from '~/components/ShowcaseSection.vue'
import ArenaSidebar from '~/components/ArenaSidebar.vue'
import ArenaMobileSidebar from '~/components/ArenaMobileSidebar.vue'
import { CURRENT_PROGRAM_TABS } from '~/constants/currentProgram'
import { DEFAULT_SPEAKERS } from '~/constants/defaultSpeakers'
import { ARENA_STANDS } from '~/constants/arenaStands'
import {
  ARENA_TIMING,
  SPEAKERS_LIMITS,
  SECTION_TO_SIDEBAR_MAP,
  DEFAULT_SIDEBAR_TYPE,
  SIDEBAR_TYPE_MAP,
  type SidebarType,
  type SectionType
} from '~/constants/arenaConfig'

// Используем composable для загрузки данных
const { molecules, fetchMolecules } = useMolecules()
const { waitlistCount, fetchWaitlistCount } = useWaitlistCount()
const { fetchStats, getStatsByType } = useArenaStats()
const { speakers, fetchSpeakers } = useSpeakers()
const { partners, fetchPartners } = usePartners()

// Спикеры с учётом дефолтных значений
const allSpeakersWithFallback = computed(() => {
  return speakers.value.length > 0 ? speakers.value : DEFAULT_SPEAKERS
})

// Отображаем только первых N спикеров для sidebar
const displayedSpeakers = computed(() => {
  return allSpeakersWithFallback.value.slice(0, SPEAKERS_LIMITS.SIDEBAR)
})

// Отображаем максимум N спикеров для основного грида
const gridSpeakers = computed(() => {
  return allSpeakersWithFallback.value.slice(0, SPEAKERS_LIMITS.GRID)
})

// Показываем кнопку "Смотреть всех", если есть спикеры
const showViewAllButton = computed(() => {
  return allSpeakersWithFallback.value.length > 0
})

const currentMoleculeIndex = ref(0)
let moleculeInterval: NodeJS.Timeout | null = null
const isCarouselStopped = ref(false) // Флаг для отслеживания ручной остановки
const isMoleculeExiting = ref(false) // Флаг для анимации перехода
const previousMoleculeIndex = ref<number | null>(null) // Индекс предыдущей активной молекулы
const isMoleculeEntering = ref(false) // Флаг для анимации входа третьей молекулы

// Функция для получения индекса молекулы с учетом циклического перехода
function getMoleculeIndex (offset: number): number {
  if (molecules.value.length === 0) {
    return 0
  }
  return (currentMoleculeIndex.value + offset) % molecules.value.length
}

// Вычисляем слои молекул для отображения
const moleculeLayers = computed(() => {
  if (molecules.value.length === 0) {
    return []
  }
  const layers: Array<{ index: number; layer: number; isEntering?: boolean }> = [
    { index: currentMoleculeIndex.value, layer: 1 }
  ]
  if (molecules.value.length > 1) {
    layers.push({ index: getMoleculeIndex(1), layer: 2 })
  }
  if (molecules.value.length > 2) {
    const thirdIndex = getMoleculeIndex(2)
    const isEntering = previousMoleculeIndex.value !== null && molecules.value[thirdIndex]?.id === molecules.value[previousMoleculeIndex.value]?.id
    layers.push({ index: thirdIndex, layer: 3, isEntering })
  }
  return layers
})

function startMoleculeCarousel () {
  if (molecules.value.length === 0 || isCarouselStopped.value) {
    return
  }
  // Очищаем предыдущий интервал, если он есть
  if (moleculeInterval) {
    clearInterval(moleculeInterval)
  }
  moleculeInterval = setInterval(() => {
    // Сохраняем текущий индекс перед сменой
    previousMoleculeIndex.value = currentMoleculeIndex.value
    
    // Запускаем анимацию перехода
    isMoleculeExiting.value = true
    
    // После завершения анимации выхода меняем индекс и запускаем анимацию входа
    setTimeout(() => {
      currentMoleculeIndex.value = (currentMoleculeIndex.value + 1) % molecules.value.length
      isMoleculeExiting.value = false
      isMoleculeEntering.value = true
      
      // После завершения анимации входа сбрасываем флаги
      setTimeout(() => {
        isMoleculeEntering.value = false
        previousMoleculeIndex.value = null
      }, 800) // Время анимации входа
    }, 800) // Время анимации перехода
  }, ARENA_TIMING.MOLECULE_CAROUSEL_INTERVAL)
}

function stopMoleculeCarousel () {
  if (moleculeInterval) {
    clearInterval(moleculeInterval)
    moleculeInterval = null
  }
  isCarouselStopped.value = true // Помечаем, что карусель остановлена вручную
}

function resumeMoleculeCarousel () {
  isCarouselStopped.value = false // Сбрасываем флаг
  startMoleculeCarousel() // Запускаем карусель
}

const activeSidebarType = ref<SidebarType>(DEFAULT_SIDEBAR_TYPE.arena1)
const isProgrammaticScroll = ref(false)
const isInitialLoad = ref(true)

// Получаем статистику для sidebar в зависимости от активного типа
const sidebarStats = computed(() => {
  const type = SIDEBAR_TYPE_MAP[activeSidebarType.value]
  return getStatsByType(type).sort((a, b) => a.type - b.type)
})

// Refs для секций
const exhibitionSection1Ref = ref<HTMLElement | null>(null)
const exhibitionSection2Ref = ref<HTMLElement | null>(null)
const exhibitionSection3Ref = ref<HTMLElement | null>(null)
const forumSection1Ref = ref<HTMLElement | null>(null)
const exhibitionContainer1Ref = ref<HTMLElement | null>(null)
const exhibitionContainer2Ref = ref<HTMLElement | null>(null)
const exhibitionContainer3Ref = ref<HTMLElement | null>(null)
const forumContainer1Ref = ref<HTMLElement | null>(null)
const emptyMoleculeRef = ref<HTMLElement | null>(null)

// Компоненты секций
const forumSectionComponentRef = ref<InstanceType<typeof ForumSection> | null>(null)
const arenaTrialSectionRef = ref<InstanceType<typeof ArenaTrialSection> | null>(null)
const showcaseSectionRef = ref<InstanceType<typeof ShowcaseSection> | null>(null)

// Waitlist form state
const showWaitlistForm = ref(false)

// Данные программы
const programTabs = CURRENT_PROGRAM_TABS

const arena1Stands = ARENA_STANDS.arena1
const arena2Stands = ARENA_STANDS.arena2
const arena3Stands = ARENA_STANDS.arena3

// Маппинг секций к контейнерам
const SECTION_CONTAINER_MAP: Record<SectionType, () => HTMLElement | null> = {
  arena1: () => exhibitionContainer1Ref.value,
  arena2: () => exhibitionContainer2Ref.value,
  arena3: () => exhibitionContainer3Ref.value,
  forum1: () => forumContainer1Ref.value,
}

function scrollToSection (section: SectionType) {
  const targetRef = SECTION_CONTAINER_MAP[section]?.()

  if (!targetRef) {
    return
  }

  // Устанавливаем флаг программного скролла и обновляем сайдбар
  isProgrammaticScroll.value = true
  activeSidebarType.value = SECTION_TO_SIDEBAR_MAP[section]

  const containerTop = targetRef.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: containerTop,
    behavior: 'smooth'
  })

  // После завершения скролла снимаем флаг и обновляем sidebar для точности
  setTimeout(() => {
    isProgrammaticScroll.value = false
    updateSidebarByScroll()
  }, ARENA_TIMING.SCROLL_UPDATE_TIMEOUT)
}

function updateSidebarByScroll () {
  // Не обновляем сайдбар во время программного скролла
  if (isProgrammaticScroll.value) {
    return
  }

  if (!exhibitionSection1Ref.value || !exhibitionSection2Ref.value || !exhibitionSection3Ref.value || !forumSection1Ref.value) {
    return
  }

  // При первой загрузке, если мы в верхней части страницы (Arena 1 Section),
  // используем начальное состояние для arena1
  if (isInitialLoad.value) {
    const arena1Rect = exhibitionSection1Ref.value.getBoundingClientRect()
    // Если Arena 1 Section видна в верхней части viewport, используем начальное состояние
    if (arena1Rect.top >= 0 && arena1Rect.bottom > 0) {
      activeSidebarType.value = DEFAULT_SIDEBAR_TYPE.arena1
      isInitialLoad.value = false
      return
    }
  }

  isInitialLoad.value = false

  // Определяем активную секцию на основе позиции относительно верхней границы viewport
  // Секция считается активной, если её верхняя граница достигла или прошла верх viewport
  const sections = [
    { ref: exhibitionSection3Ref.value, type: 'arena3' as SidebarType, defaultType: DEFAULT_SIDEBAR_TYPE.arena3 },
    { ref: exhibitionSection2Ref.value, type: 'arena2' as SidebarType, defaultType: DEFAULT_SIDEBAR_TYPE.arena2 },
    { ref: forumSection1Ref.value, type: 'arena2' as SidebarType, defaultType: DEFAULT_SIDEBAR_TYPE.arena2 }, // ForumSection -> arena2 sidebar
    { ref: exhibitionSection1Ref.value, type: 'arena1' as SidebarType, defaultType: DEFAULT_SIDEBAR_TYPE.arena1 } // Arena 1 Section -> arena1 sidebar
  ]

  // Если Arena 1 Section видна в верхней части viewport,
  // используем начальное состояние для arena1, а не forum1
  const arena1Rect = exhibitionSection1Ref.value.getBoundingClientRect()
  if (arena1Rect.top <= 0 && arena1Rect.bottom > 0) {
    activeSidebarType.value = DEFAULT_SIDEBAR_TYPE.arena1
    return
  }

  // Сначала проверяем, есть ли секция, которая точно находится в верхней части viewport
  for (const section of sections) {
    const rect = section.ref.getBoundingClientRect()
    // Если верхняя граница секции достигла или прошла верх viewport, но секция еще видна
    if (rect.top <= 0 && rect.bottom > 0) {
      // Используем defaultType для определения начального состояния сайдбара
      activeSidebarType.value = section.defaultType
      return
    }
  }

  // Если ни одна секция не находится точно в верхней части viewport,
  // определяем, какая секция ближе всего к верхней границе viewport
  // Приоритет отдаем секциям, которые уже прошли верх viewport (rect.top < 0)
  let activeSection: { ref: HTMLElement, type: SidebarType } | null = null
  let minDistance = Infinity
  let hasPassedTop = false

  for (const section of sections) {
    const rect = section.ref.getBoundingClientRect()
    const distance = Math.abs(rect.top)
    const sectionPassedTop = rect.top < 0

    // Если секция уже прошла верх viewport (rect.top < 0), она имеет приоритет
    if (sectionPassedTop) {
      if (!hasPassedTop || distance < minDistance) {
        activeSection = { ref: section.ref, type: section.defaultType }
        minDistance = distance
        hasPassedTop = true
      }
    } else if (!hasPassedTop) {
      // Если секция еще не достигла верха, она может быть активной только если
      // нет других секций, которые уже прошли верх
      if (distance < minDistance) {
        activeSection = { ref: section.ref, type: section.defaultType }
        minDistance = distance
      }
    }
  }

  if (activeSection) {
    activeSidebarType.value = activeSection.type
  }
}

function handleScroll () {
  updateSidebarByScroll()
}

// Функция для обновления счетчика компаний
const updateCompaniesCount = (count: number) => {
  // Можно добавить логику обновления глобального счетчика, если нужно
  console.log('Companies count updated:', count)
}

// Функция для обработки успешной отправки формы
const handleWaitlistSuccess = async () => {
  // Обновляем счетчик waitlist после успешной отправки
  await fetchWaitlistCount()
}

// Provide functions for child components to control carousel
provide('stopMoleculeCarousel', stopMoleculeCarousel)
provide('startMoleculeCarousel', resumeMoleculeCarousel) // Используем resume вместо start

// Загружаем данные молекул при монтировании
onMounted(async () => {
  // Пробрасываем внутренние ref из ForumSection в локальные ссылки,
  // чтобы не переписывать scrollToSection / updateSidebarByScroll
  if (forumSectionComponentRef.value) {
    // @ts-ignore
    forumSection1Ref.value = forumSectionComponentRef.value.sectionRef
    // @ts-ignore
    forumContainer1Ref.value = forumSectionComponentRef.value.container1Ref
  }

  if (arenaTrialSectionRef.value) {
    // @ts-ignore
    exhibitionSection2Ref.value = arenaTrialSectionRef.value.sectionRef
    // @ts-ignore
    exhibitionContainer2Ref.value = arenaTrialSectionRef.value.containerRef
  }

  if (showcaseSectionRef.value) {
    // @ts-ignore
    exhibitionSection3Ref.value = showcaseSectionRef.value.sectionRef
    // @ts-ignore
    exhibitionContainer3Ref.value = showcaseSectionRef.value.containerRef
  }

  updateSidebarByScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Загружаем данные молекул из Google Sheets
  await fetchMolecules()
  
  // Загружаем количество офферов из waitlist таблицы
  await fetchWaitlistCount()
  
  // Загружаем статистику для sidebar
  await fetchStats()
  
  // Загружаем спикеров
  await fetchSpeakers()
  
  // Загружаем партнеров
  await fetchPartners()
  
  // Запускаем карусель после загрузки данных
  watch(molecules, (newMolecules) => {
    if (newMolecules.length > 0 && !moleculeInterval && !isCarouselStopped.value) {
  startMoleculeCarousel()
    }
  }, { immediate: true })
})


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopMoleculeCarousel()
})
</script>

<style scoped>
.arena-section {
  font-family: 'Inter', system-ui, sans-serif;
}

.sidebar {
  width: 80px;
  flex-shrink: 0;
  align-self: flex-start;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: visible;
  position: sticky;
  top: 0;
  /* background-color: #f9fafb; */
}

@media (min-width: 640px) {
  .sidebar {
    width: 180px;
  }
}

@media (min-width: 768px) {
  .sidebar {
    width: 200px;
  }
}

@media (min-width: 1024px) {
  .sidebar {
    width: 280px;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .sidebar {
    width: 240px;
  }
}

.content {
  min-height: 100vh;
  background-color: white;
  flex: 1;
  min-width: 0;
}

/* Мобильная версия: main на всю ширину */
@media (max-width: 767px) {
  .content {
    width: 100vw;
    max-width: 100vw;
  }
}

.speaker-item img,
.stand-item img {
  transition: transform 0.2s;
}

.speaker-item:hover img,
.stand-item:hover img {
  transform: scale(1.02);
}

.info-block {
  transition: opacity 0.2s;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.info-block p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.info-block:hover {
  opacity: 0.9;
}


/* Hover эффект для кнопки "View all speakers" */
.view-all-button-wrapper :deep(button) {
  transition: background-color 0.3s ease;
}

.view-all-button-wrapper :deep(button:hover) {
  background-color: rgba(0, 0, 0, 0.85) !important;
}

.view-all-button-wrapper :deep(button:active) {
  background-color: rgba(0, 0, 0, 0.75) !important;
}

/* Мобильный сайдбар */
.sidebar-mobile {
  width: 80px;
  flex-shrink: 0;
  align-self: flex-start;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: visible;
  position: sticky;
  top: 0;
  background-color: white;
}

.mobile-section-wrapper {
  width: 100%;
}

.mobile-section-content {
  min-width: 0;
}
</style>
