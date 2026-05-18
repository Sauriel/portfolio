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
  grid-template-areas: ". layout .";
  margin: 1rem 0;
}
</style>
