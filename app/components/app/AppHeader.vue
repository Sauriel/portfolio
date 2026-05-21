<template>
  <UiCard tag="header" class="app-header">
    <h1>{{ t('header.h1') }} <em>{{ t('header.name') }}</em></h1>
    <p v-if="isHome" class="subline">
      {{ t('header.subline1') }} <br />{{ t('header.subline2') }}
    </p>
    <div v-if="isHome" class="chips">
      <UiChip icon="tabler:code">{{ t('header.tags.developer') }}</UiChip>
      <UiChip icon="ph:books-fill">{{ t('header.tags.writer') }}</UiChip>
      <UiChip icon="ion:ios-game-controller-b">{{ t('header.tags.gamer') }}</UiChip>
      <UiChip icon="iconoir:hexagon-dice">{{ t('header.tags.roleplayer') }}</UiChip>
      <UiChip icon="simple-icons:endeavouros">{{ t('header.tags.linuxUser') }}</UiChip>
      <UiChip icon="fa7-brands:empire">{{ t('header.tags.starWarsFan') }}</UiChip>
      <UiChip icon="fluent:animal-dog-24-filled">{{ t('header.tags.dogDaddy') }}</UiChip>
    </div>
    <hr v-if="isHome" class="fade-out-divider" />
    <article v-if="isHome" class="whoami">
      <header>$ whoami</header>
      <p>
        {{ t('header.whoami') }}<span class="cursor"></span>
      </p>
    </article>
    <AppHeaderActions class="actions" />
  </UiCard>
</template>

<style scoped>
.app-header {
  background-image: url('~/assets/images/header-space.webp');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  background-blend-mode: v-bind(blendMode);
}

.app-header h1 {
  font-family: 'Cormorant SC', serif;
  font-size: 3rem;
  line-height: 1;
}

.app-header h1 em {
  font-family: 'Story Script', cursive;
  font-weight: 700;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-blue));
  background-clip: text;
  color: transparent;
  padding-right: 0.5ch;
  font-size: 1.15em;
}

.subline {
  font-family: 'Cormorant Garamond', serif;
  color: var(--text-secondary);
  font-size: 1.5rem;
  margin: 0;
}

.chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.fade-out-divider {
  margin-top: 3rem;
  width: 100%;
  border: none;
  height: 1px;
  background: linear-gradient(to right, var(--glass-border), transparent);
}

.whoami {
  font-family: 'Victor Mono', monospace;
  color: var(--text-secondary);
}

.whoami header {
  font-weight: 700;
  color: var(--code-string);
}

.whoami p {
  margin: 0.1rem 0 0;
}

.cursor {
  display: inline-block;
  width: 0.7ch;
  height: 1.25em;
  background-color: var(--text-secondary);
  margin-left: 1ch;
  animation: blink 2s step-end infinite;
  position: relative;
  top: 0.2em;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>

<script setup lang="ts">
const route = useRoute();
const darkModeStore = useDarkModeStore();
const { isDarkMode } = storeToRefs(darkModeStore);
const { t } = useI18n();

const isHome = computed(() => route.name === 'index');

const blendMode = computed<'normal' | 'lighten'>(() => isDarkMode.value ? 'normal' : 'lighten');
</script>
