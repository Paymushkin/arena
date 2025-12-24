<template>
  <section
    ref="sectionRef"
    id="arena2"
    class="exhibition-section md:px-6 lg:px-8"
  >
    <div ref="containerRef" class="mb-12 md:mb-16 px-4 md:px-6 lg:px-8">
      <h2 id="arena2-trial" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
        Arena. Trial 1 Hour Spot
      </h2>

      <div class="space-y-6 mb-8">
        <!-- Первое фото и текст на одной строке -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="rounded-2xl overflow-hidden md:w-1/2">
            <img
              src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/1.webp"
              alt="Trial showcase spots"
              class="w-full object-contain"
            >
          </div>
          <div class="md:w-1/2">
            <p class="text-base md:text-xl xl:text-2xl mb-6">
              Trial Showcase Spots — How it Works
            </p>

            <ul class="text-sm md:text-base xl:text-lg space-y-2 mb-6">
              <li>• Each day offers 20 Showcase Spots, divided into 4 sessions of 2 hours each — that's 80 trial slots per day.</li>
              <li>• Each selected participant also receives 10 lead chats with EFW Market visitors.</li>
              <li>• Allocation is not automatic. From the waitlist, participants are chosen at the organizers' discretion, to ensure a balanced mix of services for our audience.</li>
              <li>• These trial spots are subsidized by Dubai Departments and Emirates Fashion Week as a goodwill initiative to support SMEs in Dubai's beauty and design industries.</li>
              <li>• Important: if all 60 full-day paid spots are taken, the 20 trial spots may also be sold, which reduces the chances for waitlist applicants.</li>
              <li>• You can always skip the waitlist and secure a guaranteed full-day spot (3,000 AED) — just as 60+ companies already have</li>
            </ul>
          </div>
        </div>

        <!-- Второе и третье фото в ряд -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="rounded-2xl overflow-hidden">
            <img
              src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/2.webp"
              alt="Trial showcase spots"
              class="object-contain"
            >
          </div>

          <div class="rounded-2xl overflow-hidden">
            <img
              src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/3.webp"
              alt="Trial showcase spots"
              class="object-contain"
            >
          </div>
        </div>
      </div>

              <p class="text-sm md:text-base xl:text-lg text-gray-600 mt-2 mb-4 md:mb-6 text-center">
        competition with other waitlist companies; trial slots reduced if full-day spots are purchased
      </p>

      <div class="flex flex-col items-end gap-3 mb-8">
        <BaseButton
          id="join-waitlist"
          variant="primary"
          @click="emit('open-waitlist')"
        >
          <span>Join Waitlist</span>
          <span>></span>
        </BaseButton>
      </div>

      <!-- Companies List -->
      <div class="mt-12">
        <CompaniesList
          ref="companiesListRef"
          @companies-count-updated="handleCompaniesCountUpdated"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import CompaniesList from '~/components/CompaniesList.vue'

const emit = defineEmits<{
  (e: 'open-waitlist'): void
  (e: 'companies-count-updated', count: number): void
}>()

const sectionRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const companiesListRef = ref<InstanceType<typeof CompaniesList> | null>(null)

const handleCompaniesCountUpdated = (count: number) => {
  emit('companies-count-updated', count)
}

defineExpose({
  sectionRef,
  containerRef,
  companiesListRef
})
</script>


