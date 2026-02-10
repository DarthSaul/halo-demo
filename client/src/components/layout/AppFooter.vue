<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">NB x Halo</span>
        <span class="footer-tagline">LA Marathon Weekend Guide</span>
      </div>
      <p class="footer-copy">&copy; {{ year }} New Balance x Halo. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: var(--color-secondary);
  color: rgba(255, 255, 255, 0.7);
  padding: var(--space-2xl) 0;
  margin-top: var(--space-3xl);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.footer-logo {
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: #fff;
}

.footer-tagline {
  font-size: var(--font-size-sm);
}

.footer-copy {
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
  .footer-brand {
    align-items: center;
  }
}
</style>
