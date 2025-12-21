<template>
  <div>
    <div class="molecule-block mb-8 md:mb-12 relative max-w-[600px] mx-auto">
    <!-- Top Section (Light Gray) -->
    <div class="bg-gray-100 rounded-tl-lg md:rounded-tl-2xl rounded-tr-lg md:rounded-tr-2xl">
      <div class="flex flex-row justify-between items-start gap-2 md:gap-4 lg:gap-6">
        <!-- Left Text Block -->
        <div class="flex-1 max-w-[40%] relative py-2 md:py-4 px-2">
          <p class="absolute top-[-16px] md:top-[-20px] left-0 text-[10px] md:text-xs text-black-70 mb-1 md:mb-2">Useful</p>
          <p class="text-xs md:text-sm font-medium text-black leading-tight md:leading-normal">
            {{ leftText }}
          </p>
        </div>

        <!-- Right Text Block -->
        <div class="flex-1 max-w-[40%] text-right py-2 md:py-4 px-2">
          <p class="absolute top-[-16px] md:top-[-20px] right-0 text-[10px] md:text-xs text-black-70 mb-1 md:mb-2">Offer</p>
          <p class="text-xs md:text-sm font-medium text-black leading-tight md:leading-normal">
            {{ rightText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Avatar (Centered, overlapping both sections) -->
    <div class="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <div class="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full bg-white p-0.5 md:p-1 shadow-lg">
        <img
          :src="avatar"
          :alt="name"
          class="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>

    <!-- Bottom Section (Yellow) -->
    <div class="bg-yellow-400 px-2 py-2 md:py-3 relative rounded-bl-lg md:rounded-bl-2xl rounded-br-lg md:rounded-br-2xl">
      <div class="flex items-center justify-center mb-0.5 md:mb-1">
        <p class="text-xs md:text-base text-black text-center">
          {{ name }}
        </p>
      </div>
      <p class="text-xs md:text-base font-extrabold text-black text-center">
        {{ company }}
      </p>
      <BaseButton
        variant="primary"
        size="sm"
        class="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-black text-white hover:bg-black/90 text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5"
        @click="openModal"
      >
        Inquire offer
      </BaseButton>
    </div>
    </div>

    <!-- Inquire Offer Modal -->
    <InquireOfferModal
      :is-open="isModalOpen"
      :title="`Inquire Offer - ${props.name}`"
      :subtitle="`Get in touch with ${props.company}`"
      :molecule-id="props.id"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onUnmounted } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import InquireOfferModal from '~/components/InquireOfferModal.vue'

interface Props {
  id: string
  leftText: string
  rightText: string
  avatar: string
  name: string
  company: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  leftText: '',
  rightText: '',
  avatar: '',
  name: '',
  company: ''
})

// Inject carousel control functions from parent
const stopMoleculeCarousel = inject<() => void>('stopMoleculeCarousel')
const startMoleculeCarousel = inject<() => void>('startMoleculeCarousel')

const isModalOpen = ref(false)

const openModal = () => {
  // Stop carousel rotation when modal opens
  if (stopMoleculeCarousel) {
    stopMoleculeCarousel()
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  // Resume carousel rotation when modal closes
  if (startMoleculeCarousel) {
    startMoleculeCarousel()
  }
}

// Ensure carousel resumes if component is unmounted while modal is open
onUnmounted(() => {
  if (isModalOpen.value && startMoleculeCarousel) {
    startMoleculeCarousel()
  }
})

// Form submission is now handled directly by InquireOfferModal component
// It sends data to Google Sheets via Google Apps Script
</script>
