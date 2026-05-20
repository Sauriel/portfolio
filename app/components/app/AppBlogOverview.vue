<template>
  <UiCard
    tag="section"
    title="Blog"
    icon="nrk:latest-news"
    link-text="View all blog posts"
    link-href="/blog"
  >
    <ol class="blog-list">
      <BlogOverviewEntry
        v-for="entry in blogLinks"
        :key="entry.title"
        :entry="entry"
        class="blog-list-item"
      />
    </ol>
  </UiCard>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  list-style: none;
  margin: 0;
}

.blog-list-item:not(:last-child) {
  border-bottom: 1px solid var(--glass-border);
}
</style>

<script setup lang="ts">
import type { BlogLink } from '~/types/blog';

const blogLinks: BlogLink[] = [
  {
    title: 'How I built my portfolio',
    icon: 'nrk:latest-news',
    color: 'purple',
    publishedAt: new Date('2024-06-01'),
  },
  {
    title: 'My experience with Vue.js',
    icon: 'nrk:latest-news',
    color: 'blue',
    publishedAt: new Date('2024-06-02'),
  },
  {
    title: 'Tips for frontend development',
    icon: 'nrk:latest-news',
    color: 'violet',
    publishedAt: new Date('2024-06-03'),
  },
  {
    title: 'Tips for frontend development',
    icon: 'nrk:latest-news',
    color: 'cyan',
    publishedAt: new Date('2024-06-04'),
  },
];
</script>
