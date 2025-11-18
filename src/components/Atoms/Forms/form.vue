<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import LoadingButton from '@/components/Atoms/Buttons/loading-button.vue'

const value = ref<string>('')
const error = ref<string>('')

function handleSubmitForm() {
  if (!value.value.trim()) {
    error.value = 'This field is required'
    return
  }
}

defineEmits(['handleSaveForms'])
</script>

<template>
  <form class="flex flex-wrap" @submit.prevent="handleSubmitForm">
    <slot name="forms"></slot>

    <slot name="button">
      <div class="flex justify-content-end mt-3 col-12">
        <LoadingButton label="Salvar" @handle-button-click="$emit('handleSaveForms')" />
      </div>
    </slot>
  </form>
</template>
