<template>
  <UiCard
    tag="section"
    title="Terminal"
    icon="iconoir:terminal-tag"
  >
    <TerminalInstance class="terminal" />
  </UiCard>
</template>

<style scoped>
.terminal {
  border-bottom-left-radius: var(--radius-medium);
  border-bottom-right-radius: var(--radius-medium);
  overflow: hidden;
}
</style>
