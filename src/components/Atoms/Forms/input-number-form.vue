<script setup lang="ts">
import type { InputNumberFormProps } from '@/utils/form-type.ts'

const props = withDefaults(defineProps<InputNumberFormProps & { numCols?: number }>(), {
  numCols: 6,
})

import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'

import { useUniqueId } from '@/composables/use-unique-id.ts'
import { computed } from 'vue'

const textId = useUniqueId('text-').value
const emit = defineEmits<{
  (e: 'update:modelValue', v: number | undefined): void
}>()

const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="flex flex-column gap-2 mb-2 col-6" :class="`col-${numCols}`">
    <label :for="textId">{{ props.name }} {{ props.required ? '*' : '' }}</label>
    <InputNumber
      :id="textId"
      v-model="modelValueComputed"
      :aria-describedby="`${textId}-help`"
      :min="props.min"
      :max="props.max"
      fluid
    />
    <Message v-if="props.required && !props.isValid" size="small" severity="error" variant="simple">
      Este campo é obrigatório
    </Message>
  </div>
</template>
