<template>
  <div class="filter-panel">
    <!-- Filters for restaurants -->
    <template v-if="category === 'restaurants'">
      <div class="filter-group">
        <label class="filter-label">Price</label>
        <div class="filter-options">
          <button
            v-for="level in [1, 2, 3, 4]"
            :key="level"
            class="filter-chip"
            :class="{ 'filter-chip--active': activePrice === level }"
            @click="togglePrice(level)"
          >
            {{ '$'.repeat(level) }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Type</label>
        <div class="filter-options">
          <button
            v-for="tag in ['carb-load', 'pre-race-dinner', 'post-race']"
            :key="tag"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ formatTag(tag) }}
          </button>
        </div>
      </div>
    </template>

    <!-- Filters for coffee shops -->
    <template v-if="category === 'coffee-shops'">
      <div class="filter-group">
        <label class="filter-label">Features</label>
        <div class="filter-options">
          <button
            v-for="tag in ['early-open', 'grab-and-go', 'specialty', 'pastries']"
            :key="tag"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ formatTag(tag) }}
          </button>
        </div>
      </div>
    </template>

    <!-- Filters for running stores -->
    <template v-if="category === 'running-stores'">
      <div class="filter-group">
        <label class="filter-label">Needs</label>
        <div class="filter-options">
          <button
            v-for="tag in ['shoes', 'gels', 'nutrition', 'socks', 'gear']"
            :key="tag"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ formatTag(tag) }}
          </button>
        </div>
      </div>
    </template>

    <!-- Filters for running routes -->
    <template v-if="category === 'running-routes'">
      <div class="filter-group">
        <label class="filter-label">Difficulty</label>
        <div class="filter-options">
          <button
            v-for="diff in ['easy', 'moderate', 'hard']"
            :key="diff"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeDifficulty === diff }"
            @click="toggleDifficulty(diff)"
          >
            {{ diff.charAt(0).toUpperCase() + diff.slice(1) }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <label class="filter-label">Surface</label>
        <div class="filter-options">
          <button
            v-for="s in ['paved', 'dirt', 'mixed']"
            :key="s"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeSurface === s }"
            @click="toggleSurface(s)"
          >
            {{ s.charAt(0).toUpperCase() + s.slice(1) }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CategorySlug } from '@/types'

const props = defineProps<{
  category: CategorySlug
}>()

const emit = defineEmits<{
  filter: [filters: Record<string, string>]
}>()

const activePrice = ref<number | null>(null)
const activeTags = ref<string[]>([])
const activeDifficulty = ref<string | null>(null)
const activeSurface = ref<string | null>(null)

function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function togglePrice(level: number) {
  activePrice.value = activePrice.value === level ? null : level
  emitFilters()
}

function toggleTag(tag: string) {
  const idx = activeTags.value.indexOf(tag)
  if (idx >= 0) {
    activeTags.value.splice(idx, 1)
  } else {
    activeTags.value.push(tag)
  }
  emitFilters()
}

function toggleDifficulty(diff: string) {
  activeDifficulty.value = activeDifficulty.value === diff ? null : diff
  emitFilters()
}

function toggleSurface(s: string) {
  activeSurface.value = activeSurface.value === s ? null : s
  emitFilters()
}

function emitFilters() {
  const filters: Record<string, string> = {}
  if (activePrice.value) filters.price_level = String(activePrice.value)
  if (activeTags.value.length > 0) filters.tags = activeTags.value.join(',')
  if (activeDifficulty.value) filters.difficulty = activeDifficulty.value
  if (activeSurface.value) filters.surface = activeSurface.value
  emit('filter', filters)
}

// Reset filters when category changes
watch(
  () => props.category,
  () => {
    activePrice.value = null
    activeTags.value = []
    activeDifficulty.value = null
    activeSurface.value = null
  }
)
</script>

<style scoped>
.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.filter-chip {
  padding: var(--space-xs) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background: var(--color-bg);
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.filter-chip--active:hover {
  background: var(--color-primary-dark);
  color: #fff;
}
</style>
