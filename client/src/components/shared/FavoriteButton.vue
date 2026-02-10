<template>
  <button
    class="favorite-btn"
    :class="{ 'favorite-btn--active': isFav }"
    :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
    @click.stop.prevent="toggle"
  >
    <svg viewBox="0 0 24 24" class="heart-icon" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        :fill="isFav ? 'currentColor' : 'none'"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps<{
  itemType: 'place' | 'route'
  itemId: number
}>()

const store = useFavoritesStore()

const isFav = computed(() => store.isFavorite(props.itemType, props.itemId))

async function toggle() {
  await store.toggleFavorite(props.itemType, props.itemId)
}
</script>

<style scoped>
.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--color-text-light);
  transition: all var(--transition-fast);
}

.favorite-btn:hover {
  color: var(--color-favorite);
  background: rgba(233, 69, 96, 0.1);
}

.favorite-btn--active {
  color: var(--color-favorite);
}

.heart-icon {
  width: 20px;
  height: 20px;
}
</style>
