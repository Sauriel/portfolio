<template>
  <ClientOnly>
    <div id="terminal" ref="terminalRef" class="terminal-instance"></div>
  </ClientOnly>
</template>

<style scoped>
.terminal-instance {
  border-bottom-left-radius: var(--radius-medium);
  border-bottom-right-radius: var(--radius-medium);
  padding: 1rem;
  overflow: hidden;
  background-color: #181c35;
}
</style>

<script setup lang="ts">
import '@xterm/xterm/css/xterm.css';

const terminalRef = useTemplateRef('terminalRef');

onMounted(startTerminal);
watch(terminalRef, startTerminal);

function startTerminal() {
  if (terminalRef.value) {
    useTerminal(terminalRef.value);
  }
}
</script>
