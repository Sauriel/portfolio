<template>
  <UiSimpleCard>
    <NuxtLink
      :to="link.href"
      target="_blank"
      class="link-entry"
    >
      <header>{{ link.title }}</header>
      <Icon class="icon" :name="link.icon" />
      <p>{{ link.description }}</p>
      <footer>
        {{ shortLink }}
      </footer>
    </NuxtLink>
  </UiSimpleCard>
</template>

<style scoped>
.link-entry {
  display: grid;
  grid-template-areas:
    'icon header'
    'icon description'
    'icon footer';
  grid-template-columns: auto 1fr;
  padding: 1rem;
  gap: 0.5rem 1rem;
}

.link-entry .icon {
  grid-area: icon;
  font-size: 3rem;
  color: var(--text-secondary);
}

.link-entry header {
  grid-area: header;
  font-weight: bold;
}

.link-entry p {
  grid-area: description;
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.link-entry footer {
  grid-area: footer;
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 1rem;
}
</style>

<script setup lang="ts">
import type { LinkOverview } from '~/types/links';

type Props = {
  link: LinkOverview
};

const { link } = defineProps<Props>();

const shortLink = computed<string>(() => {
  try {
    const url = new URL(link.href);
    return `${url.hostname}${url.pathname}`;
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (e) {
    return link.href;
  }
});
</script>
