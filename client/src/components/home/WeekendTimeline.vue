<script setup lang="ts">
const timeline = [
	{
		day: 'Thursday',
		title: 'Arrive & Settle In',
		description:
			'Get to LA, check into your hotel, and do a short shakeout jog to loosen up after traveling. Explore the neighborhood and find your coffee spot for race morning.',
	},
	{
		day: 'Friday',
		title: 'Expo & Bib Pickup',
		description:
			'Head to the LA Marathon Expo to pick up your bib and race packet. Browse the vendor booths for last-minute gear. Keep it low-key — save your legs.',
	},
	{
		day: 'Saturday',
		title: 'Shakeout Run & Carb Load',
		description:
			'Morning shakeout run (2-4 miles easy). Spend the day relaxing, hydrating, and prepping your gear. Evening carb-load dinner at one of our recommended spots.',
	},
	{
		day: 'Sunday',
		title: 'Race Day',
		description:
			'The big day. Start at Dodger Stadium and run 26.2 miles through the heart of LA to the finish on Avenue of the Stars. Celebrate with a well-earned post-race meal.',
	},
	{
		day: 'Monday',
		title: 'Recovery & Explore',
		description:
			'Sleep in. Grab coffee. Treat yourself to a recovery brunch. Walk (slowly) around LA and enjoy the city without the pre-race jitters.',
	},
];
</script>

<template>
	<section class="timeline-section">
		<div class="container">
			<div class="timeline-inner">
				<h2 class="section-title">Your Race Weekend</h2>
				<p class="section-subtitle">
					A quick look at the key moments
					throughout marathon weekend.
				</p>
				<div class="timeline">
					<div
						v-for="(item, i) in timeline"
						:key="i"
						class="timeline-item"
					>
						<div class="timeline-marker">
							<div
								class="timeline-dot"
							></div>
							<div
								v-if="
									i <
									timeline.length -
										1
								"
								class="timeline-line"
							></div>
						</div>
						<div class="timeline-content">
							<span
								class="timeline-day"
								>{{
									item.day
								}}</span
							>
							<h3
								class="timeline-title"
							>
								{{ item.title }}
							</h3>
							<p
								class="timeline-desc"
							>
								{{
									item.description
								}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.timeline-section {
	padding: var(--space-3xl) 0;
	/* background: var(--color-bg-alt); */
	background: var(--color-slate-50);
}

.timeline-inner {
	border: 1px solid var(--color-border);
	border-radius: 14px;
	padding: 1rem;
	background: white;
}

.section-title {
	font-size: var(--font-size-2xl);
	font-weight: 700;
}

.section-subtitle {
	font-size: var(--font-size-base);
	color: var(--color-text-secondary);
	margin-top: var(--space-sm);
	margin-bottom: var(--space-2xl);
}

.timeline {
	display: flex;
	flex-direction: column;
}

.timeline-item {
	display: flex;
	gap: var(--space-lg);
}

.timeline-marker {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-shrink: 0;
	width: 20px;
}

.timeline-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: var(--color-primary);
	flex-shrink: 0;
	margin-top: 4px;
}

.timeline-line {
	width: 2px;
	flex: 1;
	background: var(--color-border);
}

.timeline-content {
	padding-bottom: var(--space-xl);
}

.timeline-day {
	font-size: var(--font-size-xs);
	text-transform: uppercase;
	letter-spacing: 1px;
	color: var(--color-primary);
	font-weight: 600;
}

.timeline-title {
	font-size: var(--font-size-lg);
	font-weight: 600;
	margin-top: var(--space-xs);
}

.timeline-desc {
	font-size: var(--font-size-sm);
	color: var(--color-text-secondary);
	margin-top: var(--space-sm);
	line-height: 1.6;
	max-width: 540px;
}
</style>
