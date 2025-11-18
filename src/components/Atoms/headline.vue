<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Divider from 'primevue/divider'

const props = defineProps<{ title: string }>()
</script>

<template>
  <Divider align="left" type="solid" class="col-12">
    <b>
      {{ props.title }}
    </b>
  </Divider>
</template>
