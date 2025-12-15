<template>
  <div 
    id="gallery"
    class="container gallery-iframe-container"
    :class="{ 'with-fog': showFog }"
  >
    <div class="overlay" @click="navigateToGallery"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  showFog: {
    type: Boolean,
    default: true
  },
});

const isMobile = ref(false);
let isUpdating = false;
let updateTimeout = null;

const checkMobile = () => {
  if (!process.client) return;
  
  const newIsMobile = window.innerWidth < 768;
  // Обновляем только если значение действительно изменилось
  if (isMobile.value !== newIsMobile) {
    isMobile.value = newIsMobile;
  }
};

const updateScript = () => {
  if (!process.client) return;
  
  // Защита от множественных одновременных вызовов
  if (isUpdating) {
    return;
  }
  
  const galleryBlock = document.getElementById('gallery');
  if (!galleryBlock) return;

  isUpdating = true;

  // Очищаем предыдущий таймаут, если он есть
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  // Удаляем только старые iframe и скрипты
  galleryBlock.querySelectorAll('iframe').forEach(el => el.remove());
  galleryBlock.querySelectorAll('script[data-gallery]').forEach(el => el.remove());
  
  // Также удаляем скрипт по id на случай, если он был создан без data-gallery
  const existingScript = document.getElementById('gallery_init');
  if (existingScript && existingScript.parentNode === galleryBlock) {
    existingScript.remove();
  }

  updateTimeout = setTimeout(() => {
    const script = document.createElement('script');
    script.src = 'https://meyou.id/public/meyou_init.js?v=1.0.0';
    script.id = 'gallery_init';
    script.setAttribute('data-gallery', '1'); // для поиска и удаления

    const params = isMobile.value 
      ? 'UTM=theleadsarena&header&footer&tag&count=8&nobutton&size=100&noclick&pages'
      : 'UTM=theleadsarena&header&footer&tag&count=24&nobutton&size=150&noclick&pages';

    script.setAttribute(
      'data-event',
      `https://meyou.id/efwss26/live?${params}`
    );

    galleryBlock.appendChild(script);
    
    isUpdating = false;
    updateTimeout = null;
  }, 100);

};

function handleMeyouMessage(event) {
  // Проверяем, что event.data существует
  if (!event.data) return;
  
  // Проверяем, что event.data это строка или может быть преобразовано в строку
  if (typeof event.data !== 'string') {
    // Игнорируем не-строковые данные (например, объекты от других расширений)
    return;
  }
  
  // Проверяем наличие подстроки безопасным способом
  if (event.data.includes('meyouHeight')) {
    // Обработка события meyou
    console.log('Meyou height message received');
  }
}

watch(isMobile, (newVal, oldVal) => {
  // Вызываем updateScript только если значение действительно изменилось
  if (newVal !== oldVal) {
    updateScript();
  }
});

onMounted(() => {
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('message', handleMeyouMessage);
    setTimeout(updateScript, 100);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('message', handleMeyouMessage);
    
    // Очищаем таймаут при размонтировании
    if (updateTimeout) {
      clearTimeout(updateTimeout);
      updateTimeout = null;
    }
    
    // Очищаем iframe и скрипты при размонтировании
    const galleryBlock = document.getElementById('gallery');
    if (galleryBlock) {
      galleryBlock.querySelectorAll('iframe').forEach(el => el.remove());
      galleryBlock.querySelectorAll('script[data-gallery]').forEach(el => el.remove());
      const existingScript = document.getElementById('gallery_init');
      if (existingScript && existingScript.parentNode === galleryBlock) {
        existingScript.remove();
      }
    }
    
    isUpdating = false;
  }
});

const navigateToGallery = () => {
  if (process.client) {
    // Можно добавить навигацию к галерее, если нужно
    console.log('Gallery clicked');
  }
};
</script>

<style scoped>
.gallery-iframe-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 2.5rem;
  position: relative;
  min-height: 300px;
}

.gallery-iframe-container iframe {
  max-width: 100%;
  width: 100%;
}

@media (min-width: 768px) {
  .gallery-iframe-container {
    margin-bottom: 4.75rem;
  }
}

.overlay {
  position: absolute;
  inset: 0;
  cursor: pointer;
  z-index: 1;
}

.gallery-iframe-container.with-fog::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.3) 40%,
    rgba(255, 255, 255, 0.6) 60%,
    rgba(255, 255, 255, 0.8) 80%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  z-index: 2;
}

@media (min-width: 768px) {
  .gallery-iframe-container.with-fog::after {
    height: 100px;
  }
}
</style>


