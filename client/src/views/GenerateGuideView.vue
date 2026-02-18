<template>
	<div class="generate-guide">
		<div class="container">
			<!-- City Input Section -->
			<div class="guide-header">
				<h1 class="guide-title">
					AI-Powered City Guide Generator
				</h1>
				<p class="guide-subtitle mb-xl">
					Generate a marathon runner's guide for
					any major city. Type the city name and
					our platform will generate a
					personalized guide with the recommended
					restaurants, coffee shops, running
					stores, and running routes for your
					selection.
				</p>
				<p class="guide-subtitle">
					Cities with a guide already generated
					will appear in the dropdown as you type.
					Select one to view or update the
					existing guide.
				</p>

				<div class="city-input-section">
					<div class="city-input-wrap">
						<input
							type="text"
							class="city-input"
							placeholder="Enter a city name..."
							v-model="cityInput"
							@focus="
								showDropdown = true
							"
							@blur="onBlur"
							@keydown.enter="
								onSubmit
							"
						/>
						<button
							v-if="canGenerate"
							class="generate-btn"
							:disabled="generating"
							@click="onGenerate"
						>
							<span
								v-if="
									generating
								"
								class="btn-spinner"
							></span>
							{{
								generating
									? 'Generating...'
									: 'Generate Guide'
							}}
						</button>
						<button
							v-else-if="canSelect"
							class="generate-btn generate-btn--select"
							@click="
								onSelectExisting
							"
						>
							View Guide
						</button>
					</div>

					<!-- Dropdown of existing cities -->
					<ul
						v-if="
							showDropdown &&
							filteredCities.length >
								0
						"
						class="city-dropdown"
					>
						<li
							v-for="city in filteredCities"
							:key="city.slug"
							class="city-option"
							:class="{
								'city-option--active':
									selectedCity?.slug ===
									city.slug,
							}"
							@mousedown.prevent="
								selectCity(city)
							"
						>
							<span
								class="city-option-name"
								>{{
									city.name
								}}</span
							>
							<span
								class="city-option-badge"
								>Ready</span
							>
						</li>
					</ul>
				</div>

				<!-- Generating state -->
				<div v-if="generating" class="generating-state">
					<div
						class="generating-spinner-large"
					></div>
					<p class="generating-text">
						Generating guide for
						<strong>{{ cityInput }}</strong
						>...
					</p>
					<p class="generating-subtext">
						This may take up to 30 seconds.
						Claude AI is finding the best
						restaurants, coffee shops,
						running stores, and routes.
					</p>
				</div>

				<!-- Error state -->
				<div v-if="error" class="error-state">
					<p class="error-text">{{ error }}</p>
					<button
						class="retry-btn"
						@click="onGenerate"
					>
						Try Again
					</button>
				</div>
			</div>

			<!-- Results Section -->
			<div
				v-if="selectedCity && !generating"
				class="guide-results"
			>
				<h2 class="results-title">
					{{ selectedCity.name }} Marathon Guide
				</h2>

				<!-- Category Tabs -->
				<div class="category-tabs">
					<button
						v-for="cat in categories"
						:key="cat.slug"
						class="category-tab"
						:class="{
							'category-tab--active':
								activeTab ===
								cat.slug,
						}"
						@click="activeTab = cat.slug"
					>
						<span
							class="category-tab-icon"
							>{{ cat.icon }}</span
						>
						<span
							class="category-tab-label"
							>{{ cat.name }}</span
						>
					</button>
				</div>

				<!-- Loading results -->
				<div v-if="loadingResults" class="loading">
					Loading {{ activeTabInfo?.name }}...
				</div>

				<!-- Results Grid -->
				<template v-else>
					<div
						v-if="
							activeTab ===
							'running-routes'
						"
						class="results-grid results-grid--full-width"
					>
						<RouteCard
							v-for="route in routes"
							:key="route.id"
							:route="route"
						/>
						<p
							v-if="
								routes.length ===
								0
							"
							class="empty"
						>
							No running routes found.
						</p>
					</div>

					<div v-else class="results-grid">
						<PlaceCard
							v-for="place in places"
							:key="place.id"
							:place="place"
						/>
						<p
							v-if="
								places.length ===
								0
							"
							class="empty"
						>
							No
							{{
								activeTabInfo?.name?.toLowerCase()
							}}
							found.
						</p>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useApi } from '@/composables/useApi';
import type { Place, RunningRoute, City, ApiResponse } from '@/types';
import PlaceCard from '@/components/shared/PlaceCard.vue';
import RouteCard from '@/components/shared/RouteCard.vue';

const api = useApi();

// City input state
const cityInput = ref('');
const showDropdown = ref(false);
const availableCities = ref<City[]>([]);
const selectedCity = ref<City | null>(null);
const generating = ref(false);
const error = ref<string | null>(null);

