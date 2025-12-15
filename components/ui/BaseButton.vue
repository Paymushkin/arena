<template>
  <button
    :type="type"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
})

const attrs = useAttrs()

const buttonClasses = computed(() => [
  'flex items-center gap-2 rounded-3xl transition-colors',
  props.size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-6 py-2.5 text-sm',
  props.variant === 'primary'
    ? 'bg-black text-white hover:bg-black/90'
    : 'border border-black text-black hover:bg-gray-100',
  attrs.class,
])
</script>

