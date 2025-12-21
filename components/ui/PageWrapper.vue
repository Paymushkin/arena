<template>
  <main
    class="container-custom py-16"
    v-bind="$attrs"
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageWrapper'
})
</script>