// Results state
const activeTab = ref<string>('restaurants');
const places = ref<Place[]>([]);
const routes = ref<RunningRoute[]>([]);
const loadingResults = ref(false);

const categories = [
	{ slug: 'restaurants', name: 'Restaurants', icon: '🍝' },
	{ slug: 'coffee-shops', name: 'Coffee Shops', icon: '☕' },
	{ slug: 'running-stores', name: 'Running Stores', icon: '👟' },
	{ slug: 'running-routes', name: 'Running Routes', icon: '🏃' },
];

const activeTabInfo = computed(() =>
	categories.find((c) => c.slug === activeTab.value),
);

const filteredCities = computed(() => {
	const q = cityInput.value.toLowerCase().trim();
	const readyCities = availableCities.value.filter(
		(c) => c.status === 'ready',
	);
	if (!q) return readyCities;
	return readyCities.filter((c) => c.name.toLowerCase().includes(q));
});

const matchingCity = computed(() => {
	const q = cityInput.value.trim().toLowerCase();
	return availableCities.value.find(
		(c) => c.name.toLowerCase() === q && c.status === 'ready',
	);
});

const canGenerate = computed(() => {
	const q = cityInput.value.trim();
	return q.length > 0 && !matchingCity.value;
});

const canSelect = computed(() => {
	return (
		matchingCity.value &&
		selectedCity.value?.slug !== matchingCity.value.slug
	);
});

function onBlur() {
	// Delay to allow dropdown clicks to register
	setTimeout(() => {
		showDropdown.value = false;
	}, 200);
}

function selectCity(city: City) {
	cityInput.value = city.name;
	selectedCity.value = city;
	showDropdown.value = false;
	activeTab.value = 'restaurants';
	fetchResults();
}

function onSelectExisting() {
	if (matchingCity.value) {
		selectCity(matchingCity.value);
	}
}

function onSubmit() {
	if (matchingCity.value) {
		selectCity(matchingCity.value);
	} else if (canGenerate.value) {
		onGenerate();
	}
}

async function onGenerate() {
	const cityName = cityInput.value.trim();
	if (!cityName) return;

	generating.value = true;
	error.value = null;

	try {
		const res = await api.post<{ data: City }>('/cities/generate', {
			city: cityName,
		});

		// Add to available cities if not already there
		const exists = availableCities.value.find(
			(c) => c.slug === res.data.slug,
		);
		if (!exists) {
			availableCities.value.push(res.data);
		} else {
			// Update existing entry
			const idx = availableCities.value.indexOf(exists);
			availableCities.value[idx] = res.data;
		}

		selectedCity.value = res.data;
		activeTab.value = 'restaurants';
		await fetchResults();
	} catch (e) {
		error.value =
			e instanceof Error
				? e.message
				: 'Failed to generate city guide. Please try again.';
	} finally {
		generating.value = false;
	}
}

async function fetchResults() {
	if (!selectedCity.value) return;

	loadingResults.value = true;

	try {
		if (activeTab.value === 'running-routes') {
			const res = await api.get<ApiResponse<RunningRoute[]>>(
				`/routes?city=${encodeURIComponent(selectedCity.value.name)}`,
			);
			routes.value = res.data;
			places.value = [];
		} else {
			const res = await api.get<ApiResponse<Place[]>>(
				`/places?category=${activeTab.value}&city=${encodeURIComponent(selectedCity.value.name)}`,
			);
			places.value = res.data;
			routes.value = [];
		}
	} catch (e) {
		console.error('Failed to fetch results:', e);
	} finally {
		loadingResults.value = false;
	}
}

async function fetchCities() {
	try {
		const res = await api.get<{ data: City[] }>('/cities');
		availableCities.value = res.data;
	} catch {
		// Silent fail — dropdown just won't show existing cities
	}
}

// Re-fetch when tab changes
watch(activeTab, () => {
	if (selectedCity.value) {
		fetchResults();
	}
});

onMounted(fetchCities);
</script>

<style scoped>
.generate-guide {
	padding: var(--space-2xl) 0;
	min-height: 80vh;
	background: var(--color-slate-50);
}

.guide-header {
	max-width: 640px;
	margin: 0 auto var(--space-3xl);
}

.guide-title {
	font-size: var(--font-size-3xl);
	font-weight: 800;
	letter-spacing: -0.5px;
	text-align: center;
}

.guide-subtitle {
	margin-top: var(--space-sm);
	font-size: var(--font-size-lg);
	color: var(--color-text-secondary);
	line-height: 1.6;
}

.city-input-section {
	margin-top: var(--space-xl);
	position: relative;
}

.city-input-wrap {
	display: flex;
	gap: var(--space-sm);
	align-items: stretch;
}

