<template>
  <div class="category-view">
    <div class="container">
      <div class="category-header">
        <h1 class="category-title">{{ categoryInfo?.name }}</h1>
        <p class="category-desc">{{ categoryInfo?.description }}</p>
      </div>

      <div class="category-controls">
        <SearchBar
          v-model="searchQuery"
          :placeholder="`Search ${categoryInfo?.name?.toLowerCase() ?? ''}...`"
        />
        <FilterPanel :category="slug" @filter="onFilter" />
      </div>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchData">Try Again</button>
      </div>

      <div v-else-if="isEmpty" class="empty">
        <p>No results found. Try adjusting your filters.</p>
      </div>

      <template v-else>
        <!-- Running routes -->
        <div v-if="slug === 'running-routes'" class="results-grid">
          <RouteCard v-for="route in routes" :key="route.id" :route="route" />
        </div>

        <!-- Places (restaurants, coffee, stores) -->
        <div v-else class="results-grid">
          <PlaceCard v-for="place in places" :key="place.id" :place="place" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { CATEGORIES } from '@/types'
import type { Place, RunningRoute, CategorySlug, ApiResponse } from '@/types'
import SearchBar from '@/components/shared/SearchBar.vue'
import FilterPanel from '@/components/shared/FilterPanel.vue'
import PlaceCard from '@/components/shared/PlaceCard.vue'
import RouteCard from '@/components/shared/RouteCard.vue'

const props = defineProps<{
  slug: string
}>()

const api = useApi()
const places = ref<Place[]>([])
const routes = ref<RunningRoute[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const activeFilters = ref<Record<string, string>>({})

const categoryInfo = computed(() =>
  CATEGORIES.find((c) => c.slug === props.slug)
)

const isEmpty = computed(() => {
  if (props.slug === 'running-routes') return routes.value.length === 0
  return places.value.length === 0
})

function onFilter(filters: Record<string, string>) {
  activeFilters.value = filters
  fetchData()
}

async function fetchData() {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()

    if (searchQuery.value) params.set('q', searchQuery.value)

    Object.entries(activeFilters.value).forEach(([key, value]) => {
      params.set(key, value)
    })

    if (props.slug === 'running-routes') {
      const queryString = params.toString()
      const url = `/routes${queryString ? `?${queryString}` : ''}`
      const res = await api.get<ApiResponse<RunningRoute[]>>(url)
      routes.value = res.data
    } else {
      params.set('category', props.slug as CategorySlug)
      const url = `/places?${params.toString()}`
      const res = await api.get<ApiResponse<Place[]>>(url)
      places.value = res.data
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load data'
  } finally {
    loading.value = false
  }
}

watch(
  () => searchQuery.value,
  () => fetchData()
)

watch(
  () => props.slug,
  () => {
    searchQuery.value = ''
    activeFilters.value = {}
    fetchData()
  }
)

onMounted(fetchData)
</script>

<style scoped>
.category-view {
  padding: var(--space-2xl) 0;
}

.category-header {
  margin-bottom: var(--space-xl);
}

.category-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.category-desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-top: var(--space-sm);
}

.category-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-lg);
}

.loading,
.error,
.empty {
  text-align: center;
  padding: var(--space-3xl) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.retry-btn {
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: background var(--transition-fast);
}

.retry-btn:hover {
  background: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
