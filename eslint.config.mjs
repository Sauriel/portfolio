import antfu from '@antfu/eslint-config';

export default antfu(
  {
    formatters: true,
    vue: true,
    ignores: ['backend/**', '**/*.md', '**/generated/**'],
  },
  {
    rules: {
      // Vue
      'vue/html-self-closing': 'off',
      'vue/block-order': [
        'error',
        {
          order: ['template', 'style', 'script'],
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/no-unused-refs': 'off',
      // Style
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'style/no-floating-decimal': 'off',
      'style/semi': ['error', 'always'],
      // TypeScript
      'ts/consistent-type-definitions': ['error', 'type'],
      // General
      'curly': ['error', 'all'],
      'jsonc/no-floating-decimal': 'off',
    },
  },
);
