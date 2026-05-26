<template>
  <UiCard tag="section" class="app-widget">
    <header class="widget-header">
      <Icon name="ion:ios-game-controller-b" />
      {{ t('home.widget') }}
    </header>
    <hr class="widget-divider" />
    <AppWidgetGameShowcase />
  </UiCard>
</template>

<style scoped>
.app-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.widget-divider {
  width: 100%;
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--glass-border), transparent);
  margin: 0;
}
</style>

<script setup lang="ts">
const { t } = useI18n();
</script>
