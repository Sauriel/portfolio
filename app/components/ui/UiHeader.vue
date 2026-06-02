<template>
  <h1 class="ui-header">
    <slot />
  </h1>
</template>

<style scoped>
.ui-header {
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--glass-border);
}
</style>

<script setup lang="ts">
// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>
