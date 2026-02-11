<template>
	<footer class="app-footer">
		<div class="container footer-inner">
			<div class="footer-brand">
				<span class="footer-logo">
					Good luck to all runners in the 2025 TCS
					LA Marathon!
				</span>
			</div>
			<p class="footer-copy">
				&copy; {{ year }} New Balance x Halo. All rights
				reserved.
			</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.app-footer {
	background: var(--color-secondary);
	color: rgba(255, 255, 255, 0.7);
	padding: var(--space-2xl) 0;
	margin-top: var(--space-sm);
}

.footer-inner {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: var(--space-md);
}

.footer-brand {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-xs);
}

.footer-logo {
	font-weight: 700;
	font-size: var(--font-size-lg);
	color: #fff;
}

.footer-tagline {
	font-size: var(--font-size-sm);
}

.footer-copy {
	font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
	.footer-inner {
		flex-direction: column;
		text-align: center;
	}
	.footer-brand {
		align-items: center;
	}
}
</style>
