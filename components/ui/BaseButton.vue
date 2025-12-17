<template>
  <button
    :type="type"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  type: 'button'
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

