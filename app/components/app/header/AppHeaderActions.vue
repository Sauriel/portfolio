<template>
  <div class="actions">
    <button
      type="button"
      class="action-btn"
      aria-label="Toggle search"
      @click="enableSearch = !enableSearch"
    >
      <Icon name="ci:search-magnifying-glass" />
    </button>
    <div class="search-input" :class="{ hidden: !enableSearch }">
      <input v-model="searchQuery" type="text" placeholder="Search..." />
    </div>
    <button
      type="button"
      class="action-btn"
      aria-label="Toggle dark mode"
      @click="toggleDarkMode"
    >
      <Transition name="slide">
        <Icon v-if="isDarkMode" name="ri:moon-line" />
        <Icon v-else name="ri:sun-line" />
      </Transition>
    </button>
    <button
      type="button"
      class="action-btn"
      aria-label="Change language"
      @click="changeLanguage"
    >
      <Transition name="slide">
        <span v-if="language === 'en'">EN</span>
        <span v-else>DE</span>
      </Transition>
    </button>
  </div>
</template>

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
  grid-template-areas: 'icon';
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

<script setup lang="ts">
const darkModeStore = useDarkModeStore();
const { isDarkMode } = storeToRefs(darkModeStore);
const { toggleDarkMode } = darkModeStore;

const enableSearch = ref<boolean>(false);
const searchQuery = ref<string>('');
const language = ref<'en' | 'de'>('en');

function changeLanguage() {
  language.value = language.value === 'en' ? 'de' : 'en';
}
</script>
