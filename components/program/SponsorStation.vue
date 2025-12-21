<template>
  <div class="flex flex-col-reverse md:flex-row justify-between md:border-t items-center border-[#EFF5F6] xl:gap-[120px] md:gap-[60px] gap-[30px]">
    <div class="xl:w-[500px] md:w-[350px] w-full shrink-0 video-container">
      <video 
        ref="videoRef"
        preload="metadata"
        autoplay
        loop
        muted
        playsinline
        class="w-full aspect-[4/3] object-cover rounded-lg video-player"
      >
        <source 
          :src="videoUrl" 
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
    <div class="grow flex flex-col items-start gap-3 py-4">
      <h3 class="md:text-2xl text-xl text-black" v-html="title"></h3>
      <p v-if="description" class="2xl:text-base text-sm whitespace-pre-line">
        {{ description }}
      </p>
      <NuxtLink v-if="buttonLink" :to="buttonLink" class="hover:opacity-80 transition-opacity duration-300">
        <BaseButton variant="primary">{{ buttonText }}</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'

const videoRef = ref<HTMLVideoElement | null>(null)

defineProps({
  videoUrl: {
    type: String,
    default: 'https://storage.yandexcloud.net/videos-meyou/efw2025/promo.mp4'
  },
  title: {
    type: String,
    default: 'Stations for sponsors'
  },
  description: {
    type: String,
    default: 'AI-powered business stations designed for seamless networking, lead generation, and interactive presentations.\nEngage with prospects through dynamic screens and real-time media integration, ensuring impactful connections at every moment.'
  },
  buttonText: {
    type: String,
    default: 'More information >'
  },
  buttonLink: {
    type: String,
    default: '/station'
  }
})
</script>

<style scoped>
.video-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 768px) {
  .video-container {
    margin: 0 auto;
  }
}
</style>

