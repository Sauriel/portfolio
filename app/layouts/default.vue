<template>
  <div class="default-layout">
    <NuxtRouteAnnouncer />
    <AppHeader class="header" />
    <AppNavbar class="nav" />
    <AppWidget class="widget" />
    <slot />
    <AppLinksOverview class="links" />
    <AppTerminal class="terminal" />
    <AppBlogOverview class="blog" />
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
  grid-template-areas:
    "nav      header   header   header   header   header"
    "nav      main     main     main     main     main"
    "widget   main     main     main     main     main"
    "links    links    links    links    links    links"
    "terminal terminal terminal blog     blog     blog"
    "footer   footer   footer   footer   footer   footer";
  gap: 1rem;
}

.nav {
  grid-area: nav;
}

.header {
  grid-area: header;
}

.widget {
  grid-area: widget;
}

.links {
  grid-area: links;
}

.terminal {
  grid-area: terminal;
}

.blog {
  grid-area: blog;
}

.footer {
  grid-area: footer;
}
</style>
