<script setup lang="ts"></script>

<template>
	<div class="milestones-wrapper">
		<p>Key Marathon Milestones</p>
		<div class="milestones">
			<div class="milestone-item">
				<p class="milestone-title">Mile 13.1</p>
				<p>Halfway point on Somewhere in LA</p>
			</div>
			<div class="milestone-item">
				<p class="milestone-title">Mile 16</p>
				<p>Somewhere in LA</p>
			</div>
			<div class="milestone-item">
				<p class="milestone-title">Mile 20</p>
				<p>Somewhere in LA</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.milestones-wrapper {
	margin-top: var(--space-lg);
	background-color: var(--color-green-light-2);
	padding: var(--space-md);
	border-radius: var(--border-radius);
}
.milestones {
	display: flex;
	justify-content: space-between;
	gap: var(--space-3xl);
	margin-top: var(--space-md);
}
.milestone-item {
	width: 100%;
}
.milestone-title {
	font-weight: 700;
	color: var(--color-green);
	/* font-size: var(--font-size-base); */
}
</style>
