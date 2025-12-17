<template>
  <header class="w-full">
    <!-- Events bar -->
    <EventsBar />
    <!-- Navigation -->
    <nav class="bg-white">
      <div class="container mx-auto md:px-4 px-2">
        <div class="flex items-center justify-between py-4 gap-1.5">
          <!-- Left side: Logo and Hashtag -->
          <div class="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 2xl:gap-12">
            <button
              class="lg:hidden text-black"
              @click="isMenuOpen = !isMenuOpen"
            >
              <MenuIcon v-if="!isMenuOpen" class="w-6 h-6" />
              <XIcon v-else class="w-6 h-6" />
            </button>
            <div class="flex flex-col gap-1">
              <NuxtLink to="/" class="flex-shrink-0">
                <!-- Основное лого везде -->
                <LogoBlack class="h-4 md:h-5 lg:h-6 xl:h-7 2xl:h-8 w-[132px] md:w-[165px] max-w-full lg:w-[198px] xl:w-[231px] 2xl:w-[254px]" />
              </NuxtLink>

              <button
                type="button"
                class="text-black text-[8px] md:text-[10px] xl:text-xs 2xl:text-sm md:uppercase lowercase text-left"
                @click="handleHashtagClick"
              >
                {{ hashtag[0] }}
              </button>
            </div>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-8">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="link.href"
              class="text-black hover:text-gray-600 transition-colors cursor-pointer 2xl:text-base lg:text-sm text-xs"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.name }}
            </a>
          </div>

          <!-- Desktop Actions -->
          <div class="flex items-center gap-1.5 lg:gap-3 xl:gap-4 2xl:gap-5">
            <!-- <NuxtLink target="_blank" 
              to="/gallery"
              v-if="!isGalleryPage">
              <BaseButton variant="primary">
                <span>Gallery</span>
                <span>></span>
              </BaseButton>
            </NuxtLink> -->

            <div class="relative hidden md:block">
              <!-- Participate mobile (small) -->
              <BaseButton variant="secondary" size="sm" @click="toggleParticipateMenu" class="flex w-full justify-between md:hidden">
                <span>Participate</span>
              </BaseButton>
              <!-- Participate desktop/tablet (default large) -->
              <BaseButton variant="secondary" @click="toggleParticipateMenu" class="hidden md:flex w-full justify-between">
                <span>Participate</span>
                <span class="inline">></span>
              </BaseButton>

              <div v-if="isParticipateOpen" class="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg py-2 min-w-[150px] z-50 text-black">
                <NuxtLink :to="designerRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black">
                  Designer
                </NuxtLink>

                <NuxtLink :to="modelRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black">
                  Model
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black">
                  Buyer
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black">
                  Stylist
                </NuxtLink>

                <NuxtLink :to="phototVideoRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black"> 
                  Photo / Video
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black">
                  Media
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black"> 
                  Influencer 
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-2 hover:bg-gray-100 transition-colors text-black"> 
                  Other
                </NuxtLink>

              </div>
            </div>
            <a href="https://magazine.emiratesfashionweek.com" class="md:hidden flex justify-center items-center text-black hover:text-gray-600 transition-colors cursor-pointer 2xl:text-base lg:text-sm text-xs">MAGAZINE</a>
            <!-- Visit mobile (small) - скрываем на welcome странице -->
            <NuxtLink v-if="!isWelcomePage" target="_blank" :to="visitorsRegistration" class="hidden">
              <BaseButton variant="primary" size="sm">
                <span>Visit</span>
              </BaseButton>
            </NuxtLink>
            <!-- Visit desktop/tablet (default large) - скрываем на welcome странице -->
            <NuxtLink v-if="!isWelcomePage" target="_blank" :to="visitorsRegistration" class="hidden md:flex">
              <BaseButton variant="primary">
                <span>Visit</span>
                <span class="inline">></span>
              </BaseButton>
            </NuxtLink>

            <NuxtLink 
              :to="instagram"
              target="_blank"
              class="text-black/80 hover:text-black transition-colors"
            >
              <InstagramIcon />
            </NuxtLink>
            <!-- YouTube иконка убрана -->
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen"
      class="fixed left-0 top-[62px] md:top-[100px] w-full h-[calc(100vh-62px)] md:h-[calc(100vh-100px)] bg-white z-50 lg:hidden overflow-y-auto"
    >
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col items-start gap-11">
          <div class="flex flex-col gap-4">
            <!-- Navigation Links -->
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="link.href"
              class="text-lg font-light text-black"
              @click="handleMobileNavClick(link.href)"
            >
              {{ link.name }}
            </a>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-4">
            <NuxtLink target="_blank" 
              to="https://docs.google.com/forms/d/11I7bcoDEzErBszt2UfZqf04LAjljlpkBhdRTD6CrC7g/edit">
              <NuxtLink target="_blank" 
                :to="visitorsRegistration"
                v-if="!isWelcomePage">
                <BaseButton variant="primary" class="w-full justify-between">
                  <span>Visit</span>
                  <span class="inline">></span>
                </BaseButton>
              </NuxtLink>
            </NuxtLink>

            <div class="relative">
              <BaseButton @click="toggleParticipateMenu" id="header-participate-button" variant="secondary" class="w-full justify-between">
                <span>Participate</span>
                <span class="hidden md:inline">></span>
              </BaseButton>

              <div v-if="isParticipateOpen" class="absolute top-full mt-2 right-0 bg-white overflow-y-auto shadow-lg rounded-lg py-2 min-w-[150px] z-50 text-black">
                <NuxtLink  :to="designerRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black">
                  Designer
                </NuxtLink>

                <NuxtLink :to="modelRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black">
                  Model
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black">
                  Buyer
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black">
                  Stylist
                </NuxtLink>

                <NuxtLink :to="phototVideoRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black"> 
                  Photo / Video
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black">
                  Media
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black"> 
                  Influencer 
                </NuxtLink>

                <NuxtLink :to="visitorsRegistration" target="_blank" class="block px-4 py-1 hover:bg-gray-100 transition-colors text-black"> 
                  Other
                </NuxtLink>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LogoBlack from '@/components/icons/LogoBlack.vue';
