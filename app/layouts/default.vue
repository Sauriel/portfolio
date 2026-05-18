<template>
  <div class="default-layout">
    <NuxtRouteAnnouncer />
    <BaseCard tag="header" class="header"> Header </BaseCard>
    <BaseCard tag="aside" class="nav"> Navigation </BaseCard>
    <BaseCard tag="section" class="widget"> Widget </BaseCard>
    <slot />
    <BaseCard tag="section" class="links"> Links </BaseCard>
    <BaseCard tag="section" class="terminal"> Terminal </BaseCard>
    <BaseCard tag="section" class="news"> News </BaseCard>
    <BaseCard tag="footer" class="footer"> Footer </BaseCard>
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
    "terminal terminal terminal news     news     news"
    "footer   footer   footer   footer   footer   footer";
  gap: 1rem;
}

.nav {
  grid-area: nav;
}

.header {
  grid-area: header;
  height: 450px;
}

.widget {
  grid-area: widget;
  height: 150px;
}

.links {
  grid-area: links;
  height: 250px;
}

.terminal {
  grid-area: terminal;
}

.news {
  grid-area: news;
}

.footer {
  grid-area: footer;
}
</style>
