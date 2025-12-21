<template>
  <div class="w-full max-w-full">
    <AppSeo
      title="The Leads Arena - Платформа для генерации и управления лидами"
      description="The Leads Arena - современная платформа для эффективной генерации, управления и анализа лидов. Инструменты для роста вашего бизнеса."
      keywords="лиды, генерация лидов, управление лидами, CRM, маркетинг, бизнес, продажи, лидогенерация"
    />

    <!-- Hero Section -->
    <HeroSection id="hero-section" key="hero-section" class="mb-[56px] md:mb-[76px]" />
    <!-- Hero Section -->

    <!-- Statistics Section -->
    <ClientOnly>
      <StatisticsSection id="statistics" key="statistics-section" class="mb-[56px] md:mb-[76px]" />
    </ClientOnly>

    <!-- Canva Section -->
    <ClientOnly>
      <CanvaSection id="canva" key="canva-section" class="mb-[56px] md:mb-[76px]" />
    </ClientOnly>

    <!-- Arena Section -->
    <ClientOnly>
      <ArenaSection id="arena" key="arena-section" class="mb-[56px] md:mb-[76px]" />
    </ClientOnly>

    <!-- FAQ Section -->
    <FaqSectionDynamic id="faq" key="faq-section" class="mb-[56px] md:mb-[76px]" />
  </div>
</template>

<script setup lang="ts">
import StatisticsSection from '~/components/StatisticsSection.vue'
import FaqSectionDynamic from '~/components/FaqSectionDynamic.vue'
import ArenaSection from '~/components/ArenaSection.vue'
import CanvaSection from '~/components/CanvaSection.vue'

definePageMeta({
  layout: 'default'
})
</script>
