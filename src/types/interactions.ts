import type { ChangeEvent, FormEvent, ReactNode, RefObject } from 'react'

export type Theme = 'light' | 'dark'
export type ThemePreference = Theme | null
export type MenuKeyboardEvent = globalThis.KeyboardEvent
export interface ThemeValue {
  theme: Theme
  toggleTheme: () => void
}
export interface ThemeProviderProps { children: ReactNode }

export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}
export type ContactFieldName = keyof ContactValues
export type ContactErrors = Partial<Record<ContactFieldName, string>>
export type ContactChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type ContactSubmitEvent = FormEvent<HTMLFormElement>
export type SubmitState = 'idle' | 'loading' | 'success' | 'error'
export interface SubmitStatus { state: SubmitState; message: string }

export interface ContactFieldDefinition {
  name: ContactFieldName
  label: string
  placeholder: string
  maxLength: number
  minLength?: number
  required?: boolean
  type?: 'text' | 'email'
  autoComplete?: string
  multiline?: boolean
}
export interface ContactFieldProps extends ContactFieldDefinition {
  value: string
  error?: string
  readOnly: boolean
  onChange: (event: ContactChangeEvent) => void
  onBlur: (name: ContactFieldName) => void
}
export interface PendingContactRequest {
  controller: AbortController
  timeout: ReturnType<typeof setTimeout>
}
export interface ContactFormState {
  values: ContactValues
  errors: ContactErrors
  status: SubmitStatus
  sending: boolean
  statusRef: RefObject<HTMLParagraphElement | null>
  onChange: (event: ContactChangeEvent) => void
  onBlur: (name: ContactFieldName) => void
  onSubmit: (event: ContactSubmitEvent) => Promise<void>
}
