<template>
  <li>
    <a class="blog-entry" href="#">
      <UiSimpleCard class="icon">
        <Icon :name="entry.icon" />
      </UiSimpleCard>
      <span>{{ entry.title }}</span>
      <span class="published-date">{{ publishedDate }}</span>
    </a>
  </li>
</template>

<style scoped>
.blog-entry {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  width: auto;
  color: var(--text-primary);
}

.blog-entry:hover {
  color: var(--accent-purple);
}

.icon {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: v-bind(iconColor);
}

.published-date {
  margin-left: auto;
}
</style>

<script setup lang="ts">
import type { BlogLink } from '~/types/blog';

type Props = {
  entry: BlogLink
};

const { entry } = defineProps<Props>();

const iconColor = computed(() => {
  switch (entry.color) {
    case 'purple':
      return 'var(--accent-purple)';
    case 'blue':
      return 'var(--accent-blue)';
    case 'violet':
      return 'var(--accent-violet)';
    case 'cyan':
      return 'var(--accent-cyan)';
    default:
      return 'var(--text-secondary)';
  }
});

const publishedDate = computed(() => {
  return entry.publishedAt.toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
  });
});
</script>
