<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(false);

function onBeforeEnter(el: Element) {
	const htmlEl = el as HTMLElement;
	htmlEl.style.maxHeight = '0';
	htmlEl.style.opacity = '0';
	htmlEl.style.overflow = 'hidden';
}

function onEnter(el: Element, done: () => void) {
	const htmlEl = el as HTMLElement;
	htmlEl.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';
	htmlEl.style.maxHeight = htmlEl.scrollHeight + 'px';
	htmlEl.style.opacity = '1';
	htmlEl.addEventListener('transitionend', done, { once: true });
}

function onAfterEnter(el: Element) {
	const htmlEl = el as HTMLElement;
	htmlEl.style.maxHeight = '';
	htmlEl.style.overflow = '';
	htmlEl.style.transition = '';
}

function onLeave(el: Element, done: () => void) {
	const htmlEl = el as HTMLElement;
	htmlEl.style.overflow = 'hidden';
	htmlEl.style.maxHeight = htmlEl.scrollHeight + 'px';
	htmlEl.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';
	requestAnimationFrame(() => {
		htmlEl.style.maxHeight = '0';
		htmlEl.style.opacity = '0';
	});
	htmlEl.addEventListener('transitionend', done, { once: true });
}

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
				<div class="timeline-header" @click="isExpanded = !isExpanded">
					<div class="title-row">
						<h2 class="section-title">Your Race Weekend</h2>
						<button class="toggle-btn" :class="{ expanded: isExpanded }" aria-label="Toggle timeline">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					</div>
					<p class="section-subtitle">
						A quick look at the key moments
						throughout marathon weekend.
					</p>
				</div>
				<Transition
					@before-enter="onBeforeEnter"
					@enter="onEnter"
					@after-enter="onAfterEnter"
					@leave="onLeave"
				>
				<div v-if="isExpanded" class="timeline">
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
			</Transition>
			</div>
		</div>
	</section>
</template>

<style scoped>
.timeline-section {
	padding: var(--space-md) 0;
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

.timeline-header {
	cursor: pointer;
	user-select: none;
}

.title-row {
	display: flex;
	align-items: center;
	gap: var(--space-xl);
}

.toggle-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--color-text-secondary);
	padding: 0;
	flex-shrink: 0;
	transition: transform 0.2s ease;
}

.toggle-btn.expanded {
	transform: rotate(180deg);
}

.section-subtitle {
	font-size: var(--font-size-base);
	color: var(--color-text-secondary);
	margin-top: var(--space-sm);
	margin-bottom: 0;
}

.timeline {
	display: flex;
	flex-direction: column;
	margin-top: var(--space-2xl);
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
