<template>
  <BaseCard tag="header" class="app-header">
    <h1>Hello, I'm <em>Sauriel</em></h1>
    <p class="subline">
      I weave code, write stories, create worlds, <br />and explore everything
      geeky.
    </p>
    <div class="chips">
      <BaseChip icon="tabler:code">Developer</BaseChip>
      <BaseChip icon="ph:books-fill">Writer</BaseChip>
      <BaseChip icon="ion:ios-game-controller-b">Gamer</BaseChip>
      <BaseChip icon="iconoir:hexagon-dice">Roleplayer</BaseChip>
      <BaseChip icon="simple-icons:endeavouros">Linux User</BaseChip>
      <BaseChip icon="fa7-brands:empire">Star Wars Fan</BaseChip>
      <BaseChip icon="fluent:animal-dog-24-filled">Dog Daddy</BaseChip>
    </div>
    <hr class="fade-out-divider" />
    <article class="whoami">
      <header>$ whoami</header>
      <p>
        nerdydev &mdash; overthinker &mdash; problem solver &mdash; lifelong
        learner &mdash; frontend evangelist<span class="cursor"></span>
      </p>
    </article>
    <AppHeaderActions class="actions" />
  </BaseCard>
</template>

<style scoped>
.app-header {
  background-image: url('~/assets/images/header-space.png');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.app-header h1 {
  font-family: 'Cormorant SC', serif;
  font-size: 3rem;
  line-height: 1;
}

.app-header h1 em {
  font-family: 'Story Script', cursive;
  font-weight: 700;
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-blue));
  background-clip: text;
  color: transparent;
  padding-right: 0.5ch;
  font-size: 1.15em;
}

.subline {
  font-family: 'Cormorant Garamond', serif;
  color: var(--text-secondary);
  font-size: 1.5rem;
  margin: 0;
}

.chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.fade-out-divider {
  margin-top: 3rem;
  width: 100%;
  border: none;
  height: 1px;
  background: linear-gradient(to right, var(--glass-border), transparent);
}

.whoami {
  font-family: 'Victor Mono', monospace;
  color: var(--text-secondary);
}

.whoami header {
  font-weight: 700;
  color: var(--code-string);
}

.whoami p {
  margin: 0.1rem 0 0;
}

.cursor {
  display: inline-block;
  width: 0.7ch;
  height: 1.25em;
  background-color: var(--text-secondary);
  margin-left: 1ch;
  animation: blink 2s step-end infinite;
  position: relative;
  top: 0.2em;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
