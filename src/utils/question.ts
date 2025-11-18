import type {
  Options,
  InputTextFormProps,
  InputNumberFormProps,
  SelectFormProps,
  MultiSelectFormProps,
} from '@/utils/form-type.ts'
import type { EnumerationDto } from '@/utils/search'

type UUID = string

interface OptionsQuestion {
  idQuestion?: UUID
  justifyTextBox: boolean
  selectMoreThanOneOption: boolean
  existsRightAnswer: boolean
  rightAnswer: string | undefined
  alternatives: (string | undefined)[]
  textForLowestGrade: string
  textForHighestGrade: string
  valueForLowestGrade: number
  valueForHighestGrade: number
}

export enum QuestionType {
  TextBox = 1,
  MoodScale = 2,
  Alternatives = 3,
  NumberScale = 4,
}

export const questionSelectOptions: Options<number>[] = [
  {
    label: 'Text Box',
    value: QuestionType.TextBox,
  },
  {
    label: 'Mood Scale',
    value: QuestionType.MoodScale,
  },
  {
    label: 'Alternatives',
    value: QuestionType.Alternatives,
  },
  {
    label: 'Number Scale',
    value: QuestionType.NumberScale,
  },
]

export interface QuestionDimension {
  id?: UUID | null
  label: string
}
export interface QuestionVision {
  id?: UUID | null
  label: string
  standard: boolean
}
export interface QuestionForm {
  idQuestion?: UUID
  order: SelectFormProps<number>
  typeQuestion: SelectFormProps<number>
  visions: MultiSelectFormProps<QuestionVision>
  dimensions: SelectFormProps<QuestionDimension>

  question: InputTextFormProps
  textForLowestGrade: InputTextFormProps
  textForHighestGrade: InputTextFormProps

  valueForLowestGrade: InputNumberFormProps
  valueForHighestGrade: InputNumberFormProps

  requiredAnswer: SelectFormProps<number>
  needJustifyAnswer: SelectFormProps<number>

  alternativeMultipleSelection: SelectFormProps<number>
  alternativeExistsRightAnswer: SelectFormProps<number>
  alternativeWeight: SelectFormProps<number>
  alternativeRightAnswer: SelectFormProps<string>
  alternatives: InputTextFormProps[]
}
export interface QuestionFormResponse {
  idQuestion?: UUID
  questionTitle: string
  alternativeWeight?: number
  mandatoryQuestion: number
  order: number
  typeQuestion: EnumerationDto
  questionOptions: OptionsQuestion
  visions?: QuestionVision[]
  dimension?: QuestionDimension
  justifyTextBox: number
}
