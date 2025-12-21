<template>
  <div class="mx-auto md:my-10 my-5">
    <div class="flex flex-col gap-11">
      <div class="flex md:flex-row flex-col justify-between items-start gap-[120px]">
        <h3 v-if="!isStationPage" class="shrink-0 w-[500px] 2xl:text-4xl xl:text-3xl text-xl text-center md:text-left">{{ title }}</h3>
        <h3 v-if="isStationPage" class="2xl:text-4xl xl:text-3xl text-xl text-left" v-html="title2"></h3>
        <div 
          class="flex flex-col items-start gap-3 max-w-full"
          :class="{ 'w-auto': !isStationPage, 'xl:w-1/3 md:w-2/3 xl:px-[20px]': isStationPage }"
        >
          <p class="text-lg">{{ description }}</p>
          <NuxtLink :to="`/station${link}`" class="hover:opacity-80 transition-opacity duration-300">
            <BaseButton variant="primary">{{ buttonText }}</BaseButton>
          </NuxtLink>
        </div>
      </div>

      <div class="overflow-x-auto hide-scrollbar -mx-4 md:mx-0">
        <div class="flex md:grid md:grid-cols-3 gap-6 px-4 md:px-0">
          <div 
            v-for="(image, idx) in images" 
            :key="idx" 
            class="flex flex-col gap-4 flex-shrink-0 w-[280px] md:w-auto"
          >
            <img :src="image.src" :alt="image.caption" class="w-full">
            <div class="flex flex-col">
              <span class="xl:text-xl text-lg">{{ image.caption }}</span>
              <span class="text-gray-500">{{ image.subcaption }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

interface ImageItem {
  src: string | any
  caption: string
  subcaption: string
}

interface Props {
  title: string
  description: string
  buttonText: string
  link?: string
  images: ImageItem[]
  isStationPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  link: '#stations',
  isStationPage: false
})

const title2 = `Emirates Fashion Week:<br>First-Ever Thousands of Leads Alongside Beauty!`
</script>

