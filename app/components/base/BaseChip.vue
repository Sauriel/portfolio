<template>
  <span class="chip">
    <Icon v-if="icon" :name="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
type Props = {
  icon?: string;
};

const { icon } = defineProps<Props>();
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 1ch;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xs);
  background-color: var(--glass-bg);
  color: var(--text-secondary);
  font-size: 0.875rem;
  backdrop-filter: blur(var(--blur-amount));
  cursor: default;
  user-select: none;
}

.chip:hover {
  background-color: var(--glass-bg-strong);
  border-color: var(--glass-highlight);
  color: var(--text-primary);
}
</style>
