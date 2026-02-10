<template>
	<nav class="tab-bar" role="tablist">
		<div class="container">
			<div class="tab-bar-inner">
				<RouterLink
					v-for="tab in tabs"
					:key="tab.id"
					:to="tab.to"
					class="tab-link"
					:class="{
						'tab-link--active':
							currentTab === tab.id,
					}"
					role="tab"
					:aria-selected="currentTab === tab.id"
				>
					<span v-if="tab.icon" class="tab-icon">
						{{ tab.icon }}
					</span>
					{{ tab.label }}
				</RouterLink>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentTab = computed(() => route.meta.tab as string);

const tabs = [
	{ id: 'overview', label: 'Overview', to: '/', icon: null },
	{
		id: 'restaurants',
		label: 'Restaurants',
		to: '/restaurants',
		icon: '🍝',
	},
	{
		id: 'coffee-shops',
		label: 'Coffee Shops',
		to: '/coffee-shops',
		icon: '☕',
	},
	{
		id: 'running-stores',
		label: 'Running Stores',
		to: '/running-stores',
		icon: '👟',
	},
	{
		id: 'running-routes',
		label: 'Running Routes',
		to: '/running-routes',
		icon: '🏃',
	},
	{ id: 'favorites', label: 'Favorites', to: '/favorites', icon: '♡' },
];
</script>

<style scoped>
.tab-bar {
	position: sticky;
	top: var(--header-height);
	z-index: 50;
	background: var(--color-slate-50);
	padding: var(--space-lg) 0;
}

.tab-bar-inner {
	display: flex;
	gap: var(--space-sm);
	overflow-x: auto;
	white-space: nowrap;
	-ms-overflow-style: none;
	scrollbar-width: none;
	background-color: var(--color-muted);
	border-radius: 20px;
	padding: var(--space-sm);
}

.tab-bar-inner::-webkit-scrollbar {
	display: none;
}

.tab-link {
	display: flex;
	align-items: center;
	gap: var(--space-xs);
	padding: var(--space-sm) var(--space-xl);
	font-size: var(--font-size-sm);
	font-weight: 600;
	/* color: var(--color-text-secondary); */
	color: black;
	text-decoration: none;
	/* border-bottom: 2px solid transparent; */
	transition: all var(--transition-fast);
	flex-shrink: 0;
	border-radius: 20px;
}

.tab-link:hover {
	color: var(--color-text);
	background: var(--color-bg-alt);
}

.tab-link--active {
	color: var(--color-primary);
	/* border-bottom-color: var(--color-primary); */
	background-color: var(--color-bg-alt);
}

.tab-icon {
	font-size: var(--font-size-base);
}

@media (max-width: 768px) {
	.tab-link {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-xs);
	}
}
</style>