import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon';
import XIcon from '@/components/icons/XIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import EventsBar from '@/components/EventsBar.vue';
import { hashtag, instagram, designerRegistration, visitorsRegistration, modelRegistration, phototVideoRegistration } from '~/constants/texts';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const isLinksMenuOpen = ref(false);
const isParticipateOpen = ref(false);
const navLinks = [
  // { name: 'HOME', href: '/', id: 'home' },
  { name: 'PRESENTATION', href: '/slides', id: 'slides' }
];

const scrollToSection = (href) => {
  if (!href) return;

  // Абсолютные ссылки открываем напрямую
  if (/^https?:\/\//i.test(href)) {
    window.location.href = href;
    return;
  }

  // Если ссылка начинается с "/", это переход на другую страницу
  if (href.startsWith('/')) {
    router.push(href);
    return;
  }
  
  // Иначе предполагаем, что это якорь на текущей странице
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Функция для переключения скролла
const toggleScroll = (disable) => {
  if (disable) {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none'; // Для мобильных устройств
  } else {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }
};

// Следим за изменением состояния меню
watch(isMenuOpen, (newValue) => {
  toggleScroll(newValue);
});

// Очищаем стили при размонтировании компонента
onUnmounted(() => {
  toggleScroll(false);
});

// Обработчик клика по пункту меню
const handleMobileNavClick = (href) => {
  isMenuOpen.value = false; // Закрываем мобильное меню
  
  // Если ссылка начинается с "/", это ссылка на другую страницу
  if (href.startsWith('/')) {
    router.push(href);
    return;
  }
  
  // Иначе это якорь на текущей странице
  scrollToSection(href);
};

// Закрываем меню при клике вне его
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.relative')) {
      isLinksMenuOpen.value = false;
    }
  });
});

const toggleParticipateMenu = () => {
  isParticipateOpen.value = !isParticipateOpen.value;
};

// Закрываем при клике вне
const closeOnClickOutside = (event) => {
  if (!event.target.closest('.relative') && !event.target.closest('#header-participate-button')) {
    isParticipateOpen.value = false;
  }
};

// Закрываем при скролле
const closeOnScroll = () => {
  isParticipateOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside);
  window.addEventListener('scroll', closeOnScroll);
});

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside);
  window.removeEventListener('scroll', closeOnScroll);
});

// Обработчик клика по хэштегу
const handleHashtagClick = () => {
  // Проверяем наличие слайдера на странице
  const sliderElement = document.querySelector('.image-carousel-container');
  
  if (sliderElement) {
    // Если слайдер найден, прокручиваем к нему
    sliderElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // Если слайдера нет, переходим по внешней ссылке
    window.open(hashtag[1], '_blank');
  }
};

// Check if the current page is '/welcome'
const isWelcomePage = computed(() => {
  return route.path.includes('welcome');
});

// Check if the current page is a gallery page
const isGalleryPage = computed(() => {
  return route.path.includes('gallery');
});
</script>

<style>
/* Стили для TheHeader.vue */
</style>
