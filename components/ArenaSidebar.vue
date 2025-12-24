<template>
  <div class="md:p-3 py-2 lg:p-6">
    <!-- Forum 1 Sidebar Content -->
    <div v-if="activeSidebarType === 'forum1'" class="space-y-4 md:space-y-6">
      <!-- Speakers Block -->
      <div>
        <h3 class="text-xs md:text-sm lg:text-base font-bold mb-2 md:mb-3 lg:mb-4 uppercase">FORUM</h3>
        <div class="flex flex-col items-start space-y-2 md:space-y-3 lg:space-y-4">
          <TransitionGroup name="fade" tag="div" class="flex flex-col gap-2 md:gap-3 lg:gap-4">
            <div
              v-for="speaker in displayedSpeakers"
              :key="speaker.id"
              class="speaker-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
              @click="emitScrollToSection('forum1')"
            >
              <img
                :src="speaker.photo || 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'"
                :alt="speaker.name"
                class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-full"
              />
              <div class="flex flex-col items-start">
                <span class="text-xs md:text-sm font-semibold">{{ speaker.name }}</span>
                <span v-if="speaker.company" class="text-xs md:text-sm text-gray-600">{{ speaker.company }}</span>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Info Blocks for Forum -->
      <div class="flex flex-col space-y-2 md:space-y-3">
        <div
          v-for="(stat, index) in sidebarStats"
          :key="`sidebar-stat-${stat.type}-${index}`"
          class="info-block"
        >
          <p class="text-xs md:text-sm font-bold text-black break-words">
            {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
          </p>
          <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
            {{ stat.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Arena 1 Sidebar Content -->
    <div v-else-if="activeSidebarType === 'arena1'" class="space-y-4 md:space-y-6">
      <!-- Stands Block -->
      <div>
        <h3 class="text-xs md:text-sm lg:text-base font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
        <div class="flex flex-col items-start space-y-2 md:space-y-3 lg:space-y-4">
          <div
            v-for="stand in arena1Stands"
            :key="stand.id"
            class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
            @click="emitScrollToSection('arena1')"
          >
            <img
              :src="stand.image"
              :alt="stand.name"
              class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-lg"
            />
            <div class="flex flex-col items-start">
              <span class="text-xs md:text-sm font-semibold">{{ stand.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Blocks for Arena -->
      <div class="flex flex-col items-start space-y-2 md:space-y-3">
        <BaseButton
          variant="primary"
          size="sm"
          @click="emitScrollToSection('arena2')"
          class="rounded-lg md:rounded-xl"
        >
          TRIAL STAND
        </BaseButton>
        <div
          v-for="(stat, index) in sidebarStats"
          :key="`sidebar-stat-${stat.type}-${index}`"
          class="info-block"
        >
          <p class="text-xs md:text-sm font-bold text-black break-words">
            {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
          </p>
          <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
            {{ stat.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Arena 2 Sidebar Content -->
    <div v-else-if="activeSidebarType === 'arena2'" class="space-y-4 md:space-y-6">
      <!-- Stands Block -->
      <div>
        <h3 class="text-xs md:text-sm lg:text-base font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
        <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
          <div
            v-for="stand in arena2Stands"
            :key="stand.id"
            class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
            @click="emitScrollToSection('arena2')"
          >
            <img
              :src="stand.image"
              :alt="stand.name"
              class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-lg"
            />
            <div class="flex flex-col items-start">
              <span class="text-xs md:text-sm font-semibold">{{ stand.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Blocks for Arena -->
      <div class="flex flex-col space-y-2 md:space-y-3">
        <div
          v-for="(stat, index) in sidebarStats"
          :key="`sidebar-stat-${stat.type}-${index}`"
          class="info-block"
        >
          <p class="text-xs md:text-sm font-bold text-black break-words">
            {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
          </p>
          <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
            {{ stat.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Arena 3 Sidebar Content -->
    <div v-else-if="activeSidebarType === 'arena3'" class="space-y-4 md:space-y-6">
      <!-- Stands Block -->
      <div>
        <h3 class="text-xs md:text-sm lg:text-base font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
        <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
          <div
            v-for="stand in arena3Stands"
            :key="stand.id"
            class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
            @click="emitScrollToSection('arena3')"
          >
            <img
              :src="stand.image"
              :alt="stand.name"
              class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-lg"
            />
            <div class="flex flex-col items-start">
              <span class="text-xs md:text-sm font-semibold">{{ stand.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Blocks for Arena -->
      <div class="flex flex-col space-y-2 md:space-y-3">
        <div
          v-for="(stat, index) in sidebarStats"
          :key="`sidebar-stat-${stat.type}-${index}`"
          class="info-block"
        >
          <p class="text-xs md:text-sm font-bold text-black break-words">
            {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
          </p>
          <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
            {{ stat.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { TransitionGroup } from 'vue'
import type { SidebarType, SectionType } from '~/constants/arenaConfig'

interface Speaker {
  id: string
  name: string
  company?: string
  photo?: string
}

interface Stand {
  id: string
  name: string
  image: string
  targetSection: 'arena1' | 'arena2' | 'arena3'
}

interface SidebarStat {
  type: number
  title: string
  subtitle?: string
  number: string | number
  plus?: boolean
}

const props = defineProps<{
  activeSidebarType: SidebarType
  displayedSpeakers: Speaker[]
  sidebarStats: SidebarStat[]
  arena1Stands: Stand[]
  arena2Stands: Stand[]
  arena3Stands: Stand[]
}>()

const emit = defineEmits<{
  (e: 'scroll-to-section', section: SectionType): void
}>()

function emitScrollToSection (section: SectionType) {
  emit('scroll-to-section', section)
}
</script>


