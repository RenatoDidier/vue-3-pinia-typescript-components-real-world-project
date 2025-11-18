<script lang="ts" setup>
import { ref } from 'vue'

import Button from 'primevue/button'
import Menu from 'primevue/menu'

import type { MenuItem } from 'primevue/menuitem'

const props = defineProps<{
  items: MenuItem[]
  rounded?: boolean
  raised?: boolean
  ariaLabel?: string
  severity?: string
  icon?: string
  variant?: string
}>()

const menu = ref<InstanceType<typeof Menu> | null>(null)

function toggleMenu(event: Event) {
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="dropdown-button">
    <Button
      :rounded="rounded"
      :raised="raised"
      :aria-label="ariaLabel"
      :severity="severity"
      :icon="icon"
      :variant="variant"
      @click="toggleMenu"
    >
      <slot />
    </Button>

    <Menu ref="menu" :model="props.items" popup />
  </div>
</template>

<style scoped>
.dropdown-button {
  display: inline-block;
}
</style>
