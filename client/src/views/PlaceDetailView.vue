<template>
  <div class="detail-view">
    <div class="container">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <RouterLink to="/" class="back-link">Back to Home</RouterLink>
      </div>

      <template v-else-if="place">
        <RouterLink :to="`/category/${place.category}`" class="back-link">
          &larr; Back to {{ categoryName }}
        </RouterLink>

        <div class="detail-header">
          <div>
            <h1 class="detail-title">{{ place.name }}</h1>
            <div class="detail-meta">
              <span class="detail-neighborhood">{{ place.neighborhood }}</span>
              <span v-if="place.price_level" class="detail-price">
                {{ '$'.repeat(place.price_level) }}
              </span>
            </div>
          </div>
          <FavoriteButton item-type="place" :item-id="place.id" />
        </div>

        <p class="detail-description">{{ place.description }}</p>

        <div class="detail-info">
          <div v-if="place.address" class="info-row">
            <span class="info-label">Address</span>
            <span class="info-value">{{ place.address }}</span>
          </div>
          <div v-if="place.hours" class="info-row">
            <span class="info-label">Hours</span>
            <span class="info-value">{{ place.hours }}</span>
          </div>
          <div v-if="place.website" class="info-row">
            <span class="info-label">Website</span>
            <a :href="place.website" target="_blank" rel="noopener" class="info-link">
              {{ place.website }}
            </a>
          </div>
        </div>

        <div v-if="place.tags.length > 0" class="detail-tags">
          <span v-for="tag in place.tags" :key="tag" class="tag">
            {{ formatTag(tag) }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { CATEGORIES } from '@/types'
import type { Place } from '@/types'
import FavoriteButton from '@/components/shared/FavoriteButton.vue'

const props = defineProps<{
  id: string
}>()

const api = useApi()
const place = ref<Place | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const categoryName = computed(() => {
  if (!place.value) return ''
  return CATEGORIES.find((c) => c.slug === place.value!.category)?.name ?? ''
})

function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

onMounted(async () => {
  try {
    const res = await api.get<{ data: Place }>(`/places/${props.id}`)
    place.value = res.data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load place'
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
  color: var(--color-text-secondary);
}

.detail-price {
  color: var(--color-success);
  font-weight: 600;
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

.info-link {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  word-break: break-all;
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
