import type { QuestionForm } from '@/utils/question'

export const sortByOrdemQuestionForm = (a: QuestionForm, b: QuestionForm) => {
  const ordemA = a.order?.modelValue
  const ordemB = b.order?.modelValue

  if (typeof ordemA === 'number' && typeof ordemB === 'number') {
    return ordemA - ordemB
  }
  if (ordemA === undefined) return 1
  if (ordemB === undefined) return -1
  return 0
}
