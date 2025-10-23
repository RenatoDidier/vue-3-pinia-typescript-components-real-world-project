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

interface Props {
  label: string
  to: string
  target?: string
  icon?: string
  loading?: boolean
  colorButton?: Severity
  disabled?: boolean
  size?: Size
  variant?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  target: '_blank',
})
</script>

<template>
  <Button
    as="a"
    style="text-decoration: none"
    :label="props.label"
    :href="props.to"
    :target="props.target"
    :icon="props.icon"
    :severity="props.colorButton"
    :disabled="props.disabled"
    :size="props.size"
  />
</template>

<style scoped></style>
