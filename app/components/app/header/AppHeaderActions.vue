<template>
  <div class="actions">
    <button
      type="button"
      class="action-btn"
      @click="enableSearch = !enableSearch"
    >
      <Icon name="ci:search-magnifying-glass" />
    </button>
    <div class="search-input" :class="{ hidden: !enableSearch }">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <button type="button" class="action-btn" @click="darkMode = !darkMode">
      <Transition name="slide">
        <Icon v-if="darkMode" name="ri:moon-line" />
        <Icon v-else name="ri:sun-line" />
      </Transition>
    </button>
    <button type="button" class="action-btn" @click="openRandomPage">
      <Icon name="game-icons:card-random" />
    </button>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref<boolean>(true);
const enableSearch = ref<boolean>(false);
const searchQuery = ref<string>("");

function openRandomPage() {
  // Implement logic to open a random page
  alert("Random page feature is not implemented yet.");
}
</script>

<style scoped>
.actions {
  display: flex;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-small);
  overflow: hidden;
}

.action-btn {
  display: grid;
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

.search-input {
  width: 200px;
  transition: width var(--transition-normal);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.search-input.hidden {
  width: 0;
}

.search-input input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
}

.search-input input:focus {
  outline: none;
}
</style>
