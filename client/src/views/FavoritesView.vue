<template>
  <div class="favorites-view">
    <div class="container">
      <RouterLink to="/" class="back-link">&larr; Back to Home</RouterLink>
      <h1 class="page-title">Your Favorites</h1>
      <p class="page-subtitle">
        Your saved spots and routes for race weekend.
      </p>

      <div v-if="loading" class="loading">Loading your favorites...</div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="isEmpty" class="empty">
        <p class="empty-text">You haven't saved any favorites yet.</p>
        <p class="empty-hint">
          Browse the categories and tap the heart icon to save places and routes
          for your race weekend.
        </p>
        <RouterLink to="/" class="browse-btn">Browse Categories</RouterLink>
      </div>

      <template v-else>
        <section v-if="favPlaces.length > 0" class="favorites-section">
          <h2 class="section-title">Places</h2>
          <div class="results-grid">
            <PlaceCard v-for="place in favPlaces" :key="place.id" :place="place" />
          </div>
        </section>

        <section v-if="favRoutes.length > 0" class="favorites-section">
          <h2 class="section-title">Running Routes</h2>
          <div class="results-grid">
            <RouteCard v-for="route in favRoutes" :key="route.id" :route="route" />
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import type { Place, RunningRoute } from '@/types'
import PlaceCard from '@/components/shared/PlaceCard.vue'
import RouteCard from '@/components/shared/RouteCard.vue'

const api = useApi()
const favPlaces = ref<Place[]>([])
const favRoutes = ref<RunningRoute[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const isEmpty = computed(
  () => favPlaces.value.length === 0 && favRoutes.value.length === 0
)

onMounted(async () => {
  try {
    const res = await api.get<{ places: Place[]; routes: RunningRoute[] }>(
      '/favorites/details'
    )
    favPlaces.value = res.places
    favRoutes.value = res.routes
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load favorites'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.favorites-view {
  padding: var(--space-2xl) 0;
}

.back-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  display: inline-block;
  margin-bottom: var(--space-md);
}

.back-link:hover {
  color: var(--color-primary);
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-top: var(--space-sm);
  margin-bottom: var(--space-2xl);
}

.favorites-section {
  margin-bottom: var(--space-3xl);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--color-border);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-lg);
}

.loading,
.error {
  text-align: center;
  padding: var(--space-3xl) 0;
  color: var(--color-text-secondary);
}

.empty {
  text-align: center;
  padding: var(--space-3xl) 0;
}

.empty-text {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  font-weight: 500;
}

.empty-hint {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-top: var(--space-sm);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
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

.browse-btn:hover {
  background: var(--color-primary-dark);
  color: #fff;
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
