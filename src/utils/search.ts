import type { Options, InputTextFormProps, SelectFormProps } from '@/utils/form-type.ts'
import type {
  QuestionDimension,
  QuestionForm,
  QuestionFormResponse,
  QuestionVision,
} from '@/utils/question.ts'

type UUID = string

enum CategoryTemplateEnum {
  General = 0,
  AutonomyAndTrust = 1,
  Benefits = 2,
  Comradeship = 3,
  WorkloadAndMentalHealth = 4,
  CollaborationBetweenAreas = 5,
  InternalCommunication = 6,
  Credibility = 7,
  Clime = 8,
  Culture = 9,
  DevelopmentAndCareer = 10,
  Engagement = 11,
  Impartiality = 12,
  IntegrationAndOnboarding = 13,
  LeadershipAndManagement = 14,
  Pride = 15,
  RecognitionAndFeedback = 16,
  Remuneration = 17,
  Respect = 18,
  Salary = 19,
  PsychologicalSafety = 20,
}
enum ResearchTypeEnum {
  Default = 1,
  ScaleStress = 2,
  StoicWheelOfLife = 3,
  Csat = 4,
}
enum AnonymousTypeEnum {
  NotAnonymous = 1,
  Anonymous = 2,
  Optional = 3,
  External = 4,
}

export const searchCategoryTypeOptions: Options<number>[] = [
  { label: 'General', value: CategoryTemplateEnum.General },
  { label: 'Autonomy and Trust', value: CategoryTemplateEnum.AutonomyAndTrust },
  { label: 'Benefits', value: CategoryTemplateEnum.Benefits },
  { label: 'Comradeship', value: CategoryTemplateEnum.Comradeship },
  {
    label: 'Workload and Mental Health',
    value: CategoryTemplateEnum.WorkloadAndMentalHealth,
  },
  { label: 'Collaboration between Areas', value: CategoryTemplateEnum.CollaborationBetweenAreas },
  { label: 'Internal Communication', value: CategoryTemplateEnum.InternalCommunication },
  { label: 'Credibility', value: CategoryTemplateEnum.Credibility },
  { label: 'Clime', value: CategoryTemplateEnum.Clime },
  { label: 'Culture', value: CategoryTemplateEnum.Culture },
  { label: 'Development and Career', value: CategoryTemplateEnum.DevelopmentAndCareer },
  { label: 'Engagement', value: CategoryTemplateEnum.Engagement },
  { label: 'Impartiality', value: CategoryTemplateEnum.Impartiality },
  { label: 'Integration and Onboarding', value: CategoryTemplateEnum.IntegrationAndOnboarding },
  { label: 'Leadership and Management', value: CategoryTemplateEnum.LeadershipAndManagement },
  { label: 'Pride', value: CategoryTemplateEnum.Pride },
  { label: 'Recognition and Feedback', value: CategoryTemplateEnum.RecognitionAndFeedback },
  { label: 'Remuneration', value: CategoryTemplateEnum.Remuneration },
  { label: 'Respect', value: CategoryTemplateEnum.Respect },
  { label: 'Salary', value: CategoryTemplateEnum.Salary },
  { label: 'Psychological Safety', value: CategoryTemplateEnum.PsychologicalSafety },
]
export const searchTypeOptions: Options<number>[] = [
  {
    label: 'Default',
    value: ResearchTypeEnum.Default,
  },
  {
    label: 'Stress Scale',
    value: ResearchTypeEnum.ScaleStress,
  },
  {
    label: 'Stoic Wheel of Life',
    value: ResearchTypeEnum.StoicWheelOfLife,
  },
  {
    label: 'CSAT',
    value: ResearchTypeEnum.Csat,
  },
]
export const anonymousTypeOptions: Options<number>[] = [
  {
    label: 'Not Anonymous',
    value: AnonymousTypeEnum.NotAnonymous,
  },
  {
    label: 'Anonymous',
    value: AnonymousTypeEnum.Anonymous,
  },
  {
    label: 'Optional',
    value: AnonymousTypeEnum.Optional,
  },
  {
    label: 'External',
    value: AnonymousTypeEnum.External,
  },
]
export const yesOrNoOption: Options<number>[] = [
  {
    label: 'Yes',
    value: 1,
  },
  {
    label: 'No',
    value: 2,
  },
]

export interface EnumerationDto {
  id: number | undefined
  label?: string
  description?: string
}
export interface SearchForm {
  Id?: UUID

  searchTitle: InputTextFormProps
  searchDescription: InputTextFormProps
  searchAcknowledgement: InputTextFormProps

  searchCategory: SelectFormProps<number>
  searchType: SelectFormProps<number>
  searchAnonymity: SelectFormProps<number>
  multipleAnswerSearch: SelectFormProps<number>

  dimensions: QuestionDimension[]
  visions: QuestionVision[]
  questions: QuestionForm[]
}
export interface SearchFormResponse {
  searchId?: UUID

  title: string
  description: string
  acknowledgement: string

  category: EnumerationDto
  searchType: EnumerationDto
  anonymity: EnumerationDto
  multipleAnswerSearch: boolean

  dimensions: QuestionDimension[]
  visions: QuestionVision[]
  questions: QuestionFormResponse[]
}
