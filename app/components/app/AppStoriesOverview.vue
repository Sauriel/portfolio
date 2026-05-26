<template>
  <UiCard
    tag="section"
    :title="t('home.stories.title')"
    icon="ph:books-fill"
    :link-text="t('home.stories.link')"
    link-href="/stories"
  >
    <div class="story-list">
      <StoriesEntry
        v-for="story in stories"
        :key="story.name"
        class="story-list-item"
        :info="story"
      />
    </div>
  </UiCard>
</template>

<style scoped>
.story-list {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.story-list-item:not(:last-child) {
  border-bottom: 1px solid var(--glass-border);
}
</style>

<script setup lang="ts">
import type { StoryOverviewEntry } from '~/types/stories';

const { t } = useI18n();

const stories: StoryOverviewEntry[] = [
  {
    icon: 'lucide:file-text',
    name: 'Der letzte Algorithmus',
    description: 'In einer Welt, in der Maschinen Gedanken lesen, war ein fehlerhafter Algorithmus ihre letzte ...',
    tags: ['Sci-Fi'],
    publishedAt: new Date('2024-05-12T12:00:00Z'),
  },
  {
    icon: 'lucide:file-text',
    name: 'Die verlorenen Erinnerungen',
    description: 'Ein Mann erwacht ohne Erinnerungen und begibt sich auf eine Reise, um seine Vergangenheit zu ...',
    tags: ['Mystery', 'Thriller'],
    publishedAt: new Date('2024-06-01T15:30:00Z'),
  },
  {
    icon: 'lucide:file-text',
    name: 'Die letzte Melodie',
    description: 'In einer Welt, in der Musik verboten ist, entdeckt ein junger Musiker eine verbotene Melodie, die ...',
    tags: ['Drama', 'Musik'],
    publishedAt: new Date('2024-06-10T18:45:00Z'),
  },
];
</script>
