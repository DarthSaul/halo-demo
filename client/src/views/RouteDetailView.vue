<template>
  <div class="detail-view">
    <div class="container">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <RouterLink to="/" class="back-link">Back to Home</RouterLink>
      </div>

      <template v-else-if="route">
        <RouterLink to="/category/running-routes" class="back-link">
          &larr; Back to Running Routes
        </RouterLink>

        <div class="detail-header">
          <div>
            <h1 class="detail-title">{{ route.name }}</h1>
            <div class="detail-meta">
              <span class="detail-distance">{{ route.distance_miles }} miles</span>
              <span class="detail-difficulty" :class="`difficulty--${route.difficulty}`">
                {{ route.difficulty }}
              </span>
              <span class="detail-neighborhood">{{ route.neighborhood }}</span>
            </div>
          </div>
          <FavoriteButton item-type="route" :item-id="route.id" />
        </div>

        <p class="detail-description">{{ route.description }}</p>

        <div class="detail-info">
          <div class="info-row">
            <span class="info-label">Distance</span>
            <span class="info-value">{{ route.distance_miles }} miles</span>
          </div>
          <div class="info-row">
            <span class="info-label">Difficulty</span>
            <span class="info-value">{{ route.difficulty }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Surface</span>
            <span class="info-value">{{ route.surface }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Elevation</span>
            <span class="info-value">{{ route.elevation_gain_ft }} ft gain</span>
          </div>
          <div class="info-row">
            <span class="info-label">Start</span>
            <span class="info-value">{{ route.start_point }}</span>
          </div>
        </div>

        <div v-if="route.tags.length > 0" class="detail-tags">
          <span v-for="tag in route.tags" :key="tag" class="tag">
            {{ formatTag(tag) }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import type { RunningRoute } from '@/types'
import FavoriteButton from '@/components/shared/FavoriteButton.vue'

const props = defineProps<{
  id: string
}>()

const api = useApi()
const route = ref<RunningRoute | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

onMounted(async () => {
  try {
    const res = await api.get<{ data: RunningRoute }>(`/routes/${props.id}`)
    route.value = res.data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load route'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detail-view {
  padding: var(--space-2xl) 0;
}

.back-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  display: inline-block;
  margin-bottom: var(--space-lg);
}

.back-link:hover {
  color: var(--color-primary);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.detail-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: var(--font-size-base);
}

.detail-distance {
  font-weight: 600;
}

.detail-difficulty {
  padding: 2px var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
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

.detail-neighborhood {
  color: var(--color-text-secondary);
}

.detail-description {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--color-text);
  max-width: 720px;
  margin-bottom: var(--space-2xl);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-xl);
  background: var(--color-bg-alt);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--space-xl);
}

.info-row {
  display: flex;
  gap: var(--space-lg);
}

.info-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 80px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: var(--font-size-base);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.tag {
  padding: var(--space-xs) var(--space-md);
  background: var(--color-bg-alt);
  border-radius: 999px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.loading,
.error {
  text-align: center;
  padding: var(--space-3xl) 0;
  color: var(--color-text-secondary);
}
</style>
