<template>
  <section
    ref="sectionRef"
    id="forum1"
    class="forum-section px-4 md:px-6 lg:px-8"
  >
    <div ref="container1Ref">
      <div class="flex flex-row justify-between items-center mb-4 md:mb-6">
        <h2 id="forum-speakers" class="text-xl md:text-2xl lg:text-3xl font-bold">Speakers</h2>
        <div v-if="showViewAllButton" class="view-all-button-wrapper hidden md:block">
          <BaseButton variant="primary" @click="emitScrollToSection('forum1')">
            <span>View all speakers</span>
          </BaseButton>
        </div>
      </div>

      <!-- Speakers Grid -->
      <div class="mb-6 md:mb-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="speaker in gridSpeakers"
            :key="speaker.id"
            class="speaker-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="aspect-[3/4] overflow-hidden">
              <img
                :src="speaker.photo || defaultPhoto"
                :alt="speaker.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="p-3 md:p-4">
              <h3 class="text-sm md:text-base font-semibold mb-1">{{ speaker.name }}</h3>
              <p v-if="speaker.company" class="text-xs md:text-sm text-gray-600">{{ speaker.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="container2Ref" class="mb-12 md:mb-16">
      <ClientOnly>
        <ProgramSection
          id="forum-program"
          title="15<sup>th</sup> Fall Winter 2026"
          visit-button-link="https://docs.google.com/forms/d/11I7bcoDEzErBszt2UfZqf04LAjljlpkBhdRTD6CrC7g/edit?fbclid=PAZXh0bgNhZW0CMTEAAabTXlVnA-8uMswE4mM1iOQkULaorR2fFi9eZsVZlgEe1jMJH0Kb7OcDJJk_aem_LIewtA-gbtt6seDB3ZE4pw"
          :tabs="programTabs"
        />
      </ClientOnly>
    </div>

    <div ref="container3Ref" class="mb-12 md:mb-16">
      <h2 id="forum-partners" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
        Partners & Media
      </h2>
      <div class="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-9 gap-4 justify-items-center md:justify-items-start">
        <div
          v-for="partner in partners"
          :key="partner.id"
          class="flex justify-center items-center"
        >
          <img
            :src="partner.image"
            :alt="partner.name"
            class="object-center"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import ProgramSection from '~/components/ProgramSection.vue'

const defaultPhoto = 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'

interface Speaker {
  id: string
  name: string
  company?: string
  photo?: string
}

interface Partner {
  id: string
  name: string
  image: string
}

const props = defineProps<{
  showViewAllButton: boolean
  gridSpeakers: Speaker[]
  programTabs: any
  partners: Partner[]
}>()

const emit = defineEmits<{
  (e: 'scroll-to-section', section: 'forum1'): void
}>()

const sectionRef = ref<HTMLElement | null>(null)
const container1Ref = ref<HTMLElement | null>(null)
const container2Ref = ref<HTMLElement | null>(null)
const container3Ref = ref<HTMLElement | null>(null)

function emitScrollToSection (section: 'forum1') {
  emit('scroll-to-section', section)
}

defineExpose({
  sectionRef,
  container1Ref,
  container2Ref,
  container3Ref
})
</script>


