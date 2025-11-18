<script setup lang="ts">
import Button from 'primevue/button'

type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'
  | 'contrast'
  | undefined

type Size = 'small' | 'large' | undefined

const props = withDefaults(
  defineProps<{
    label?: string | undefined
    icon?: string | undefined
    loading?: boolean | undefined
    colorButton?: Severity | undefined
    disabled?: boolean
    size?: Size | undefined
  }>(),
  {
    label: undefined,
    icon: undefined,
    loading: false,
    colorButton: undefined,
    disabled: false,
    size: undefined,
  }
)

defineEmits(['handleButtonClick'])
</script>

<template>
  <Button
    type="button"
    :label="props.label"
    :icon="props.icon"
    :loading="props.loading"
    :severity="props.colorButton"
    :disabled="props.disabled"
    :size="props.size"
    @click="$emit('handleButtonClick')"
  />
</template>

<style scoped></style>
