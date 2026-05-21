<template>
  <ClientOnly>
    <div id="terminal" ref="terminalRef"></div>
  </ClientOnly>
</template>

<style scoped>
/* ToDo: Add style content */
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
