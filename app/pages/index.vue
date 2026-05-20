<template>
  <main id="main">
    <AppCodeOverview class="code" />
    <AppStoriesOverview class="stories" />
    <AppLinksOverview class="links" />
    <AppTerminal class="terminal" />
    <AppBlogOverview class="blog" />
  </main>
</template>

<style scoped>
#main {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 2 / 6;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

.code {
  grid-column: 2 / 5;
  grid-row: 1 / 3;
}

.stories {
  grid-column: 5 / 7;
  grid-row: 1 / 3;
}

.links {
  grid-column: 1 / -1;
  grid-row: 3 / 4;
}

.terminal {
  grid-column: 1 / 4;
  grid-row: 4 / 5;
}

.blog {
  grid-column: 4 / -1;
  grid-row: 4 / 5;
}

@media screen and (max-width: 768px) {
  .main {
    display: grid;
    grid-row: 4 / 5;
    grid-template-columns: subgrid;
    grid-template-rows: auto;
    gap: 1rem;
  }

  .blog {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .code {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  }

  .stories {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }

  .terminal {
    grid-column: 1 / -1;
    grid-row: 4 / 5;
  }

  .links {
    grid-column: 1 / -1;
    grid-row: 5 / 6;
  }
}
</style>

<script setup lang="ts">
// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>
