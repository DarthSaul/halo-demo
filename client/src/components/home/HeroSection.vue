<template>
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<p class="hero-eyebrow">
					New Balance x Halo Presents
				</p>
				<h1 class="hero-title">LA Marathon Guide</h1>
				<p class="hero-subtitle">
					Everything you need for race weekend in
					Los Angeles.
				</p>
				<div class="hero-info-btn">
					November 2, 2025 - Race Day
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero {
	background: var(--color-secondary);
	color: #fff;
	padding: var(--space-3xl) 0;
}

.hero-content {
	max-width: 640px;
	margin: 0 auto;
	text-align: center;
}

.hero-eyebrow {
	font-size: var(--font-size-sm);
	text-transform: uppercase;
	letter-spacing: 2px;
	opacity: 0.7;
	margin-bottom: var(--space-md);
}

.hero-title {
	font-size: var(--font-size-4xl);
	font-weight: 800;
	line-height: 1.1;
	letter-spacing: -0.5px;
}

.hero-subtitle {
	margin-top: var(--space-lg);
	font-size: var(--font-size-lg);
	line-height: 1.6;
	opacity: 0.85;
	margin-bottom: var(--space-lg);
}

.hero-info-btn {
	display: inline-block;
	background: #fff;
	color: var(--color-green);
	font-size: var(--font-size-sm);
	font-weight: 600;
	padding: var(--space-sm) var(--space-lg);
	border-radius: var(--border-radius-lg);
	transition: all var(--transition-fast);
	cursor: default;
}

.hero-info-btn:hover {
	background: var(--color-primary-hover);
}

@media (max-width: 768px) {
	.hero-title {
		font-size: var(--font-size-3xl);
	}
}
</style>
