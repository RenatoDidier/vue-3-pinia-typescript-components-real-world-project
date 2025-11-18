<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSearchStore } from '@/stores/search-store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useNotify } from '@/utils/toast-helper'
import { extractErrorMessage } from '@/composables/handle-error'

import { createSearchAsync, editSearchAsync, getSearchByIdAsync } from '@/services/search-service'

import Headline from '@/components/Atoms/headline.vue'
import Form from '@/components/Atoms/Forms/form.vue'
import InputTextareaForm from '@/components/Atoms/Forms/input-textarea-form.vue'
import InputTextForm from '@/components/Atoms/Forms/input-text-form.vue'
import InputSelectForm from '@/components/Atoms/Forms/input-select-form.vue'
import QuestionSelection from '@/components/Molecules/question-selection.vue'

const questionSelectionRef = ref<InstanceType<typeof QuestionSelection> | null>(null)

const search = useSearchStore()
const notify = useNotify()
const router = useRouter()

const {
  Id,
  searchTitle,
  searchCategory,
  searchDescription,
  searchAcknowledgement,
  searchType,
  searchAnonymity,
  multipleAnswerSearch,
} = storeToRefs(search)

const props = defineProps<{ searchId?: string }>()

const submitForms = async () => {
  if (search.validateFullResearchForm(notify)) {
    if (Id?.value !== undefined) {
      editSearch()
    } else {
      createSearch()
    }
  }
}

const createSearch = async () => {
  const payload = search.payload

  const { callback, data } = createSearchAsync(payload)

  try {
    await callback()
  } catch (exception: unknown) {
    notify.error(extractErrorMessage(exception))
  }

  if (data.value?.successes && data.value?.successes.length > 0) {
    notify.success('Search created successfully')
    router.push('/search')
  }
}

const editSearch = async () => {
  const payload = search.payload

  const { callback, data } = editSearchAsync(payload)

  try {
    await callback()
  } catch (exception: unknown) {
    notify.error(extractErrorMessage(exception))
  }

  if (data.value?.successes && data.value?.successes.length > 0) {
    notify.success('Search edited successfully')
    router.push('/search')
  }
}

async function getSearchById(searchId: string) {
  const { callback, data } = getSearchByIdAsync(searchId)

  try {
    await callback()
  } catch (exception: unknown) {
    notify.error(extractErrorMessage(exception))
  }

  search.fillDataFromRequest(data.value)
}

onMounted(() => {
  if (props.searchId) {
    getSearchById(props.searchId)
  } else {
    search.fillBasicInformation()
  }
})
</script>

<template>
  <div class="flex flex-column gap-4 w-full container-card">
    <Form @handle-save-forms="submitForms">
      <template #forms>
        <Headline title="Search Information" />
        <InputTextForm
          v-model="searchTitle.modelValue"
          :name="searchTitle.name"
          :required="searchTitle.required"
          :is-valid="searchTitle.isValid"
          :max-length="searchTitle.maxLength"
        />
        <InputTextareaForm
          v-model="searchDescription.modelValue"
          :name="searchDescription.name"
          :required="searchDescription.required"
          :is-valid="searchDescription.isValid"
          :max-length="searchDescription.maxLength"
        />
        <InputTextareaForm
          v-model="searchAcknowledgement.modelValue"
          :name="searchAcknowledgement.name"
          :required="searchAcknowledgement.required"
          :is-valid="searchAcknowledgement.isValid"
          :max-length="searchAcknowledgement.maxLength"
        />

        <InputSelectForm
          v-model="searchType.modelValue"
          :name="searchType.name"
          :required="searchType.required"
          :is-valid="searchType.isValid"
          :options="searchType.options"
          :option-value="true"
          :num-cols="3"
        />
        <InputSelectForm
          v-model="searchAnonymity.modelValue"
          :name="searchAnonymity.name"
          :required="searchAnonymity.required"
          :is-valid="searchAnonymity.isValid"
          :options="searchAnonymity.options"
          :option-value="true"
          :num-cols="3"
        />
        <InputSelectForm
          v-model="multipleAnswerSearch.modelValue"
          :name="multipleAnswerSearch.name"
          :required="multipleAnswerSearch.required"
          :is-valid="multipleAnswerSearch.isValid"
          :options="multipleAnswerSearch.options"
          :num-cols="3"
        />
        <InputSelectForm
          v-model="searchCategory.modelValue"
          :name="searchCategory.name"
          :required="searchCategory.required"
          :is-valid="searchCategory.isValid"
          :options="searchCategory.options"
          :option-value="true"
          :num-cols="3"
        />

        <Headline title="Questions" />
        <QuestionSelection ref="questionSelectionRef" />
      </template>
    </Form>
  </div>
</template>
