export type CategorySlug =
	| 'restaurants'
	| 'coffee-shops'
	| 'running-stores'
	| 'running-routes';

export interface Place {
	id: number;
	name: string;
	category: CategorySlug;
	neighborhood: string;
	address: string;
	description: string;
	tags: string[];
	price_level: number;
	hours: string;
	website: string | null;
	image_url: string | null;
	created_at: string;
}

export interface RunningRoute {
	id: number;
	name: string;
	neighborhood: string;
	distance_miles: number;
	difficulty: 'easy' | 'moderate' | 'hard';
	description: string;
	surface: string;
	elevation_gain_ft: number;
	tags: string[];
	start_point: string;
	image_url: string | null;
	created_at: string;
}

export interface Category {
	slug: CategorySlug;
	name: string;
	description: string;
	icon: string;
}

export interface FavoriteItem {
	item_type: 'place' | 'route';
	item_id: number;
}

export interface City {
	id: number;
	name: string;
	slug: string;
	status: 'generating' | 'ready' | 'error';
	created_at: string;
}

export interface ApiResponse<T> {
	data: T;
	meta?: {
		total: number;
		page: number;
		per_page: number;
	};
}

export interface PlaceFilters {
	category?: CategorySlug;
	neighborhood?: string;
	price_level?: number;
	tags?: string[];
	q?: string;
}

export interface RouteFilters {
	difficulty?: string;
	max_distance?: number;
	min_distance?: number;
	surface?: string;
	tags?: string[];
	q?: string;
}

export const CATEGORIES: Category[] = [
	{
		slug: 'restaurants',
		name: 'Recommended Restaurants',
		description:
			'Fuel up before the race or celebrate after at these runner-approved spots',
		icon: '🍝',
	},
	{
		slug: 'coffee-shops',
		name: 'Coffee Shops',
		description:
			'Get your caffeine fix before training runs or race day',
		icon: '☕',
	},
	{
		slug: 'running-stores',
		name: 'Running Stores',
		description:
			'Get properly fitted and find all your gear at these trusted NYC running shops',
		icon: '👟',
	},
	{
		slug: 'running-routes',
		name: 'Recommended Running Routes',
		description: 'Train like an Angeleno on these iconic routes',
		icon: '🏃',
	},
];
