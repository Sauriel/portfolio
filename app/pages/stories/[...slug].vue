<template>
  <UiCard id="main" tag="main">
    <ContentRenderer v-if="page" :value="page" class="story-content" />
    <div v-else>Page not found</div>
  </UiCard>
  <StoriesTOC v-if="toc" id="toc" :story="toc" />
</template>

<style scoped>
#main {
  grid-column: 2 / -1;
  grid-row: 2 / -2;
}

#toc {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  position: sticky;
  top: calc(1rem + 273px + 1rem);
}

.story-content {
  padding: 1rem;
  font-size: 1.8rem;
  font-family: 'Cormorant Garamond', serif;
}

.story-content::v-deep(p) {
  text-align: justify;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.story-content::v-deep(h1),
.story-content::v-deep(h2),
.story-content::v-deep(h3),
.story-content::v-deep(h4),
.story-content::v-deep(h5),
.story-content::v-deep(h6) {
  font-family: 'Cormorant Unicase', serif;
  font-weight: bold;
}
</style>

<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('stories').path(route.path).first();
});

const { data: navigation } = await useAsyncData(() => queryCollectionNavigation('stories', ['stem']));
const toc = computed(() => navigation.value?.at(0)?.children?.find(child => route.path.includes(child.path)));
</script>
