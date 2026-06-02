import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    stories: defineCollection({
      type: 'page',
      source: 'stories/**/*.md',
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
});
