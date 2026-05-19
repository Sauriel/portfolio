<template>
  <button type="button" class="ui-fancy-button" :class="{ active }">
    <slot />
  </button>
</template>

<style scoped>
.ui-fancy-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-small);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur-amount));
  box-shadow:
    0 4px 12px var(--shadow-dark),
    inset 0 1px 0 var(--glass-highlight);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.ui-fancy-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--glow-purple), transparent);
  transition: left var(--transition-slow);
}

.ui-fancy-button:hover {
  background: var(--glass-bg-strong);
  border-color: var(--accent-purple);
  box-shadow:
    0 6px 20px var(--shadow-dark),
    0 0 20px var(--glow-purple),
    inset 0 1px 0 var(--glass-highlight);
  transform: translateY(-2px);
}

.ui-fancy-button:hover::before {
  left: 100%;
}

.ui-fancy-button.active {
  background: var(--glass-bg-strong);
  border-color: var(--accent-violet);
  box-shadow:
    0 4px 16px var(--glow-purple),
    inset 0 1px 0 var(--glass-highlight);
}
</style>

<script setup lang="ts">
type Props = {
  active?: boolean
};

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const { active } = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>
