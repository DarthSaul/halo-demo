<template>
  <RouterLink :to="`/places/${place.id}`" class="place-card">
    <div class="place-card-body">
      <div class="place-card-header">
        <h3 class="place-card-name">{{ place.name }}</h3>
        <FavoriteButton item-type="place" :item-id="place.id" />
      </div>
      <div class="place-card-meta">
        <span class="place-card-neighborhood">{{ place.neighborhood }}</span>
        <span v-if="place.price_level" class="place-card-price">
          {{ '$'.repeat(place.price_level) }}
        </span>
      </div>
      <p class="place-card-desc">{{ place.description }}</p>
      <div class="place-card-tags">
        <span v-for="tag in place.tags.slice(0, 3)" :key="tag" class="tag">
          {{ formatTag(tag) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Place } from '@/types'
import FavoriteButton from './FavoriteButton.vue'

defineProps<{
  place: Place
}>()

function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
</script>

<style scoped>
.place-card {
  display: block;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
}

.place-card:hover {
  box-shadow: var(--shadow-md);
  border-color: transparent;
  transform: translateY(-2px);
}

.place-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-sm);
}

.place-card-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  line-height: 1.3;
}

.place-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.place-card-price {
  color: var(--color-success);
  font-weight: 600;
}

.place-card-desc {
  margin-top: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.place-card-tags {
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
