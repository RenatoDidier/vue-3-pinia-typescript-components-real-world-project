/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'

import {
  makeTextField,
  makeSelectField,
  makeMultiSelectField,
  makeNumberField,
  validateTextFormFields,
  validateSelectFormFieldsNumber,
} from '@/utils/form-type.ts'
import type { InputTextFormProps, SelectFormProps, Options } from '@/utils/form-type.ts'

import {
  searchCategoryTypeOptions,
  searchTypeOptions,
  anonymousTypeOptions,
  yesOrNoOption,
} from '@/utils/search'
import type { SearchForm, SearchFormResponse } from '@/utils/search'

import { questionSelectOptions, QuestionType } from '@/utils/question'
import type {
  QuestionForm,
  QuestionDimension,
  QuestionVision,
  QuestionFormResponse,
} from '@/utils/question'

import { sortByOrdemQuestionForm } from '@/composables/sort-number-list'

function enumerationToOption<T extends { label: string }>(item: T): Options<T> {
  return {
    label: item.label,
    value: item,
  }
}

export const useSearchStore = defineStore('search', {
  state: (): SearchForm => ({
    Id: undefined,

    searchTitle: makeTextField('Title', true, 60),
    searchDescription: makeTextField('Introduction', true, 600),
    searchAcknowledgement: makeTextField('Acknowledgment', true, 600),

    searchCategory: makeSelectField<number>('Category', true, searchCategoryTypeOptions),
    searchType: makeSelectField('Search Type', true, searchTypeOptions),
    searchAnonymity: makeSelectField('Anonymity', true, anonymousTypeOptions),
    multipleAnswerSearch: makeSelectField('Multiple Answer', true, yesOrNoOption),

    dimensions: [],
    visions: [],
    questions: [],
  }),

  getters: {
    payload(state): SearchFormResponse {
      const payload: SearchFormResponse = {
        searchId: state.Id,

        title: state.searchTitle.modelValue!,
        description: state.searchDescription.modelValue!,
        acknowledgement: state.searchAcknowledgement.modelValue!,

        category: {
          id: state.searchCategory.modelValue,
        },
        searchType: {
          id: state.searchType.modelValue,
        },
        anonymity: {
          id: state.searchAnonymity.modelValue,
        },
        multipleAnswerSearch: state.multipleAnswerSearch.modelValue === 1,

        dimensions: state.dimensions,
        visions: state.visions,
        questions: [],
      }

      state.questions.forEach((question) => {
        let alternatives: (string | undefined)[] = []

        if (question.typeQuestion.modelValue === QuestionType.Alternatives) {
          alternatives = question.alternatives.map((alternative) => {
            if (
              alternative.modelValue !== undefined &&
              alternative.modelValue !== null &&
              alternative.modelValue.trim().length > 0
            ) {
              return alternative.modelValue!
            }
          })
        }

        const questionPayload: QuestionFormResponse = {
          questionId: question.questionId,
          questionTitle: question.question.modelValue!,
          order: question.order.modelValue!,
          typeQuestion: {
            id: question.typeQuestion.modelValue,
          },
          dimension: question.dimensions.modelValue,
          alternativeWeight:
            question.alternativeMultipleSelection.modelValue === 2
              ? question.alternativeWeight.modelValue
              : undefined,
          mandatoryQuestion: question.requiredAnswer.modelValue!,
          visions: question.visions.modelValue!.map((visao) => {
            return visao.value
          }),
          questionOptions: {
            questionId: question.questionId,
            textForLowestGrade: question.textForLowestGrade.modelValue!,
            textForHighestGrade: question.textForHighestGrade.modelValue!,
            valueForLowestGrade: question.valueForLowestGrade.modelValue!,
            valueForHighestGrade: question.valueForHighestGrade.modelValue!,
            justifyTextBox: question.needJustifyAnswer.modelValue === 1,
            selectMoreThanOneOption: question.alternativeMultipleSelection.modelValue === 1,
            existsRightAnswer: question.alternativeExistsRightAnswer.modelValue === 1,
            rightAnswer: question.alternativeRightAnswer?.modelValue,
            alternatives: alternatives,
          },
          justifyTextBox: question.needJustifyAnswer.modelValue!,
        }

        payload.questions.push(questionPayload)
      })

      return payload
    },
    dimensionSelectOptions: (state): SelectFormProps<QuestionDimension> => {
      const dimensionOptions = state.dimensions.map(enumerationToOption)
      return {
        name: 'dimension',
        required: true,
        isValid: true,
        options: dimensionOptions,
      }
    },
    visionSelectOptions: (state): SelectFormProps<QuestionVision> => {
      const visionOptions = state.visions.map(enumerationToOption)

      return {
        name: 'vision',
        required: true,
        isValid: true,
        options: visionOptions,
      }
    },
    orderSelectOptions(state): Options<number>[] {
      const arrayReturn = Array.from({ length: state.questions.length }, (_state, index) => {
        const position = index + 1
        return { label: String(position), value: position }
      })

      return arrayReturn
    },
  },

  actions: {
    generateNewQuestionForm(): QuestionForm {
      const choiceSizeOptions: Options<number>[] = []
      const size = 5

      for (let i = 0; i < size; i++) {
        const option = {
          label: (i + 1).toString(),
          value: i + 1,
        }
        choiceSizeOptions.push(option)
      }

      const questionCreated: QuestionForm = {
        order: makeSelectField('Order', true),
        typeQuestion: makeSelectField('Question Type', true, questionSelectOptions),
        visions: makeMultiSelectField('Visions', true),
        dimensions: makeSelectField('Dimensions'),

        question: makeTextField('Question', true, 500),
        textForLowestGrade: makeTextField('Text for a lower grade', true, 50),
        textForHighestGrade: makeTextField('Text for a higher grade', true, 50),

        valueForLowestGrade: makeNumberField('Initial Number', true, 0, 30),
        valueForHighestGrade: makeNumberField('Final Number', true, 0, 30),

        needJustifyAnswer: makeSelectField('Justify answer?', true, yesOrNoOption),
        requiredAnswer: makeSelectField('Required?', true, yesOrNoOption),

        alternativeMultipleSelection: makeSelectField('Multiple selection?', true, yesOrNoOption),
        alternativeExistsRightAnswer: makeSelectField(
          'Is there a correct answer?',
          true,
          yesOrNoOption
        ),
        alternativeRightAnswer: makeSelectField('Correct answer', true),
        alternativeWeight: makeSelectField('Weight of alternatives', true, choiceSizeOptions),
        alternatives: [],
      }

      questionCreated.needJustifyAnswer.modelValue = 2
      questionCreated.requiredAnswer.modelValue = 1
      questionCreated.alternativeMultipleSelection.modelValue = 2
      questionCreated.alternativeExistsRightAnswer.modelValue = 2

      this.addNewAlternative(questionCreated.alternatives)
      this.addNewAlternative(questionCreated.alternatives)

      return questionCreated
    },

    addNewQuestion(): void {
      const question: QuestionForm = this.generateNewQuestionForm()

      this.questions.push(question)
    },

    removeQuestionFromIndex(indexRemovedQuestion: number): void {
      this.questions.splice(indexRemovedQuestion, 1)
      this.normalizeQuestionOrders()
    },

    normalizeQuestionOrders() {
      const lengthMaxOrder = this.questions.length

      for (let i = 0; i < lengthMaxOrder; i++) {
        const orderQuestionValue = this.questions[i]?.order?.modelValue
        if (
          orderQuestionValue != null &&
          (!Number.isInteger(orderQuestionValue) || orderQuestionValue > lengthMaxOrder)
        ) {
          this.questions[i]!.order.modelValue = undefined
        }
      }
    },

    addNewAlternative(alternatives: InputTextFormProps[]): void {
      const newAlternative = makeTextField(`alternative`)

      alternatives.push(newAlternative)
    },

    alternativeOptionsSelect(alternatives: InputTextFormProps[]): Options<string>[] {
      return alternatives
        .filter((a) => a.modelValue && a.modelValue.trim() !== '')
        .map((a) => ({ label: a.modelValue!, value: a.modelValue! }))
    },

    removeAlterantiveByIndex(alternatives: InputTextFormProps[], indexRemoved: number): void {
      alternatives.splice(indexRemoved, 1)
    },

    addNewDimensionFromTitle(titleDimension: string | undefined): void {
      if (titleDimension && titleDimension.length > 3) {
        const existThisTitle = this.dimensions.some(
          (dimension) => dimension.label.toLowerCase() == titleDimension?.toLowerCase()
        )
        if (existThisTitle) return

        const addNewDimension: QuestionDimension = {
          label: titleDimension,
        }

        this.dimensions.push(addNewDimension)
      }
    },
    removeDimensionFromIndex(indexRemovedDimension: number): void {
      this.dimensions.splice(indexRemovedDimension, 1)
    },

    addNewVisionFromTitle(titleVision: string | undefined, standardVision: boolean = false): void {
      if (titleVision && titleVision.length > 3) {
        const existThisTitle = this.visions.some(
          (dimension) => dimension.label.toLowerCase() == titleVision?.toLowerCase()
        )
        if (existThisTitle) return

        const addNewVision: QuestionVision = {
          label: titleVision,
          standard: standardVision,
        }

        this.visions.push(addNewVision)
      }
    },
    removeVisionFromIndex(indexRemovedVision: number): void {
      this.visions.splice(indexRemovedVision, 1)
    },

    validateFullResearchForm(notify: unknown): boolean {
      const validate =
        this.validateResearch(notify) &&
        this.validateVision(notify) &&
        this.validateQuestions(notify)

      return validate
    },

    fillDataFromRequest(request: any) {
      this.Id = request.searchId

      this.searchTitle.modelValue = request.title
      this.searchDescription.modelValue = request.description
      this.searchAcknowledgement.modelValue = request.acknowledgement

      this.searchCategory.modelValue = request.category?.id
      this.searchType.modelValue = request.searchType?.id
      this.searchAnonymity.modelValue = request.anonymity?.id
      this.multipleAnswerSearch.modelValue = request.multipleAnswerSearch ? 1 : 2

      this.dimensions = request.dimensions.slice()
      this.visions = request.visions.slice()
      this.questions = []

      request.questions.forEach((question: QuestionFormResponse) => {
        const questionFromBack: QuestionForm = this.generateNewQuestionForm()

        questionFromBack.questionId = question.questionId
        questionFromBack.order.modelValue = question.order
        questionFromBack.typeQuestion.modelValue = question.typeQuestion.id
        questionFromBack.question.modelValue = question.questionTitle
        questionFromBack.dimensions.modelValue = question.dimension!
        questionFromBack.visions.modelValue = question.visions!.map(enumerationToOption)
        questionFromBack.textForLowestGrade.modelValue = question.questionOptions.textForLowestGrade
        questionFromBack.textForHighestGrade.modelValue =
          question.questionOptions.textForHighestGrade
        questionFromBack.valueForLowestGrade.modelValue =
          question.questionOptions.valueForLowestGrade
        questionFromBack.valueForHighestGrade.modelValue =
          question.questionOptions.valueForHighestGrade
        questionFromBack.alternativeExistsRightAnswer.modelValue = question.questionOptions
          .existsRightAnswer
          ? 1
          : 2
        questionFromBack.alternativeMultipleSelection.modelValue = question.questionOptions
          .selectMoreThanOneOption
          ? 1
          : 2
        questionFromBack.alternativeWeight.modelValue = question.alternativeWeight
        questionFromBack.alternativeRightAnswer.modelValue = question.questionOptions.rightAnswer
        questionFromBack.requiredAnswer.modelValue = question.mandatoryQuestion
        questionFromBack.needJustifyAnswer.modelValue = question.justifyTextBox ? 1 : 2

        if (question.typeQuestion.id === QuestionType.Alternatives) {
          questionFromBack.alternatives = question.questionOptions.alternatives.map(
            (alternative) => {
              const alternativeConvertida = makeTextField('alternative')

              alternativeConvertida.modelValue = alternative

              return alternativeConvertida
            }
          )
        }

        this.questions.push(questionFromBack)
      })
    },

    validateResearch(notify: any): boolean {
      const TEXT_KEYS = ['searchTitle', 'searchDescription', 'searchAcknowledgement'] as const
      const textFormArrayOfResearchValidation: InputTextFormProps[] = TEXT_KEYS.map(
        (key) => this.$state[key]
      )

      const SELECT_KEYS = ['searchType', 'searchAnonymity', 'multipleAnswerSearch'] as const
      const selectFormArrayOfResearchValidation: SelectFormProps<number>[] = SELECT_KEYS.map(
        (key) => this.$state[key]
      )

      validateTextFormFields(textFormArrayOfResearchValidation)
      validateSelectFormFieldsNumber(selectFormArrayOfResearchValidation)

      const inputTextCheck = textFormArrayOfResearchValidation.every(
        (InputTextForm) => InputTextForm.isValid
      )
      const inputSelectCheck = selectFormArrayOfResearchValidation.every(
        (InputTextForm) => InputTextForm.isValid
      )

      const validate = Boolean(inputTextCheck && inputSelectCheck)

      if (!validate) {
        notify.error('You need to fill in the survey data to proceed')
      }

      return validate
    },

    validateVision(notify: any): boolean {
      const validate = this.visions.length > 0

      if (!validate) {
        notify.error('At least one view must be completed')
      }

      return validate
    },

    eraseIdenticalOrder(indexElementChange: number, newValueElement: number) {
      this.questions.forEach((question, indexQuestion) => {
        if (question.order.modelValue === newValueElement && indexQuestion !== indexElementChange) {
          question.order.modelValue = undefined
        }
      })
    },

    reorderQuestion() {
      this.questions.sort(sortByOrdemQuestionForm)
    },

    validateQuestions(notify: any): boolean {
      let validate = true

      for (let i = 0; i < this.questions.length; i++) {
        if (!this.questions[i]!.question?.modelValue) {
          validate = false
          notify.error('All questions must have a title')
          break
        }
        if (!this.questions[i]!.typeQuestion?.modelValue) {
          notify.error(`Question: "${this.questions[i]!.question.modelValue}" must have Type`)
          validate = false
        }
        if (!this.questions[i]!.order?.modelValue) {
          notify.error(`Question: "${this.questions[i]!.question.modelValue}" must haver order`)
          validate = false
        }
        if (
          !this.questions[i]!.visions.modelValue ||
          (this.questions[i]!.visions.modelValue &&
            this.questions[i]!.visions.modelValue!.length === 0)
        ) {
          notify.error(
            `It is required completing the vision in: "${this.questions[i]!.question.modelValue}"`
          )
          validate = false
        }
      }

      return validate
    },

    fillBasicInformation(): void {
      this.searchCategory.modelValue = 0
      this.searchType.modelValue = 1
      this.searchAnonymity.modelValue = 1
      this.multipleAnswerSearch.modelValue = 2
    },
  },
})
