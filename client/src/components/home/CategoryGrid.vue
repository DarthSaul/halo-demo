<template>
  <section class="category-grid-section">
    <div class="container">
      <h2 class="section-title">Browse by Category</h2>
      <div class="category-grid">
        <RouterLink
          v-for="cat in CATEGORIES"
          :key="cat.slug"
          :to="`/category/${cat.slug}`"
          class="category-card"
        >
          <span class="category-icon">{{ cat.icon }}</span>
          <h3 class="category-name">{{ cat.name }}</h3>
          <p class="category-desc">{{ cat.description }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CATEGORIES } from '@/types'
</script>

<style scoped>
.category-grid-section {
  padding: var(--space-3xl) 0;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-xl);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
}

.category-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
}

.category-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.category-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
