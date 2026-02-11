<template>
	<div class="search-bar">
		<svg
			class="search-icon"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			type="text"
			class="search-input"
			:placeholder="placeholder"
			:value="modelValue"
			@input="onInput"
		/>
		<button
			v-if="modelValue"
			class="search-clear"
			@click="$emit('update:modelValue', '')"
		>
			&times;
		</button>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	modelValue: string;
	placeholder?: string;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();

let debounceTimer: ReturnType<typeof setTimeout>;

function onInput(e: Event) {
	const value = (e.target as HTMLInputElement).value;
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		emit('update:modelValue', value);
	}, 300);
}
</script>

<style scoped>
.search-bar {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
}

.search-icon {
	position: absolute;
	left: var(--space-md);
	width: 18px;
	height: 18px;
	color: var(--color-text-light);
	pointer-events: none;
}

.search-input {
	width: 100%;
	padding: var(--space-md) var(--space-md) var(--space-md)
		calc(var(--space-md) + 26px);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	font-size: var(--font-size-base);
	background: var(--color-bg);
	transition: border-color var(--transition-fast);
}

.search-input:focus {
	outline: none;
	border-color: var(--color-green-accent);
}

.search-input::placeholder {
	color: var(--color-text-light);
}

.search-clear {
	position: absolute;
	right: var(--space-sm);
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: var(--font-size-xl);
	color: var(--color-text-light);
	border-radius: 50%;
	transition: all var(--transition-fast);
}

.search-clear:hover {
	color: var(--color-text);
	background: var(--color-bg-alt);
}
</style>
