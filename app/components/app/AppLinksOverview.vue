<template>
  <UiCard
    tag="section"
    title="Links"
    icon="mynaui:link"
    link-text="View all links"
    link-href="/links"
  >
    <div class="link-list">
      <LinkEntry v-for="link in links" :key="link.href" :link="link" />
    </div>
  </UiCard>
</template>

<style scoped>
.link-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 1rem;
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .link-list {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup lang="ts">
import type { LinkOverview } from '~/types/links';
import LinkEntry from '../links/LinkEntry.vue';

const links: LinkOverview[] = [
  {
    title: 'awesome-lists',
    href: 'https://github.com/sindresorhus/awesome',
    icon: 'mdi:github',
    description: 'A collection of awesome lists on various topics.',
    categories: ['resources', 'collections'],
  },
  {
    title: 'awesome-lists',
    href: 'https://github.com/sindresorhus/awesome2',
    icon: 'mdi:github',
    description: 'A collection of awesome lists on various topics.',
    categories: ['resources', 'collections'],
  },
  {
    title: 'awesome-lists',
    href: 'https://github.com/sindresorhus/awesome3',
    icon: 'mdi:github',
    description: 'A collection of awesome lists on various topics.',
    categories: ['resources', 'collections'],
  },
  {
    title: 'awesome-lists',
    href: 'https://github.com/sindresorhus/awesome4',
    icon: 'mdi:github',
    description: 'A collection of awesome lists on various topics.',
    categories: ['resources', 'collections'],
  },
];
</script>
