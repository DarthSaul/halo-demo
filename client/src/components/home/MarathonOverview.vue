<script setup lang="ts">
import KeyMilestones from '@/components/home/KeyMilestones.vue';
const raceDetails = [
	{ icon: '📍', label: 'Start', value: 'Dodger Stadium' },
	{ icon: '🏁', label: 'Finish', value: 'Somewhere Else' },
	{ icon: '📏', label: 'Distance', value: '26.2 miles' },
	{
		icon: '⏰',
		label: 'Start Times',
		value: 'Staggered waves from 8:00 AM',
	},
];

const tips = [
	'Arrive in LA at least 2-3 days before race day',
	'Visit the expo at Jacob Javits Center for bib pickup',
	'Carb load at one of our recommended restaurants',
	'Do a shakeout run on one of the recommended routes',
	'Get your gear at local running stores',
	'Plan your race day transition early',
	'Stay hydrated and rest well',
];
</script>

<template>
	<section class="overview-section">
		<div class="container">
			<div class="overview-inner">
				<h2 class="section-title">
					Welcome to the LA Marathon
				</h2>
				<p class="section-subtitle">
					Here's everything you need to know to
					have a fantastic race weekend
					experience.
				</p>
				<h2 class="section-title">
					About the Marathon
				</h2>
				<p class="section-subtitle">
					The TCS New York City Marathon is the
					largest marathon in the world, drawing
					over 50,000 runners annually. The race
					takes you through all five boroughs of
					NYC - Staten Island, Brooklyn, Queens,
					the Bronx, and Manhattan - finishing in
					Central Park.
				</p>

				<div class="sub-section-container">
					<div class="sub-section">
						<p class="sub-section-title">
							Race Details
						</p>
						<ul class="icon-list">
							<li
								v-for="detail in raceDetails"
								:key="
									detail.label
								"
							>
								<span
									class="list-icon"
									>{{
										detail.icon
									}}</span
								>
								<strong
									>{{
										detail.label
									}}:</strong
								>
								{{
									detail.value
								}}
							</li>
						</ul>
					</div>
					<div class="sub-section">
						<p class="sub-section-title">
							Marathon Weekend Tips
						</p>
						<ul>
							<li
								v-for="tip in tips"
								:key="tip"
							>
								{{ tip }}
							</li>
						</ul>
					</div>
				</div>
				<KeyMilestones />
			</div>
		</div>
	</section>
</template>

<style scoped>
.overview-section {
	padding: var(--space-md) 0;
	background: var(--color-slate-50);
}

.overview-inner {
	border: 1px solid var(--color-border);
	border-radius: 14px;
	padding: 1rem;
	background: white;
}

.section-title {
	font-size: var(--font-size-xl);
	font-weight: 700;
}

.section-subtitle {
	font-size: var(--font-size-base);
	color: var(--color-text-secondary-darker);
	margin-bottom: var(--space-xl);
}

.sub-section-container {
	display: flex;
	gap: var(--space-4xl);
	justify-content: space-between;
	flex-wrap: wrap;
}

.sub-section-title {
	margin-bottom: var(--space-md);
}

.sub-section ul {
	list-style-position: inside;
	padding-left: 0;
}
.sub-section li {
	margin-bottom: var(--space-sm);
	color: var(--color-text-secondary-darker);
}

.icon-list {
	list-style: none;
}

.list-icon {
	margin-right: var(--space-xs);
}
</style>
