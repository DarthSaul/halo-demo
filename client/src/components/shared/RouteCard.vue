<template>
  <RouterLink :to="`/routes/${route.id}`" class="route-card">
    <div class="route-card-body">
      <div class="route-card-header">
        <h3 class="route-card-name">{{ route.name }}</h3>
        <FavoriteButton item-type="route" :item-id="route.id" />
      </div>
      <div class="route-card-meta">
        <span class="route-card-distance">{{ route.distance_miles }} mi</span>
        <span class="route-card-difficulty" :class="`difficulty--${route.difficulty}`">
          {{ route.difficulty }}
        </span>
        <span class="route-card-surface">{{ route.surface }}</span>
        <span class="route-card-neighborhood">{{ route.neighborhood }}</span>
      </div>
      <p class="route-card-desc">{{ route.description }}</p>
      <div class="route-card-tags">
        <span v-for="tag in route.tags.slice(0, 3)" :key="tag" class="tag">
          {{ formatTag(tag) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RunningRoute } from '@/types'
import FavoriteButton from './FavoriteButton.vue'

defineProps<{
  route: RunningRoute
}>()

function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
</script>

<style scoped>
.route-card {
  display: block;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
}

.route-card:hover {
  box-shadow: var(--shadow-md);
  border-color: transparent;
  transform: translateY(-2px);
}

.route-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-sm);
}

.route-card-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  line-height: 1.3;
}

.route-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: var(--font-size-sm);
}

.route-card-distance {
  font-weight: 600;
  color: var(--color-text);
}

.route-card-difficulty {
  padding: 2px var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty--easy {
  background: #d4edda;
  color: #155724;
}

.difficulty--moderate {
  background: #fff3cd;
  color: #856404;
}

.difficulty--hard {
  background: #f8d7da;
  color: #721c24;
}

.route-card-surface {
  color: var(--color-text-secondary);
}

.route-card-neighborhood {
  color: var(--color-text-secondary);
}

.route-card-desc {
  margin-top: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.route-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-md);
}

.tag {
  padding: 2px var(--space-sm);
  background: var(--color-bg-alt);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
