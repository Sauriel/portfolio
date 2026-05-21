<template>
  <UiCard id="main" tag="main">
    <LoremIpsum />
  </UiCard>
</template>

<style scoped>
#main {
  grid-column: 2 / -1;
  grid-row: 2 / -2;
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
