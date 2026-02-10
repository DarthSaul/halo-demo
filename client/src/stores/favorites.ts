import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import type { FavoriteItem } from '@/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const api = useApi()
  const favorites = ref<FavoriteItem[]>([])
  const loaded = ref(false)

  const favoriteSet = computed(() => {
    return new Set(favorites.value.map((f) => `${f.item_type}:${f.item_id}`))
  })

  function isFavorite(type: 'place' | 'route', id: number): boolean {
    return favoriteSet.value.has(`${type}:${id}`)
  }

  async function fetchFavorites() {
    try {
      const data = await api.get<FavoriteItem[]>('/favorites')
      favorites.value = data
      loaded.value = true
    } catch {
      // Silently fail — favorites are non-critical
      loaded.value = true
    }
  }

  async function toggleFavorite(type: 'place' | 'route', id: number) {
    if (isFavorite(type, id)) {
      await api.delete(`/favorites/${type}/${id}`)
      favorites.value = favorites.value.filter(
        (f) => !(f.item_type === type && f.item_id === id)
      )
    } else {
      await api.post('/favorites', { item_type: type, item_id: id })
      favorites.value.push({ item_type: type, item_id: id })
    }
  }

  return { favorites, loaded, isFavorite, fetchFavorites, toggleFavorite }
})
