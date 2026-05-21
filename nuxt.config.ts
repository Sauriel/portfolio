// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    // '@nuxt/hints',
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
});
