<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useSearchStore } from '@/stores/search-store'
import { storeToRefs } from 'pinia'

import { makeTextField } from '@/utils/form-type.ts'
import type { Options } from '@/utils/form-type.ts'

import type { InputTextFormProps } from '@/utils/form-type.ts'

import { QuestionType } from '@/utils/question'

import LoadingButton from '@/components/Atoms/Buttons/loading-button.vue'

import Accordion from '@/components/Atoms/Accordions/accordion.vue'
import InputSelectForm from '@/components/Atoms/Forms/input-select-form.vue'
import InputTextForm from '@/components/Atoms/Forms/input-text-form.vue'
import InputNumberForm from '@/components/Atoms/Forms/input-number-form.vue'

import { sortByOrdemQuestionForm } from '@/composables/sort-number-list'

const search = useSearchStore()
const {
  questions,
  dimensions,
  visions,
  dimensionSelectOptions,
  visionSelectOptions,
  orderSelectOptions,
} = storeToRefs(search)

const newDimensionInput = reactive<InputTextFormProps>(makeTextField('Nova Dimensão', false, 100))
const newVisionInput = reactive<InputTextFormProps>(makeTextField('Nova Visão'))

function addNewQuestion(): void {
  search.addNewQuestion()
}
function removeQuestion(indexRemovedQuestion: number): void {
  search.removeQuestionFromIndex(indexRemovedQuestion)
}

function addNewAlternative(arrayAlternatives: InputTextFormProps[]): void {
  search.addNewAlternative(arrayAlternatives)
}

function removeAlternative(
  arrayAlternatives: InputTextFormProps[],
  indexAlternativeRemoved: number
) {
  search.removeAlterantiveByIndex(arrayAlternatives, indexAlternativeRemoved)
}

function addNewDimension(titleDimension: string | undefined): void {
  search.addNewDimensionFromTitle(titleDimension)
  newDimensionInput.modelValue = undefined
}
function removeDimension(indexRemovedDimension: number): void {
  search.removeDimensionFromIndex(indexRemovedDimension)
}

function addNewVision(titleVision: string | undefined, standard: boolean = false): void {
  search.addNewVisionFromTitle(titleVision, standard)
  newVisionInput.modelValue = undefined
}
function removeVision(indexRemovedVision: number): void {
  search.removeVisionFromIndex(indexRemovedVision)
}

function toOptions(alternatives: InputTextFormProps[]): Options<string>[] {
  return search.alternativeOptionsSelect(alternatives)
}

function eraseIdenticalOrder(index: number) {
  const value = questions.value[index]!.order.modelValue

  search.eraseIdenticalOrder(index, value!)
  search.reorderQuestion()
}

