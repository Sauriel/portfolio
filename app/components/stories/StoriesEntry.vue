<template>
  <article class="story-entry">
    <header>{{ info.name }}</header>
    <div class="icon">
      <Icon :name="info.icon" />
    </div>
    <p>{{ info.description }}</p>
    <footer>
      <div class="tags">
        <span v-for="tag in info.tags" :key="tag" class="story-tag">{{ tag }}</span>
      </div>
      <time :datetime="info.publishedAt.toISOString()">
        {{ publishedDate }}
      </time>
    </footer>
  </article>
</template>

<style scoped>
.story-entry {
  display: grid;
  grid-template-areas:
    'icon header'
    'icon description'
    'icon footer';
  padding: 1rem 0;
  gap: 0.5rem 1rem;
}

.story-entry .icon {
  grid-area: icon;
  background-color: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-small);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.story-entry header {
  grid-area: header;
  font-weight: bold;
  font-family: 'Cormorant Unicase', serif;
  font-size: 1.25rem;
}

.story-entry p {
  grid-area: description;
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-family: 'Cormorant Garamond', serif;
}

.story-entry footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 1rem;
}

.tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.story-tag {
  background-color: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xs);
  padding: 0.25rem 0.5rem;
}
</style>

<script setup lang="ts">
import type { StoryOverviewEntry } from '~/types/stories';

type Props = {
  info: StoryOverviewEntry
};

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const { info } = defineProps<Props>();
// const emit = defineEmits<Emits>();

const publishedDate = computed(() => {
  return info.publishedAt.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>
