<template>
  <div class="default-layout">
    <NuxtRouteAnnouncer />
    <AppHeader class="header" />
    <AppNavbar class="nav" />
    <slot />
    <AppFooter class="footer" />
  </div>
</template>

<style scoped>
.default-layout {
  grid-area: layout;
  display: grid;
  grid-template-columns: minmax(220px, 1fr) repeat(4, 1fr) minmax(220px, 1fr);
  grid-template-rows: repeat(6, auto);
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

.footer {
  /* grid-area: footer; */
  grid-column: 1 / -1;
  grid-row: 6 / -1;
}

@media screen and (max-width: 768px) {
  .default-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .header {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .nav {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  }

  .widget {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }

  .footer {
    grid-column: 1 / -1;
    grid-row: 5 / 6;
  }
}
</style>

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
