<template>
  <div class="ui-simple-card">
    <slot />
  </div>
</template>

<style scoped>
.ui-simple-card {
  background-color: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-small);
}
</style>
