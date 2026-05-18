<template>
  <div class="actions">
    <button type="button" class="action-btn">
      <Icon name="ci:search-magnifying-glass" />
    </button>
    <button type="button" class="action-btn" @click="darkMode = !darkMode">
      <Transition name="slide">
        <Icon v-if="darkMode" name="ri:moon-line" />
        <Icon v-else name="ri:sun-line" />
      </Transition>
    </button>
    <button type="button" class="action-btn">
      <Icon name="material-symbols:menu-rounded" />
    </button>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref<boolean>(true);
</script>

<style scoped>
.actions {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-small);
  overflow: hidden;
}

.action-btn {
  display: inline-grid;
  grid-template-areas: "icon";
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  width: 2.5rem;
  height: 2rem;
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.action-btn:hover {
  background-color: var(--bg-elevated);
}

.action-btn > .iconify {
  grid-area: icon;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
