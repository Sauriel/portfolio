<template>
  <UiCard tag="footer" class="app-footer">
    <ClientOnly>
      <div class="app-footer-wrapper">
        <p class="footnote">
          &copy; {{ new Date().getFullYear() }} {{ hostname }} &mdash; Made  without coffee but too much curiosity.
        </p>
        <NuxtLink class="legal" to="/legal-notice">Legal Notice</NuxtLink>
      </div>
    </ClientOnly>
  </UiCard>
</template>

<style scoped>
.app-footer {
  overflow: hidden;
}

.app-footer-wrapper {
  display: grid;
  grid-template-areas: '. footnote legal';
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--glass-bg);
}

.footnote {
  grid-area: footnote;
  margin: 0;
}

.legal {
  grid-area: legal;
  color: var(--text-muted);
  text-decoration: none;
  justify-self: end;
  font-size: 0.75em;
}
</style>

<script setup lang="ts">
const hostname = computed<string>(() => {
  if (import.meta.client) {
    return window.location.hostname;
  }
  return 'sauriel.dev';
});
</script>
