<template>
  <a
    href="#"
    class="cryptmail"
    :data-name="name"
    :data-domain="domain"
    :data-tld="tld"
    @click.prevent="openMailClient"
  >
    <slot />
  </a>
</template>

<style scoped>
.cryptmail::after {
  content: attr(data-name) '@' attr(data-domain) '.' attr(data-tld);
}
</style>

<script setup lang="ts">
type Props = {
  name: string
  domain: string
  tld: string
};

defineProps<Props>();

function openMailClient(event: MouseEvent) {
  const data = (event.target as HTMLAnchorElement).dataset;
  window.location.href = `mailto:${data.name}@${data.domain}.${data.tld}`;
}
</script>
