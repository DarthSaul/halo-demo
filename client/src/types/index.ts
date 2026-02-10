export type CategorySlug = 'restaurants' | 'coffee-shops' | 'running-stores' | 'running-routes'

export interface Place {
  id: number
  name: string
  category: CategorySlug
  neighborhood: string
  address: string
  description: string
  tags: string[]
  price_level: number
  hours: string
  website: string | null
  image_url: string | null
  created_at: string
}

export interface RunningRoute {
  id: number
  name: string
  neighborhood: string
  distance_miles: number
  difficulty: 'easy' | 'moderate' | 'hard'
  description: string
  surface: string
  elevation_gain_ft: number
  tags: string[]
  start_point: string
  image_url: string | null
  created_at: string
}

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  icon: string
}

export interface FavoriteItem {
  item_type: 'place' | 'route'
  item_id: number
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    total: number
    page: number
    per_page: number
  }
}

export interface PlaceFilters {
  category?: CategorySlug
  neighborhood?: string
  price_level?: number
  tags?: string[]
  q?: string
}

export interface RouteFilters {
  difficulty?: string
  max_distance?: number
  min_distance?: number
  surface?: string
  tags?: string[]
  q?: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'restaurants',
    name: 'Restaurants',
    description: 'Carb-load spots, pre-race dinners, and post-race treats',
    icon: '🍝',
  },
  {
    slug: 'coffee-shops',
    name: 'Coffee Shops',
    description: 'Grab-and-go, early open, runner-friendly cafés',
    icon: '☕',
  },
  {
    slug: 'running-stores',
    name: 'Running Stores',
    description: 'Last-minute gels, socks, shoes, and gear',
    icon: '👟',
  },
  {
    slug: 'running-routes',
    name: 'Running Routes',
    description: 'Shakeout runs, scenic loops, and flat paths',
    icon: '🏃',
  },
]
