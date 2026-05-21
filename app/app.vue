<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 1200px 1fr;
  grid-template-areas: '. layout .';
  padding: 1rem 0;
  min-height: 100vh;
}

@media screen and (max-width: 1280px) {
  .app {
    grid-template-columns: 1fr;
    grid-template-areas: 'layout';
    padding: 8px;
  }
}
</style>

<script setup lang="ts">
const darkModeStore = useDarkModeStore();
const { isDarkMode } = storeToRefs(darkModeStore);
const { t } = useI18n();

useHead({
  title: () => t('app.title'),
  meta: [
    { name: 'description', content: 'Sauriel\'s personal portfolio website showcasing projects, skills, and contact information.' },
    { name: 'keywords', content: 'Sauriel, portfolio, projects, skills, contact' },
    { name: 'author', content: 'Sauriel' },
  ],
  htmlAttrs: {
    lang: 'en',
    class: () => isDarkMode.value ? 'dark-mode' : 'light-mode',
  },
});
</script>
