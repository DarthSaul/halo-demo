<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <p class="hero-eyebrow">New Balance x Halo Presents</p>
        <h1 class="hero-title">LA Marathon<br />Weekend Guide</h1>
        <p class="hero-subtitle">
          Everything you need for race weekend in Los Angeles — from carb-loading
          spots to shakeout runs, coffee shops to last-minute gear.
        </p>
        <div class="hero-details">
          <div class="hero-detail">
            <span class="hero-detail-label">Race Day</span>
            <span class="hero-detail-value">March 2025</span>
          </div>
          <div class="hero-detail">
            <span class="hero-detail-label">Distance</span>
            <span class="hero-detail-value">26.2 Miles</span>
          </div>
          <div class="hero-detail">
            <span class="hero-detail-label">Start</span>
            <span class="hero-detail-value">Dodger Stadium</span>
          </div>
          <div class="hero-detail">
            <span class="hero-detail-label">Finish</span>
            <span class="hero-detail-value">Ave of the Stars</span>
          </div>
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
}

.hero-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.hero-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.hero-detail-label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
}

.hero-detail-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  .hero-details {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
