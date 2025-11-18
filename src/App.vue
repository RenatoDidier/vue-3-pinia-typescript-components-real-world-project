<script setup lang="ts">
import SideMenu from '@/components/Molecules/side-menu.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="container">
    <Toast position="top-right" />
    <nav>
      <SideMenu />
    </nav>

    <main>
      <div class="container-card">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>
