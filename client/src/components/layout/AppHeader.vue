<template>
  <header class="app-header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-text">NB x Halo</span>
        <span class="logo-sub">LA Marathon Guide</span>
      </RouterLink>

      <nav class="nav-desktop">
        <RouterLink to="/favorites" class="nav-link">
          Favorites
        </RouterLink>
      </nav>

      <button class="nav-toggle" @click="mobileOpen = !mobileOpen" aria-label="Toggle navigation">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
    </div>

    <div v-if="mobileOpen" class="nav-mobile" @click="mobileOpen = false">
      <nav class="nav-mobile-inner">
        <RouterLink to="/" class="nav-mobile-link">Home</RouterLink>
        <RouterLink to="/favorites" class="nav-mobile-link">Favorites</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileOpen = ref(false)
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--color-secondary);
  color: #fff;
  z-index: 100;
  box-shadow: var(--shadow-md);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  flex-direction: column;
  color: #fff;
  text-decoration: none;
  line-height: 1.2;
}

.logo-text {
  font-size: var(--font-size-lg);
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo-sub {
  font-size: var(--font-size-xs);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-desktop {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #fff;
  border-bottom-color: var(--color-primary);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: var(--space-sm);
}

.nav-toggle-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}

.nav-mobile {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.nav-mobile-inner {
  background: var(--color-secondary);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.nav-mobile-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: var(--space-md);
  font-size: var(--font-size-lg);
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast);
}

.nav-mobile-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .nav-toggle {
    display: flex;
  }
}
</style>