watch(
  visions.value,
  () => {
    if (visions.value.length === 0) {
      search.addNewVisionFromTitle('General', true)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex w-full flex-column">
    <div>
      <Accordion title="Dimensions" :count-number="dimensions.length">
        <template #accordionContent>
          <div class="flex flex-column">
            <section class="flex w-full gap-4">
              <InputTextForm
                v-model="newDimensionInput.modelValue"
                name=""
                :required="newDimensionInput.required"
                :is-valid="newDimensionInput.isValid"
                :max-length="newDimensionInput.maxLength"
                :num-cols="6"
              />
              <section class="flex justify-content-center align-items-center">
                <LoadingButton
                  label="Add"
                  icon="pi pi-plus"
                  size="small"
                  @handle-button-click="addNewDimension(newDimensionInput.modelValue)"
                />
              </section>
            </section>
            <section>
              <p style="font-style: italic">Registered</p>
              <div class="pl-4 flex flex-column gap-4 flex-wrap">
                <section v-for="(dimension, index) in dimensions" :key="index">
                  <span class="mr-4">
                    <strong>{{ dimension.label }}</strong>
                  </span>
                  <LoadingButton
                    label=""
                    icon="pi pi-trash"
                    size="small"
                    color-button="danger"
                    @handle-button-click="removeDimension(index)"
                  />
                </section>
              </div>
            </section>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="mt-3">
      <Accordion title="Visions" :count-number="visions.length">
        <template #accordionContent>
          <div class="flex flex-column">
            <section class="flex w-full gap-4">
              <InputTextForm
                v-model="newVisionInput.modelValue"
                name=""
                :required="newVisionInput.required"
                :is-valid="newVisionInput.isValid"
                :max-length="newVisionInput.maxLength"
                :num-cols="6"
              />
              <section class="flex justify-content-center align-items-center">
                <LoadingButton
                  label="Add"
                  icon="pi pi-plus"
                  size="small"
                  @handle-button-click="addNewVision(newVisionInput.modelValue)"
                />
              </section>
            </section>
            <section>
              <p style="font-style: italic">Registered</p>
              <div class="pl-4 flex flex-column gap-4 flex-wrap">
                <section v-for="(vision, index) in visions" :key="index">
                  <span class="mr-4">
                    <strong>{{ vision.label }}</strong>
                  </span>
                  <LoadingButton
                    v-if="!vision.standard"
                    label=""
                    icon="pi pi-trash"
                    size="small"
                    color-button="danger"
                    @handle-button-click="removeVision(index)"
                  />
                </section>
              </div>
            </section>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="mt-3">
      <Accordion title="Questions" :count-number="questions.length">
        <template #accordionContent>
          <div
            v-for="(question, indexQuestion) in questions.sort(sortByOrdemQuestionForm)"
            :key="indexQuestion"
            class="flex pt-3 mb-5 px-4"
            style="border: 1px solid lightgray; border-radius: 8px; flex-wrap: wrap"
          >
            <section class="col-12 flex">
              <InputSelectForm
                v-model="question.order.modelValue"
                :name="question.order.name"
                :required="question.order.required"
                :is-valid="question.order.isValid"
                :options="orderSelectOptions"
                :option-value="true"
                :index-element="indexQuestion"
                :num-cols="3"
                @select-changed="eraseIdenticalOrder"
              />
              <InputSelectForm
                v-model="question.typeQuestion.modelValue"
                :name="question.typeQuestion.name"
                :required="question.typeQuestion.required"
                :is-valid="question.typeQuestion.isValid"
                :options="question.typeQuestion.options"
                :option-value="true"
                :num-cols="3"
                :disabled="question.idQuestion !== undefined"
              />

              <section class="flex justify-content-center align-items-center ml-auto">
                <LoadingButton
                  icon="pi pi-trash"
                  size="small"
                  color-button="danger"
                  @handle-button-click="removeQuestion(indexQuestion)"
                />
              </section>
            </section>

            <InputSelectForm
              v-model="question.requiredAnswer.modelValue"
              :name="question.requiredAnswer.name"
              :required="question.requiredAnswer.required"
              :is-valid="question.requiredAnswer.isValid"
              :options="question.requiredAnswer.options"
              :option-value="true"
              :num-cols="3"
            />

            <InputSelectForm
              v-model="question.visions.modelValue"
              :name="question.visions.name"
              :required="question.visions.required"
              :is-valid="question.visions.isValid"
              :options="visionSelectOptions.options"
              :num-cols="3"
              :multiple="true"
            />

            <InputSelectForm
              v-model="question.dimensions.modelValue"
              :name="question.dimensions.name"
              :required="question.dimensions.required"
              :is-valid="question.dimensions.isValid"
              :options="dimensionSelectOptions.options"
              :num-cols="3"
            />

            <InputSelectForm
              v-if="
                question.typeQuestion.modelValue &&
                question.typeQuestion.modelValue != QuestionType.TextBox
              "
              v-model="question.needJustifyAnswer.modelValue"
              :name="question.needJustifyAnswer.name"
              :required="question.needJustifyAnswer.required"
              :is-valid="question.needJustifyAnswer.isValid"
              :options="question.needJustifyAnswer.options"
              :option-value="true"
              :num-cols="3"
            />

            <br />

            <InputTextForm
              v-model="question.question.modelValue"
              class="my-4"
              :name="question.question.name"
              :required="question.question.required"
              :is-valid="question.question.isValid"
              :max-length="question.question.maxLength"
              :num-cols="12"
            />

            <section
              v-if="
                question.typeQuestion.modelValue &&
                question.typeQuestion.modelValue == QuestionType.Alternatives
              "
              class="flex w-full"
              style="flex-wrap: wrap"
            >
              <i class="col-12 ml-3" style="font-size: 14px">Options - question type alternative</i>
              <InputSelectForm
                v-model="question.alternativeMultipleSelection.modelValue"
                :name="question.alternativeMultipleSelection.name"
                :required="question.alternativeMultipleSelection.required"
                :is-valid="question.alternativeMultipleSelection.isValid"
                :options="question.alternativeMultipleSelection.options"
                :option-value="true"
                :num-cols="3"
              />
              <InputSelectForm
                v-model="question.alternativeExistsRightAnswer.modelValue"
                :name="question.alternativeExistsRightAnswer.name"
                :required="question.alternativeExistsRightAnswer.required"
                :is-valid="question.alternativeExistsRightAnswer.isValid"
                :options="question.alternativeExistsRightAnswer.options"
                :option-value="true"
                :num-cols="3"
              />
              <InputSelectForm
                v-if="question.alternativeExistsRightAnswer.modelValue == 1"
                v-model="question.alternativeRightAnswer.modelValue"
                :name="question.alternativeRightAnswer.name"
                :required="question.alternativeRightAnswer.required"
                :is-valid="question.alternativeRightAnswer.isValid"
                :options="toOptions(question.alternatives)"
                :option-value="true"
                :num-cols="3"
              />
              <InputSelectForm
                v-if="question.alternativeMultipleSelection.modelValue == 2"
                v-model="question.alternativeWeight.modelValue"
                :name="question.alternativeWeight.name"
                :required="question.alternativeWeight.required"
                :is-valid="question.alternativeWeight.isValid"
                :options="question.alternativeWeight.options"
                option-value
                clear-options
                :num-cols="3"
              />

              <div class="flex flex-column col-12">
                <i class="col-12 ml-3" style="font-size: 14px">alternatives</i>
                <section class="flex" style="flex-wrap: wrap">
                  <InputTextForm
                    v-for="(alternative, alternativeIndex) in question.alternatives"
                    :key="alternativeIndex"
                    v-model="alternative.modelValue"
                    :name="alternative.name"
                    :required="alternative.required"
                    :is-valid="alternative.isValid"
                    :max-length="alternative.maxLength"
                    :has-delete-input="alternativeIndex > 1"
                    :num-cols="3"
                    @remove-input="removeAlternative(question.alternatives, alternativeIndex)"
                  />
                </section>
                <section class="col-12 flex justify-content-start">
                  <LoadingButton
                    label="alternative"
                    icon="pi pi-plus"
                    size="small"
                    @handle-button-click="addNewAlternative(question.alternatives)"
                  />
                </section>
              </div>
            </section>

            <section
              v-if="
                question.typeQuestion.modelValue &&
                question.typeQuestion.modelValue == QuestionType.NumberScale
              "
              class="flex w-full"
              style="flex-wrap: wrap"
            >
              <i class="col-12 ml-3" style="font-size: 14px">
                Options - question type Numerical Scale
              </i>
              <InputTextForm
                v-model="question.textForLowestGrade.modelValue"
                :name="question.textForLowestGrade.name"
                :required="question.textForLowestGrade.required"
                :is-valid="question.textForLowestGrade.isValid"
                :max-length="question.textForLowestGrade.maxLength"
                :num-cols="6"
              />
              <InputTextForm
                v-model="question.textForHighestGrade.modelValue"
                :name="question.textForHighestGrade.name"
                :required="question.textForHighestGrade.required"
                :is-valid="question.textForHighestGrade.isValid"
                :max-length="question.textForHighestGrade.maxLength"
                :num-cols="6"
              />

              <InputNumberForm
                v-model="question.valueForLowestGrade.modelValue"
                :name="question.valueForLowestGrade.name"
                :required="question.valueForLowestGrade.required"
                :is-valid="question.valueForLowestGrade.isValid"
                :min="question.valueForLowestGrade.min"
                :max="question.valueForLowestGrade.max"
                :num-cols="6"
              />
              <InputNumberForm
                v-model="question.valueForHighestGrade.modelValue"
                :name="question.valueForHighestGrade.name"
                :required="question.valueForHighestGrade.required"
                :is-valid="question.valueForHighestGrade.isValid"
                :min="question.valueForHighestGrade.min"
                :max="question.valueForHighestGrade.max"
                :num-cols="6"
              />
            </section>

            <section></section>
          </div>
          <div class="flex mt-3 justify-content-center">
            <LoadingButton
              label="question"
              icon="pi pi-plus"
              size="small"
              @handle-button-click="addNewQuestion"
            />
          </div>
        </template>
      </Accordion>
    </div>
  </div>
</template>

<style lang="scss"></style>
