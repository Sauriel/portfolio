<template>
  <UiCard
    tag="section"
    :title="t('home.terminal.title')"
    icon="iconoir:terminal-tag"
  >
    <TerminalInstance />
  </UiCard>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
