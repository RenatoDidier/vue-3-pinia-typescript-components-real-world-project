<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import TieredMenu from 'primevue/tieredmenu'
import Image from 'primevue/image'
import type { MenuItem } from 'primevue/menuitem'

import logo from '@/assets/logo.png'

const router = useRouter()

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Search',
    icon: 'pi pi-book',
    items: [
      {
        label: 'Admin',
        icon: 'pi pi-sliders-v',
        command: () => {
          router.push('/search')
        },
      },
    ],
  },
])
</script>

<template>
  <div class="menu__wrapper">
    <TieredMenu :model="items" class="tiered-menu__wrapper">
      <template #start>
        <div class="wrapper__title">
          <Image :src="logo" alt="Greghub" width="100" />
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-tieredmenu-root-list) {
  flex: 1;
}

:deep(.tiered-menu__wrapper) {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.menu__wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
  height: calc(100vh - 16px);
}

.wrapper__title {
  display: flex;
  justify-content: center;
  padding: 16px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e1e1e1;
}

.menu__header {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.logged-user__menu {
  display: flex;
  flex: 1;
  gap: 16px;
  align-items: start;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 8px 8px 8px 16px;
  cursor: pointer;
  border-top: 1px solid #e1e1e1;

  &:hover {
    background-color: rgba(#000000, 0.05);
    transition: background-color 200ms ease-in;
  }
}

.name__wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: start;
}
</style>
