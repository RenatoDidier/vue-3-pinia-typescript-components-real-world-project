<script setup lang="ts">
import type { InputTextFormProps } from '@/utils/form-type.ts'

const props = withDefaults(
  defineProps<InputTextFormProps & { numCols?: number; numRows?: number }>(),
  {
    numCols: 12,
    numRows: 6,
  }
)

import Textarea from 'primevue/textarea'
import Message from 'primevue/message'

import { useUniqueId } from '@/composables/use-unique-id.ts'
import { computed } from 'vue'

const textId = useUniqueId('text-').value
const emit = defineEmits(['update:modelValue'])

const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="flex flex-column gap-2 mb-2 col-6" :class="`col-${numCols}`">
    <label :for="textId">{{ props.name }} {{ props.required ? '*' : '' }}</label>
    <Textarea
      :id="textId"
      v-model="modelValueComputed"
      :maxlength="props.maxLength"
      :rows="numRows"
      :aria-describedby="`${textId}-help`"
    />
    <Message v-if="props.required && !props.isValid" size="small" severity="error" variant="simple">
      Este campo é obrigatório
    </Message>
  </div>
</template>
