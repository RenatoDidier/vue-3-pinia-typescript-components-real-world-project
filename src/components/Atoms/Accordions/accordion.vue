<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Badge from 'primevue/badge'

const props = defineProps<{ title: string; countNumber: number }>()
</script>

<template>
  <div class="card">
    <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
      <AccordionPanel value="0">
        <AccordionHeader>
          <span class="flex items-center gap-2 w-full">
            <span class="font-bold whitespace-nowrap">{{ props.title }}</span>
            <Badge :value="props.countNumber" class="ml-auto mr-2" />
          </span>
        </AccordionHeader>
        <AccordionContent>
          <slot name="accordionContent"></slot>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<style scoped>
.accordion__content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
