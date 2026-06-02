<template>
  <UiSimpleCard class="story-toc">
    <header>{{ title }}</header>
    <p>{{ blurb }}</p>
    <NuxtLink v-if="firstChapter" :to="firstChapter.path">{{ t('stories.stories.read_more') }}</NuxtLink>
  </UiSimpleCard>
</template>

<style scoped>
.story-toc {
  padding: 1rem;
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
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
  overflow-y: auto;
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

const { locale, t } = useI18n();

const language = computed<'en' | 'de'>(() => locale.value);

const firstChapter = computed(() => story.children?.find(child => child.title.toLocaleLowerCase() === language.value)?.children?.toSorted((a, b) => {
  const indexA = Number.parseInt(a.stem?.split('/').pop()?.split('.')[0] ?? '-1');
  const indexB = Number.parseInt(b.stem?.split('/').pop()?.split('.')[0] ?? '-1');
  return indexA - indexB;
})?.at(0) ?? null);

const titleKey = computed(() => story.title.toLowerCase());

const title = computed(() => t(`stories.stories.${titleKey.value}.title`));
const blurb = computed(() => t(`stories.stories.${titleKey.value}.blurb`));
</script>