.city-input {
	flex: 1;
	padding: var(--space-md) var(--space-lg);
	font-size: var(--font-size-lg);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-lg);
	outline: none;
	transition: border-color var(--transition-fast);
	background: #fff;
}

.city-input:focus {
	border-color: var(--color-green-accent);
}

.generate-btn {
	padding: var(--space-md) var(--space-xl);
	background: var(--color-green);
	color: #fff;
	font-size: var(--font-size-base);
	font-weight: 600;
	border-radius: var(--border-radius-lg);
	white-space: nowrap;
	display: flex;
	align-items: center;
	gap: var(--space-sm);
	border: 2px solid var(--color-border);
	transition: all var(--transition-fast);
}

.generate-btn:hover:not(:disabled) {
	border-color: var(--color-green-accent);
}

.generate-btn:disabled {
	opacity: 0.7;
	cursor: not-allowed;
}

.generate-btn--select {
	background: var(--color-secondary);
}

.generate-btn--select:hover {
	background: var(--color-primary-dark);
}

.btn-spinner {
	display: inline-block;
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-top-color: #fff;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
}

/* Dropdown */
.city-dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin-top: var(--space-xs);
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	box-shadow: var(--shadow-md);
	list-style: none;
	padding: var(--space-xs) 0;
	z-index: 10;
	max-height: 240px;
	overflow-y: auto;
}

.city-option {
	padding: var(--space-sm) var(--space-lg);
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: background var(--transition-fast);
}

.city-option:hover {
	background: var(--color-bg-alt);
}

.city-option--active {
	background: var(--color-bg-alt);
	font-weight: 600;
}

.city-option-name {
	font-size: var(--font-size-base);
}

.city-option-badge {
	font-size: var(--font-size-xs);
	color: var(--color-success);
	font-weight: 500;
}

/* Generating state */
.generating-state {
	margin-top: var(--space-2xl);
	padding: var(--space-2xl);
	background: #fff;
	border-radius: var(--border-radius-lg);
	border: 1px solid var(--color-border);
}

.generating-spinner-large {
	width: 40px;
	height: 40px;
	margin: 0 auto var(--space-lg);
	border: 3px solid var(--color-border);
	border-top-color: var(--color-green);
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

.generating-text {
	font-size: var(--font-size-lg);
	font-weight: 600;
	margin-bottom: var(--space-sm);
}

.generating-subtext {
	font-size: var(--font-size-sm);
	color: var(--color-text-secondary);
}

/* Error state */
.error-state {
	margin-top: var(--space-xl);
	padding: var(--space-lg);
	background: #fef2f2;
	border: 1px solid #fecaca;
	border-radius: var(--border-radius);
	text-align: center;
}

.error-text {
	color: #dc2626;
	font-size: var(--font-size-base);
	margin-bottom: var(--space-md);
}

.retry-btn {
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

/* Results */
.guide-results {
	margin-top: var(--space-xl);
}

.results-title {
	font-size: var(--font-size-2xl);
	font-weight: 700;
	margin-bottom: var(--space-xl);
	text-align: center;
}

/* Category Tabs */
.category-tabs {
	display: flex;
	gap: var(--space-sm);
	margin-bottom: var(--space-2xl);
	overflow-x: auto;
	padding-bottom: var(--space-xs);
}

.category-tab {
	display: flex;
	align-items: center;
	gap: var(--space-xs);
	padding: var(--space-sm) var(--space-lg);
	background: #fff;
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-lg);
	font-size: var(--font-size-sm);
	font-weight: 500;
	color: var(--color-text-secondary);
	white-space: nowrap;
	transition: all var(--transition-fast);
	cursor: pointer;
}

.category-tab:hover {
	border-color: var(--color-green-accent);
	color: var(--color-text);
}

.category-tab--active {
	background: var(--color-green);
	color: #fff;
	border-color: var(--color-green);
	transition: all var(--transition-fast);
}

.category-tab--active:hover {
	background: var(--color-green);
	color: #fff;
}

.category-tab-icon {
	font-size: var(--font-size-base);
}

/* Results Grid */
.results-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: var(--space-lg);
}

.results-grid--full-width {
	grid-template-columns: 1fr;
}

.loading,
.empty {
	text-align: center;
	padding: var(--space-3xl) 0;
	color: var(--color-text-secondary);
	font-size: var(--font-size-lg);
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

@media (max-width: 768px) {
	.city-input-wrap {
		flex-direction: column;
	}

	.results-grid {
		grid-template-columns: 1fr;
	}

	.category-tab-label {
		display: none;
	}

	.category-tab-icon {
		font-size: var(--font-size-lg);
	}

	.category-tabs {
		justify-content: center;
	}
}
</style>
