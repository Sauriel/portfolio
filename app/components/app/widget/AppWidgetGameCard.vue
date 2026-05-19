<template>
  <article class="game-card" :class="{ focused }" @click="() => emit('select')">
  </article>
</template>

<style scoped>
.game-card {
  border-radius: var(--radius-small);
  box-shadow: 0 2px 4px var(--shadow-dark);
  width: 100%;
  aspect-ratio: 2 / 3;
  background-image: v-bind(cover);
  background-size: cover;
  background-position: center;
  outline: 1px outset var(--glass-border);
  outline-color: rgba(0, 0, 0, 0.75);
  outline-offset: -1px;
  cursor: pointer;
  transition: all var(--transition-normal);
}
</style>

<script setup lang="ts">
import type { GameShowcase } from '~/types/games';

type Props = {
  game: GameShowcase
  focused: boolean
};

type Emits = {
  (e: 'select'): void
};

const { game, focused } = defineProps<Props>();
const emit = defineEmits<Emits>();

const cover = computed<string>(() => `url(${game.cover})`);
</script>
