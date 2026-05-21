<template>
  <UiCard tag="aside" class="app-navbar" :class="{ sticky: !isHome }">
    <UiHexagon size="120px" color="var(--accent-purple)">
      <UiHexagon size="114px" color="var(--bg-primary)" class="logo">
        <UiLogo />
      </UiHexagon>
    </UiHexagon>
    <header class="app-navbar-header">
      <h2>Sauriel</h2>
      <span class="subline">Code. Stories. Curiosity.</span>
    </header>
    <nav class="app-navbar-nav">
      <NuxtLink to="/" class="nav-item">
        <Icon name="bi:house" />
        Home
      </NuxtLink>
      <NuxtLink to="/blog" class="nav-item">
        <Icon name="nrk:latest-news" />
        Blog
      </NuxtLink>
      <NuxtLink to="/code" class="nav-item">
        <Icon name="tabler:code" />
        Code
      </NuxtLink>
      <NuxtLink to="/stories" class="nav-item">
        <Icon name="ph:books-fill" />
        Stories
      </NuxtLink>
      <NuxtLink to="/links" class="nav-item">
        <Icon name="mynaui:link" />
        Links
      </NuxtLink>
      <NuxtLink to="/about" class="nav-item">
        <Icon name="tabler:user-hexagon" />
        About
      </NuxtLink>
    </nav>
    <footer class="app-navbar-footer">
      <NuxtLink
        to="https://github.com/Sauriel"
        aria-label="GitHub Profile"
        target="_blank"
        class="footer-link"
      >
        <Icon name="mdi:github" />
      </NuxtLink>
      <NuxtLink
        to="https://discord.com/users/248765748858585088"
        aria-label="Discord Profile"
        target="_blank"
        class="footer-link"
      >
        <Icon name="ic:baseline-discord" />
      </NuxtLink>
      <NuxtLink to="mailto:contact@sauriel.net" aria-label="Email" class="footer-link">
        <Icon name="uil:envelope-alt" />
      </NuxtLink>
    </footer>
  </UiCard>
</template>

<style scoped>
.app-navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem 1rem;
  z-index: 99;
}

.app-navbar.sticky {
  position: sticky;
  top: 1rem;
}

.logo {
  padding: 1.25rem;
}

.app-navbar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-navbar-header h2 {
  text-align: center;
  font-size: 2.5rem;
}

.subline {
  color: var(--text-secondary);
}

.app-navbar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 2rem;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-small);
  border: 2px solid transparent;
  background: transparent;
  backdrop-filter: blur(0);
  transition: all var(--transition-normal);
}

.nav-item:hover,
.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: var(--text-primary);
  border-color: var(--glass-border);
  background: radial-gradient(circle, transparent 0%, var(--glow-purple) 140%);
  backdrop-filter: blur(var(--blur-amount));
  box-shadow:
    0 0 20px rgba(180, 200, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.app-navbar-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
}

.footer-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 2.5rem;
  transition: color var(--transition-normal);
}

.footer-link:hover {
  color: var(--accent-purple);
}
</style>

<script setup lang="ts">
const route = useRoute();

const isHome = computed(() => route.name === 'index');
</script>
