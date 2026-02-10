<template>
  <section class="brand-section">
    <div class="container">
      <div class="brand-banner">
        <div class="brand-content">
          <p class="brand-eyebrow">The Weekend Experience</p>
          <h2 class="brand-title">New Balance x Halo</h2>
          <p class="brand-desc">
            Join us at the Halo hotel hub for the ultimate marathon weekend
            experience. Connect with fellow runners, attend pre-race events,
            and enjoy exclusive New Balance activations throughout the weekend.
            Whether it's your first 26.2 or your fastest, we're here to make
            it unforgettable.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-section {
  padding: var(--space-3xl) 0;
}

.brand-banner {
  background: var(--color-secondary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-3xl);
  color: #fff;
}

.brand-content {
  max-width: 560px;
}

.brand-eyebrow {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.6;
  margin-bottom: var(--space-md);
}

.brand-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  line-height: 1.1;
}

.brand-desc {
  margin-top: var(--space-lg);
  font-size: var(--font-size-base);
  line-height: 1.7;
  opacity: 0.85;
}

@media (max-width: 768px) {
  .brand-banner {
    padding: var(--space-2xl) var(--space-lg);
  }
  .brand-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
