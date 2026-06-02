<template>
  <UiCard id="main" tag="main">
    <UiHeader>{{ t('stories.title') }}</UiHeader>
    <UiSimpleCard class="intro">{{ t('stories.intro') }}</UiSimpleCard>
    <div class="stories">
      <UiSimpleCard class="story-featured">
        <img src="@/assets/images/stories/grauer_regenbogen_cover.webp" :alt="t('stories.featured.title')" />
        <header>
          <h2>{{ t('stories.featured.title') }}</h2>
          <NuxtLink to="https://www.amazon.de/grauer-regenbogen-Isabelle-Schwarz/dp/B0GVGTJL1K" target="_blank" class="buy-link">{{ t('stories.featured.link') }} <Icon name="streamline-logos:amazon-logo-block" /></NuxtLink>
        </header>
        <div class="story-blurb">
          <p>{{ t('stories.featured.blurb') }}</p>
        </div>
      </UiSimpleCard>
      <StoriesCard v-for="story in stories" :key="story.path" :story="story" />
    </div>
  </UiCard>
</template>

<style scoped>
#main {
  grid-column: 2 / -1;
  grid-row: 2 / -2;
  padding: 1rem;
}

.intro {
  padding: 1rem;
  margin-bottom: 1rem;
}

.stories {
  --gap: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap);
  container-type: inline-size;
  width: 100%;
}

.story-featured {
  --padding: 1rem;
  --title-height: 2rem;
  grid-column: span 2;
  padding: var(--padding);
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: var(--title-height) 1fr;
  grid-template-areas:
    'cover title'
    'cover blurb';
  gap: var(--padding);
}

.story-featured img {
  grid-area: cover;
  height: calc(((100cqw - (var(--gap) * 2)) / 3) - (2 * var(--padding)));
}

.story-featured header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: title;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--glass-border);
}

.story-featured header h2 {
  font-family: 'Cormorant Unicase', serif;
}

.buy-link {
  display: flex;
  align-items: center;
  gap: 1ch;
}

.story-blurb {
  grid-area: blurb;
  overflow: auto;
  height: calc(((100cqw - (var(--gap) * 2)) / 3) - (3 * var(--padding)) - var(--title-height));
}

.story-blurb p:first-child {
  margin-top: 0;
}

.story-blurb p:last-child {
  margin-bottom: 0;
}
</style>

<script setup lang="ts">
// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
const { t } = useI18n();

const { data: navigation } = await useAsyncData(() => queryCollectionNavigation('stories', ['stem']));
const stories = computed(() => navigation.value?.at(0)?.children ?? []);
</script>
