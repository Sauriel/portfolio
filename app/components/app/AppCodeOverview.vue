<template>
  <UiCard
    tag="section"
    title="Code"
    icon="tabler:code"
    link-text="View all projects"
    link-href="/code"
  >
    <article class="code-overview">
      <header class="file-header">
        <Icon :name="fileIcon" />
        {{ selectedFile.name }}
      </header>
      <CodeEditor :code="selectedFile" theme="vs-dark-custom" />
      <footer class="file-footer">
        <div class="stars">
          <Icon name="tabler:star" />
          42
        </div>
        <div class="forks">
          <Icon name="tabler:git-branch" />
          forks 17
        </div>
        <div class="language">
          <Icon :name="fileIcon" />
          {{ codeLanguage }}
        </div>
        <div class="updated">Updated: 2 days ago</div>
      </footer>
    </article>
  </UiCard>
</template>

<style scoped>
.code-overview {
  display: grid;
  grid-template-rows: 2.5rem 1fr 2.5rem;
  flex-grow: 1;
  max-height: 600px;
}

.file-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--glass-border);
  background-color: #0b102099;
}

.file-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.5rem 2rem;
  border-top: 1px solid var(--glass-border);
  background-color: #0b102099;
  color: var(--text-secondary);
  border-bottom-left-radius: var(--radius-medium);
  border-bottom-right-radius: var(--radius-medium);
  font-size: 0.75rem;
}

.file-footer .iconify {
  font-size: 1rem;
}

.stars,
.forks,
.language {
  display: flex;
  align-items: center;
  gap: 1ch;
}
</style>

<script setup lang="ts">
import type { CodeFile } from '~/types/code';
import { utilityTypes } from '~/data/code';

const selectedFile = ref<CodeFile>(utilityTypes);

const fileIcon = computed(() => {
  switch (selectedFile.value.type) {
    case 'typescript':
      return 'vscode-icons:file-type-typescript-official';
    case 'javascript':
      return 'vscode-icons:file-type-js-official';
    case 'html':
      return 'vscode-icons:file-type-html';
    case 'css':
      return 'vscode-icons:file-type-css';
    default:
      return 'vscode-icons:default-file';
  }
});

const codeLanguage = computed(() => {
  switch (selectedFile.value.type) {
    case 'typescript':
      return 'TypeScript';
    case 'javascript':
      return 'JavaScript';
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    default:
      return selectedFile.value.type.toUpperCase();
  }
});
</script>
