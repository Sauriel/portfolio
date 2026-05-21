export const useDarkModeStore = defineStore('darkMode', () => {
  const isDarkMode = ref(true);

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }

  return { isDarkMode, toggleDarkMode };
});
