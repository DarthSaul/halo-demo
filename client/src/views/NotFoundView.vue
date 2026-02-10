<template>
  <div class="not-found">
    <div class="container">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-text">Page not found. Looks like you took a wrong turn on the course.</p>
      <RouterLink to="/" class="home-btn">Back to Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: var(--space-3xl) 0;
}

.not-found-title {
  font-size: 6rem;
  font-weight: 800;
  color: var(--color-border);
  line-height: 1;
}

.not-found-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-top: var(--space-md);
}

.home-btn {
  display: inline-block;
  margin-top: var(--space-xl);
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  transition: background var(--transition-fast);
}

.home-btn:hover {
  background: var(--color-primary-dark);
  color: #fff;
}
</style>
