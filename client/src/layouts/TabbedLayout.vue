<template>
  <div class="tabbed-layout">
    <HeroSection />
    <TabBar />
    <div class="tab-content">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import TabBar from '@/components/layout/TabBar.vue'
</script>

<style scoped>
.tabbed-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tab-content {
  flex: 1;
}
</style>
