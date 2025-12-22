<template>
  <div :id="id">
    <!-- <div v-if="title || visitButtonLink" class="flex justify-between md:items-center gap-8 md:mb-[50px] mb-4 max-w-[1200px]">
      <h2 v-if="title" class="text-xl md:text-3xl xl:text-4xl scroll-mt-[120px] md:scroll-mt-[100px]">
        <a v-if="id" :href="`#${id}`" class="hover:opacity-80 transition-opacity" v-html="title"></a>
        <span v-else v-html="title"></span>
      </h2>
      <NuxtLink 
        v-if="visitButtonLink"
        target="_blank"
        class="hover:opacity-80 transition-opacity duration-300"
        :to="visitButtonLink"
      >
        <BaseButton variant="primary">
          <span>Visit</span>
          <span>></span>
        </BaseButton>
      </NuxtLink>
    </div> -->

    <!-- Mobile Tabs -->
    <div v-if="tabs && tabs.length > 1" class="md:hidden mb-4 sticky top-0 z-10 bg-white">
      <div class="flex w-full border-b border-gray-200">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click.stop="selectTab(index)"
          class="flex flex-col items-center justify-center flex-1 px-2 py-3 border-r border-gray-300 last:border-r-0 transition-colors duration-300"
          :class="{
            'bg-black text-white': currentTab === index,
            'bg-white text-black hover:bg-gray-50': currentTab !== index,
          }"
        >
          <span class="text-sm font-medium">{{ tab.mobileDate?.split(' ')[0] || '1' }}</span>
          <span class="text-xs opacity-75">{{ tab.mobileDate?.split(' ')[1] || 'Nov' }}</span>
        </button>
      </div>
    </div>

    <!-- Desktop Tabs -->
    <div 
      v-if="tabs && tabs.length > 1"
      class="hidden md:block overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing w-full" 
      ref="tabsContainer"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @touchstart="startDragTouch"
      @touchmove="onDragTouch"
      @touchend="stopDrag"
    >
      <div class="flex md:gap-10 gap-8 mb-4 md:mb-10 whitespace-nowrap pb-4 md:pb-0 pl-4 md:pl-0 md:pr-[50vw]">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click.stop="selectTab(index)"
          class="flex flex-col items-start gap-2 hover:text-black flex-shrink-0"
          :class="{
            'text-black': currentTab === index,
            'text-black-20': currentTab !== index,
          }"
        >
          <span v-html="tab.title" class="text-xl 2xl:text-4xl md:text-3xl transition-colors duration-300"></span>
          <span class="transition-colors duration-300">
            {{ tab.date }}
          </span>
        </button>
      </div>
    </div>

    <div class="flex flex-col md:gap-6 gap-5">
      <div
        v-for="(event, index) in currentProgram?.events || []"
        :key="index"
      >
        <template v-if="event.type === 'sponsorStation'">
          <SponsorStation 
            :video-url="event.videoUrl" 
            :title="event.title"
            :description="event.description"
            :button-text="event.buttonText"
            :button-link="event.buttonLink"
          />
        </template>

        <template v-else-if="event.type === 'bigSponsorStation'">
          <BigSponsorStation 
            :title="event.title"
            :description="event.description"
            :button-text="event.buttonText"
            :images="event.images"
          />
        </template>

        <template v-else>
          <ProgramEvent
            :time="event.time"
            :place="event.place"
            :description="event.description"
            :details="event.details"
            :button-text="event.buttonText"
            :button-link="event.buttonLink"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SponsorStation from '~/components/program/SponsorStation.vue'
import BigSponsorStation from '~/components/program/BigSponsorStation.vue'
import ProgramEvent from '~/components/program/ProgramEvent.vue'

export interface ProgramEvent {
  type?: 'event' | 'sponsorStation' | 'bigSponsorStation' | string
  time?: string
  place?: string
  description?: string
  details?: string
  buttonText?: string
  buttonLink?: string
  videoUrl?: string
  title?: string
  images?: Array<{ src: string | any; caption: string; subcaption: string }>
}

export interface ProgramTab {
  title: string
  date: string
  mobileDate?: string
  events: ProgramEvent[]
}

interface Props {
  id?: string
  title?: string
  visitButtonLink?: string
  tabs?: ProgramTab[] | any[]
  events?: ProgramEvent[] | any[]
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  title: undefined,
  visitButtonLink: undefined,
  tabs: undefined,
  events: undefined
})

const currentTab = ref(0)
const tabsContainer = ref<HTMLElement | null>(null)
let isDragging = false
let startX = 0
let scrollLeft = 0
let hasMoved = false

// Если есть tabs, используем их, иначе используем events напрямую
const currentProgram = computed(() => {
  if (props.tabs && props.tabs.length > 0) {
    return props.tabs[currentTab.value]
  } else if (props.events && props.events.length > 0) {
    return { events: props.events }
  }
  return null
})

const startDrag = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('button')) {
    return
  }
  isDragging = true
  hasMoved = false
  const slider = tabsContainer.value
  if (!slider) return
  startX = e.pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
}

const startDragTouch = (e: TouchEvent) => {
  if ((e.target as HTMLElement).closest('button')) {
    return
  }
  isDragging = true
  hasMoved = false
  const slider = tabsContainer.value
  if (!slider) return
  startX = e.touches[0].pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging) return
  const slider = tabsContainer.value
  if (!slider) return
  const x = e.pageX - slider.offsetLeft
  const walk = Math.abs(x - startX)
  
  if (walk > 5) {
    hasMoved = true
    e.preventDefault()
    slider.scrollLeft = scrollLeft - (x - startX)
  }
}

const onDragTouch = (e: TouchEvent) => {
  if (!isDragging) return
  const slider = tabsContainer.value
  if (!slider) return
  const x = e.touches[0].pageX - slider.offsetLeft
  const walk = Math.abs(x - startX)
  
  if (walk > 5) {
    hasMoved = true
    e.preventDefault()
    slider.scrollLeft = scrollLeft - (x - startX)
  }
}

const stopDrag = () => {
  isDragging = false
  hasMoved = false
}

const selectTab = (index: number) => {
  if (isDragging && hasMoved) {
    return
  }
  currentTab.value = index
}
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari и Opera */
}
</style>

