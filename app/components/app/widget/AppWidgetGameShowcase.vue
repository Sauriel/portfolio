<template>
  <section class="games-showcase">
    <AppWidgetGameCard
      :game="game1"
      :focused="focusedGame === 'game1'"
      @select="() => setFocused('game1')"
    />
    <AppWidgetGameCard
      :game="game2"
      :focused="focusedGame === 'game2'"
      @select="() => setFocused('game2')"
    />
  </section>
</template>

<style scoped>
.games-showcase {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 144px;
  transition: height var(--transition-normal);
  overflow: hidden;
}

.games-showcase::v-deep(.game-card:first-child.focused) {
  margin-left: 0.5rem;
}

.games-showcase::v-deep(.game-card:last-child.focused) {
  margin-right: 0.5rem;
}

.games-showcase:has(.game-card.focused) {
  height: 300px;
}

.games-showcase::v-deep(.game-card.focused) {
  z-index: 2;
}

.games-showcase:has(.game-card.focused)::v-deep(.game-card:not(.focused)) {
  width: 0;
  opacity: 0;
  z-index: -1;
}
</style>

<script setup lang="ts">
import type { GameShowcase } from '~/types/games';

type Game = 'game1' | 'game2';

const focusedGame = ref<Game | null>(null);

const game1: GameShowcase = {
  name: 'Star Wars: The Old Republic',
  cover: '/images/games/swtor.webp',
};

const game2: GameShowcase = {
  name: 'Minecraft',
  cover: '/images/games/minecraft.webp',
};

function setFocused(game: Game) {
  if (focusedGame.value === game) {
    focusedGame.value = null;
  } else {
    focusedGame.value = game;
  }
}
</script>
