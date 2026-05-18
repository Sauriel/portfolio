<template>
  <main class="main">
    <AppCodeOverview class="code" />
    <AppStoriesOverview class="stories" />
  </main>
</template>

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

<style scoped>
.main {
  display: grid;
  grid-column: 2 / 7;
  grid-row: 2 / 4;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

.code {
  grid-column: 1 / 4;
  grid-row: 1 / -1;
}

.stories {
  grid-column: 4 / 6;
  grid-row: 1 / -1;
}
</style>
