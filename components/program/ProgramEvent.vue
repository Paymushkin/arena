<template>
  <div class="flex flex-col md:flex-row items-center xl:gap-[120px] md:gap-[60px] gap-[30px] border border-black p-4 2xl:py-7 md:py-5">
    <div class="flex flex-col xl:w-[500px] md:w-[350px] w-full shrink-0 md:pl-[30px] md:gap-4 gap-3 text-black">
      <h4 v-html="time" class="text-base xl:text-2xl md:text-xl break-words text-black"></h4>
      <p v-if="place" v-html="place" class="text-black-70 text-sm md:text-base break-words"></p>
    </div>
    
    <div class="grow flex flex-col md:gap-4 gap-3 xl:pr-[60px] md:pr-[30px] pr-4">
      <p v-html="description" class="text-base xl:text-2xl md:text-xl break-words text-black"></p>
      <p v-html="details" v-if="details" class="md:text-lg text-sm text-black-70 break-words"></p>
      <NuxtLink v-if="buttonText" :to="buttonLink" target="_blank" class="hover:opacity-80 transition-opacity duration-300">
        <BaseButton variant="primary">{{ buttonText }}</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

defineProps({
  time: {
    type: String,
    required: true
  },
  place: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: ''
  },
  buttonLink: {
    type: String,
    default: ''
  }
})
</script>

<style>
.programm-link {
  color: #000;
  text-decoration: underline;
}
</style>

