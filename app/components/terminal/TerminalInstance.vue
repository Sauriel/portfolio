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
  background-color: v-bind(terminalBg);
}
</style>

<script setup lang="ts">
import '@xterm/xterm/css/xterm.css';

const darkModeStore = useDarkModeStore();
const { isDarkMode } = storeToRefs(darkModeStore);

const terminalRef = useTemplateRef('terminalRef');

const terminalBg = computed(() => (isDarkMode.value ? '#181c35' : '#fafafa'));

onMounted(startTerminal);
watch(terminalRef, startTerminal);

function startTerminal() {
  if (terminalRef.value) {
    useTerminal(terminalRef.value);
  }
}
</script>
