<template>
  <div class="home">
    <HeroSection />
    <CategoryGrid />
    <WeekendTimeline />
    <BrandBanner />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import CategoryGrid from '@/components/home/CategoryGrid.vue'
import WeekendTimeline from '@/components/home/WeekendTimeline.vue'
import BrandBanner from '@/components/home/BrandBanner.vue'
</script>
