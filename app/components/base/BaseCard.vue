<template>
  <component :is="tag" class="card">
    <slot />
  </component>
</template>

<script setup lang="ts">
type Props = {
  tag: "header" | "main" | "footer" | "section" | "article" | "div" | "aside";
};

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const { tag } = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>

<style scoped>
.card {
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  backdrop-filter: blur(var(--blur-amount));
  box-shadow: 0 8px 32px var(--shadow-dark);
  border-radius: var(--radius-medium);
  padding: 1rem;
}
</style>
