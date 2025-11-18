interface BaseFormProps {
  name: string
  required: boolean
  isValid: boolean
}

export interface Options<T> {
  label: string
  value: T
  disabled?: boolean
}
export interface InputNumberFormProps extends BaseFormProps {
  modelValue?: number
  min?: number
  max?: number
}
export interface InputTextFormProps extends BaseFormProps {
  maxLength?: number
  modelValue?: string
}
export interface SelectFormProps<T> extends BaseFormProps {
  options?: Options<T>[]
  modelValue?: T
}
export interface MultiSelectFormProps<T> extends BaseFormProps {
  options?: Options<T>[]
  modelValue?: Options<T>[]
}

export function makeTextField(
  label: string,
  required: boolean = false,
  maxLength: number = 200
): InputTextFormProps {
  return {
    name: label,
    required: required,
    isValid: true,
    maxLength: maxLength,
  }
}
export function makeNumberField(
  label: string,
  required: boolean = false,
  min?: number,
  max?: number
): InputNumberFormProps {
  return {
    name: label,
    required: required,
    isValid: true,
    min: min,
    max: max,
  }
}
export function makeSelectField<T>(
  label: string,
  required: boolean = false,
  options?: Options<T>[]
): SelectFormProps<T> {
  return {
    name: label,
    required: required,
    isValid: true,
    options: options,
  }
}
export function makeMultiSelectField<T>(
  label: string,
  required: boolean = false,
  options?: Options<T>[]
): MultiSelectFormProps<T> {
  return {
    name: label,
    required: required,
    isValid: true,
    options: options,
  }
}
export function validateTextFormFields(values: InputTextFormProps[]) {
  for (const field of values) {
    if (!field.required) {
      field.isValid = true
      continue
    }

    let correctValue = false

    if (field.modelValue) {
      correctValue = field.modelValue.trim().length > 0
    }

    field.isValid = correctValue
  }
}
export function validateSelectFormFieldsNumber(values: SelectFormProps<number>[]) {
  for (const field of values) {
    if (!field.required) {
      field.isValid = true
      continue
    }

    const valueCheck = field.modelValue
    let correctValue = false

    if (valueCheck) {
      correctValue = !Number.isNaN(valueCheck)
    }

    field.isValid = correctValue
  }
}
