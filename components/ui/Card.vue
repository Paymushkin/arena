<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="border-b border-gray-200 px-6 py-4">
      <slot name="header" />
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="border-t border-gray-200 px-6 py-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'md'
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg shadow-md overflow-hidden'
  const hoverClass = props.hover ? 'hover:shadow-lg transition-shadow duration-300' : ''
  return `${base} ${hoverClass}`
})

const bodyClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  return paddings[props.padding]
})
</script>

