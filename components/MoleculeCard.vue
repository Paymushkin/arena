<template>
  <div>
    <div class="molecule-block mb-8 md:mb-12 relative max-w-[600px] mx-auto">
    <!-- Top Section (Light Gray) -->
    <div class="bg-gray-100 rounded-tl-lg md:rounded-tl-2xl rounded-tr-lg md:rounded-tr-2xl">
      <div class="flex flex-row justify-between items-start gap-2 md:gap-4 lg:gap-6">
        <!-- Left Text Block -->
        <div class="flex-1 max-w-[40%] relative py-1.5 md:py-3 px-2" :class="{ 'py-2 md:py-4': isEmpty }">
          <p class="absolute top-[-14px] md:top-[-18px] left-0 text-[9px] md:text-xs text-black-70 mb-1 md:mb-2" :class="{ 'top-[-16px] md:top-[-20px] text-[10px]': isEmpty }">Useful</p>
          <p class="text-[11px] md:text-sm font-medium text-black leading-snug line-clamp-3 md:leading-normal" :class="{ 'text-xs md:text-sm leading-tight md:leading-normal': isEmpty }">
            {{ isEmpty ? DEFAULT_TEXTS.EMPTY_LEFT : leftText }}
          </p>
        </div>

        <!-- Right Text Block -->
        <div class="flex-1 max-w-[40%] text-right py-1.5 md:py-3 px-2 relative" :class="{ 'py-2 md:py-4': isEmpty }">
          <p class="absolute top-[-14px] md:top-[-18px] right-0 text-[9px] md:text-xs text-black-70 mb-1 md:mb-2" :class="{ 'top-[-16px] md:top-[-20px] text-[10px]': isEmpty }">Offer</p>
          <p class="text-[11px] md:text-sm font-medium text-black leading-snug md:leading-normal line-clamp-3" :class="{ 'text-xs md:text-sm leading-tight md:leading-normal': isEmpty }">
            {{ isEmpty ? DEFAULT_TEXTS.EMPTY_RIGHT : rightText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Avatar (Centered, overlapping both sections) -->
    <div class="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <div class="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full bg-white p-0.5 md:p-1 shadow-lg" :class="{ 'flex items-center justify-center': isEmpty }">
        <img
          v-if="!isEmpty"
          :src="avatar"
          :alt="name"
          class="w-full h-full rounded-full object-cover"
        />
        <img
          v-else
          :src="defaultProfileIcon"
          alt="Default profile"
          class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
        />
      </div>
    </div>

    <!-- Bottom Section (Yellow) -->
    <div class="bg-yellow-400 px-2 pt-2 pb-3 md:py-3 relative rounded-bl-lg md:rounded-bl-2xl rounded-br-lg md:rounded-br-2xl" :class="{ 'py-2 md:py-3': isEmpty }">
      <!-- Empty mode: just button -->
      <div v-if="isEmpty" class="flex items-center justify-center">
        <BaseButton
          variant="primary"
          size="sm"
          @click="handleEmptyButtonClick"
        >
          {{ emptyButtonText }}
        </BaseButton>
      </div>
      
      <!-- Normal mode: name, company, and inquire button -->
      <template v-else>
        <div class="flex items-center justify-center gap-1 md:gap-0 mb-0.5 md:mb-1">
          <p class="text-[11px] md:text-base text-black text-center">
            {{ name }}
          </p>
          <span v-if="company" class="md:px-1 pb-1">&bull;</span>
          <p v-if="company" class="text-[11px] md:text-base font-bold text-black text-center">
            {{ company }}
          </p>
        </div>
        <div class="mt-2 flex justify-center md:mt-0 md:block">
          <BaseButton
            variant="primary"
            size="sm"
            class="px-3 py-1 md:px-3 md:py-1.5 bg-black text-white hover:bg-black/90 text-[10px] md:text-xs md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:transform"
            @click="openModal"
          >
            Inquire offer
          </BaseButton>
        </div>
      </template>
    </div>
    </div>

    <!-- Inquire Offer Modal (only for normal mode) -->
    <InquireOfferModal
      v-if="!isEmpty"
      :is-open="isModalOpen"
      :title="`Inquire Offer - ${props.name}`"
      :subtitle="`Get in touch with ${props.company}`"
      :molecule-id="props.id"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onUnmounted, computed } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import InquireOfferModal from '~/components/InquireOfferModal.vue'
import defaultProfileIcon from '~/assets/images/et_profile-male.svg?url'

// Константы для текстов по умолчанию
const DEFAULT_TEXTS = {
  EMPTY_LEFT: 'I am useful...',
  EMPTY_RIGHT: 'I offer...',
  EMPTY_BUTTON: 'You are usefull with...',
} as const

interface Props {
  id?: string
  leftText?: string
  rightText?: string
  avatar?: string
  name?: string
  company?: string
  isEmpty?: boolean
  emptyButtonText?: string
  onEmptyButtonClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  leftText: '',
  rightText: '',
  avatar: '',
  name: '',
  company: '',
  isEmpty: false,
  emptyButtonText: 'You are usefull with...',
  onEmptyButtonClick: undefined
})

// Inject carousel control functions from parent
const stopMoleculeCarousel = inject<() => void>('stopMoleculeCarousel')
const startMoleculeCarousel = inject<() => void>('startMoleculeCarousel')

const isModalOpen = ref(false)

const openModal = () => {
  stopMoleculeCarousel?.()
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  startMoleculeCarousel?.()
}

const handleEmptyButtonClick = () => {
  props.onEmptyButtonClick?.()
}

// Ensure carousel resumes if component is unmounted while modal is open
onUnmounted(() => {
  if (isModalOpen.value) {
    startMoleculeCarousel?.()
  }
})
</script>
