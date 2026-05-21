<template>
  <div :id="id" ref="codeEditorRef" class="code-editor"></div>
</template>

<script setup lang="ts">
import type { CodeFile } from '~/types/code';

type Props = {
  code: CodeFile
  theme?: 'vs-dark-custom' | 'vs-dark' | 'vs-light' | 'vs-light-custom'
};

const { code, theme = 'vs-dark' } = defineProps<Props>();

const baseId = useId();
const codeEditorRef = useTemplateRef('codeEditorRef');

const editorInstance = ref<any | null>(null);

const id = computed(() => `code-editor-${baseId}`);

onMounted(async () => {
  if (!import.meta.client || !codeEditorRef.value) {
    return;
  }
  const monacoInstance = await import('monaco-editor');

  const self = window.self;

  self.MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      try {
        const getWorkerModule = (moduleUrl: string, label: string) => {
        // @ts-expect-error - MonacoEnvironment is not typed to support module workers
          return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
            name: label,
            type: 'module',
          });
        };

        switch (label) {
          case 'json':
            return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
          case 'css':
          case 'scss':
          case 'less':
            return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
          case 'html':
          case 'handlebars':
          case 'razor':
            return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
          case 'typescript':
          case 'javascript':
            return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
          default:
            return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
        }
      // eslint-disable-next-line unused-imports/no-unused-vars
      } catch (error) {
        //  return dummy worker in case of error (e.g. running in an environment that doesn't support workers)
        return new Worker(URL.createObjectURL(new Blob([`
          self.onmessage = function() {
            // No-op
          };
        `], { type: 'application/javascript' })), { type: 'module' });
      }
    },
  };

  // https://github.com/microsoft/monaco-editor/blob/5f59e47ae69abd1fc99d57267486384dc44ea8ca/website/src/website/data/playground-samples/customizing-the-appearence/exposed-colors/sample.js#L9
  monacoInstance.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.foreground': '#e6edf3',
      'editor.background': '#0b102073',
      'editorGutter.background': '#0b102073',
    },
  });
  monacoInstance.editor.defineTheme('vs-light-custom', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.foreground': '#383a42',
      'editor.background': '#fafafa73',
      'editorGutter.background': '#fafafa73',
    },
  });

  editorInstance.value = monacoInstance.editor.create(codeEditorRef.value, {
    value: code.content,
    language: code.type,
    theme,
  });
});

watch(() => theme, (newTheme) => {
  if (editorInstance.value) {
    editorInstance.value.updateOptions({ theme: newTheme });
  }
});
</script>
