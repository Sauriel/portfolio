<template>
  <component :is="tag" class="card">
    <header v-if="title" class="card-header">
      <Icon v-if="icon" :name="icon" class="icon" />
      <strong>
        {{ title }}
      </strong>
      <NuxtLink v-if="linkText && linkHref" :to="linkHref" class="card-link">
        {{ linkText }}
        <Icon name="ion:md-arrow-round-forward" />
      </NuxtLink>
    </header>
    <slot />
  </component>
</template>

<style scoped>
.card {
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  backdrop-filter: blur(var(--blur-amount));
  box-shadow: 0 8px 32px var(--shadow-dark);
  border-radius: var(--radius-medium);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1ch;
  padding: 1rem;
  border-bottom: 1px solid var(--glass-border);
  border-top-left-radius: var(--radius-medium);
  border-top-right-radius: var(--radius-medium);
  background-color: var(--glass-bg);
}

.card-header .icon {
  font-size: 1.5rem;
}

.card-link {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5ch;
}
</style>

<script setup lang="ts">
import type { RoutePaths } from '~/types/nuxt';

type Props = {
  tag?: 'header' | 'main' | 'footer' | 'section' | 'article' | 'div' | 'aside'
};

type CardHeaderProps = {
  title?: string
  icon?: string
  linkText?: never
  linkHref?: never
};

type MandatoryCardHeaderProps = {
  title: string
  icon: string
  linkText: string
  linkHref: RoutePaths
};

const { tag = 'div', title, icon, linkText, linkHref } = defineProps<
  Props & (CardHeaderProps | MandatoryCardHeaderProps)
>();
// const emit = defineEmits<Emits>();
</script>
