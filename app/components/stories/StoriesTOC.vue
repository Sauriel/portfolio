<template>
  <UiCard tag="aside" class="story-toc">
    <header>{{ story.title }}</header>
    <ol>
      <li v-for="chapter in chapters" :key="chapter.path">
        <NuxtLink :to="chapter.path">{{ chapter.title }}</NuxtLink>
      </li>
    </ol>
  </UiCard>
</template>

<style scoped>
.story-toc {
  padding: 1rem;
}

.story-toc header {
  font-weight: bold;
  font-family: 'Cormorant Unicase', serif;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--glass-border);
}

.story-toc ol {
  margin: 0;
}
</style>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

type Props = {
  story: ContentNavigationItem
};

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const { story } = defineProps<Props>();
// const emit = defineEmits<Emits>();
const { locale } = useI18n();

const language = computed<'en' | 'de'>(() => locale.value);

const chapters = computed(() => story.children?.find(child => child.title.toLocaleLowerCase() === language.value)?.children?.toSorted((a, b) => {
  const indexA = Number.parseInt(a.stem?.split('/').pop()?.split('.')[0] ?? '-1');
  const indexB = Number.parseInt(b.stem?.split('/').pop()?.split('.')[0] ?? '-1');
  return indexA - indexB;
}) ?? []);
</script>
