<template>
  <section ref="sectionRef" :id="props.id" :class="sectionClasses">
    <video
      ref="videoRef"
      autoplay
      loop
      muted
      playsinline
      webkit-playsinline
      preload="metadata"
      class="absolute top-0 left-0 w-full h-full object-cover z-0 mix-blend-multiply"
    >
      <source
        src="https://storage.yandexcloud.net/videos-meyou/bg-video.mp4"
        type="video/mp4"
      />
      Ваш браузер не поддерживает видео.
    </video>
    <div
      class="absolute top-0 left-0 w-full h-full bg-black opacity-35 z-10"
    ></div>
    <div class="container flex flex-col grow mx-auto md:px-4 px-2 py-10 relative z-20">
      <h1 class="xl:text-5xl md:text-4xl text-xl font-bold text-white">
        Dubai. Fashion & Beauty Arena + Forum
      </h1>
      <span class="xl:text-[60px] text-xl text-white font-bold md:mb-4 mb-2">by Emirates Fashion Week</span>
      <span class="text-white mb-10 text-xl font-bold">20-21 January 2026</span>
      <GalleryIframe :show-fog="false" />
    </div>

    <div class="relative z-20">
      <div class="flex flex-col w-full max-w-[645px]">
        <div class="py-4 px-6 bg-black bg-opacity-30 md:text-right mix-blend-multiply">
          <LogoIcon class="md:ml-auto h-8 mb-2" />
          <a 
            href="#features" 
            class="text-white"
            @click.prevent="handleHashtagClick"
          >{{ hashtag[0] }}</a>
        </div>
      </div>
      <MarqueeSection :content="marqueeText2" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, useAttrs, computed } from 'vue';
import LogoIcon from '~/components/icons/LogoIcon.vue';
import MarqueeSection from '~/components/MarqueeSection.vue';
import GalleryIframe from '~/components/GalleryIframe.vue';
import { marqueeText2, hashtag } from '~/constants/texts';
import { useVideoVisibility } from '@/composables/useVideoVisibility';

defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  id: {
    type: String,
    default: undefined
  }
});

const attrs = useAttrs();

const sectionClasses = computed(() => {
  const baseClasses = 'relative flex flex-col min-h-screen overflow-hidden';
  const attrClass = attrs.class;
  if (!attrClass) return baseClasses;
  if (typeof attrClass === 'string') {
    return `${baseClasses} ${attrClass}`;
  }
  return [baseClasses, attrClass];
});

const videoRef = ref(null);
const sectionRef = ref(null);
const { isVisible } = useVideoVisibility(videoRef);
const isMobile = ref(false);
const MOBILE_BREAKPOINT = 768;
let previousWidth = 0;

const handleHashtagClick = () => {
  if (!process.client) return;
  
  const featuresElement = document.querySelector('#features');
  if (featuresElement) {
    featuresElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const hasBreakpointChanged = (currentWidth, prevWidth) => {
  return (
    (currentWidth < MOBILE_BREAKPOINT && prevWidth >= MOBILE_BREAKPOINT) ||
    (currentWidth >= MOBILE_BREAKPOINT && prevWidth < MOBILE_BREAKPOINT)
  );
};

const updateSize = () => {
  if (!process.client) return;
  
  const currentWidth = window.innerWidth;
  if (hasBreakpointChanged(currentWidth, previousWidth)) {
    isMobile.value = currentWidth < MOBILE_BREAKPOINT;
  }
  previousWidth = currentWidth;
};

onMounted(async () => {
  if (!process.client) return;
  
  // Явно устанавливаем ID на корневой элемент
  await nextTick();
  if (props.id && sectionRef.value) {
    sectionRef.value.id = props.id;
  }
  
  // Инициализируем после монтирования
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  previousWidth = window.innerWidth;
  
  window.addEventListener('resize', updateSize);
  
  if (videoRef.value) {
    // Добавляем небольшую задержку перед воспроизведением
    setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.play().catch(error => {
          console.log('Autoplay failed:', error);
        });
      }
    }, 100);
  }
});

onUnmounted(() => {
  if (!process.client) return;
  window.removeEventListener('resize', updateSize);
});
</script>

<style scoped>
h1 {
  position: relative;
  z-index: 20;
}
</style>

