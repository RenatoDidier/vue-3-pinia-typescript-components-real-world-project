<script setup lang="ts">
import type { InputTextFormProps } from '@/utils/form-type.ts'

const props = withDefaults(
  defineProps<InputTextFormProps & { numCols?: number; hasDeleteInput?: boolean }>(),
  {
    numCols: 6,
    maxLength: 200,
    hasDeleteInput: false,
  }
)

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import LoadingButton from '@/components/Atoms/Buttons/loading-button.vue'

import { useUniqueId } from '@/composables/use-unique-id.ts'
import { computed } from 'vue'

const textId = useUniqueId('text-').value
const emit = defineEmits(['update:modelValue', 'removeInput'])

const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="flex flex-column gap-2 mb-2" :class="`col-${numCols}`">
    <label :for="textId" style="height: 31px" class="flex justify-content-start align-items-center">
      {{ props.name }} {{ props.required ? '*' : '' }}
      <LoadingButton
        v-if="hasDeleteInput"
        class="ml-3"
        label=""
        icon="pi pi-trash"
        size="small"
        color-button="danger"
        @handle-button-click="$emit('removeInput')"
      />
    </label>
    <InputText
      :id="textId"
      v-model="modelValueComputed"
      :maxlength="props.maxLength"
      :aria-describedby="`${textId}-help`"
    />
    <Message v-if="props.required && !props.isValid" size="small" severity="error" variant="simple">
      This field is required
    </Message>
  </div>
</template>
