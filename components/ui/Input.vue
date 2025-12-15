<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      >

      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
    </div>

    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
  hint: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = `input-${Math.random().toString(36).substring(7)}`
const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const slots = useSlots()

const inputClasses = computed(() => {
  const base = 'w-full px-4 py-3 border rounded-lg outline-none transition'
  const focus = 'focus:ring-2 focus:ring-black focus:border-transparent'
  const errorClass = props.error ? 'border-red-500' : 'border-gray-300'
  const disabledClass = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  const iconPadding = slots.icon ? 'pl-10' : ''

  return `${base} ${focus} ${errorClass} ${disabledClass} ${iconPadding}`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script>

