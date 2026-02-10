import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const activeFilters = ref<Record<string, string | number | string[]>>({})

  function setQuery(q: string) {
    query.value = q
  }

  function setFilter(key: string, value: string | number | string[]) {
    activeFilters.value[key] = value
  }

  function removeFilter(key: string) {
    delete activeFilters.value[key]
  }

  function clearFilters() {
    activeFilters.value = {}
    query.value = ''
  }

  return { query, activeFilters, setQuery, setFilter, removeFilter, clearFilters }
})
