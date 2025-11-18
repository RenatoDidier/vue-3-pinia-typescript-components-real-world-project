<script setup lang="ts">
import type { SelectFormProps } from '@/utils/form-type.ts'

const props = withDefaults(
  defineProps<
    SelectFormProps<unknown> & {
      numCols?: number
      multiple?: boolean
      optionValue?: boolean
      clearOptions?: boolean
      optionLabel?: string
      disabled?: boolean
      indexElement?: number
    }
  >(),
  {
    numCols: 6,
    optionLabel: 'label',
    indexElement: undefined,
  }
)

import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Message from 'primevue/message'

import { useUniqueId } from '@/composables/use-unique-id.ts'
import { computed } from 'vue'

const textId = useUniqueId('text-').value
const emit = defineEmits(['update:modelValue', 'selectChanged'])

const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="flex flex-column gap-2 mb-2" :class="`col-${numCols}`">
    <label :for="textId">{{ props.name }} {{ props.required ? '*' : '' }}</label>
    <MultiSelect
      v-if="props.multiple"
      :id="textId"
      v-model="modelValueComputed"
      fluid
      :options="props.options"
      :option-label="optionLabel"
      :placeholder="`Selecionar`"
      display="chip"
      :aria-describedby="`${textId}-help`"
    />

    <Select
      v-else
      :id="textId"
      v-model="modelValueComputed"
      fluid
      :options="props.options"
      option-label="label"
      :option-value="optionValue ? 'value' : ''"
      :show-clear="clearOptions"
      :placeholder="`Selecionar`"
      :aria-describedby="`${textId}-help`"
      :disabled="disabled"
      @change="$emit('selectChanged', props.indexElement)"
    />
    <Message v-if="props.required && !props.isValid" size="small" severity="error" variant="simple">
      Este campo é obrigatório
    </Message>
  </div>
</template>
