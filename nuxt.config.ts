import type { LocaleObject } from '@nuxtjs/i18n';

const TRANSLATION_FILES: string[] = [
  'global',
  'header',
  'navbar',
  'home',
];

function getTranslationFileList(locale: LocaleObject<string>['code']): string[] {
  return TRANSLATION_FILES.map(name => `${locale}/${name}.json`);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    // '@nuxt/hints',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  ssr: true,

  css: ['./app/assets/styles/styles.css'],

  experimental: {
    typedPages: true,
  },

  fonts: {
    families: [
      { name: 'Open Sans', provider: 'google' },
      { name: 'Victor Mono', provider: 'google' },
      { name: 'Story Script', provider: 'google' },
      { name: 'Cormorant Garamond', provider: 'google' },
      { name: 'Cormorant Unicase', provider: 'google' },
      { name: 'Cormorant SC', provider: 'google' },
    ],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-GB', files: getTranslationFileList('en') },
      { code: 'de', language: 'de-DE', files: getTranslationFileList('de') },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
});
