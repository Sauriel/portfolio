<template>
  <div class="default-layout">
    <NuxtRouteAnnouncer />
    <AppHeader class="header" />
    <AppNavbar class="nav" />
    <AppWidget class="widget" />
    <slot />
    <AppFooter class="footer" />
  </div>
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
.default-layout {
  grid-area: layout;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr repeat(4, auto);
  /* grid-template-areas:
    "nav      header   header   header   header   header"
    "nav      main     main     main     main     main"
    "widget   main     main     main     main     main"
    "main     main     main     main     main     main"
    "main     main     main     main     main     main"
    "footer   footer   footer   footer   footer   footer"; */
  gap: 1rem;
}

.nav {
  /* grid-area: nav; */
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.header {
  /* grid-area: header; */
  grid-column: 2 / -1;
  grid-row: 1 / 2;
}

.widget {
  /* grid-area: widget; */
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.footer {
  /* grid-area: footer; */
  grid-column: 1 / -1;
  grid-row: 6 / -1;
}
</style>
