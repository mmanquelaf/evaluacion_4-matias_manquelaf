import { useEffect, useRef, useState } from 'react'
import { contactTimeoutMs, emptyContactValues } from '../data/contactData'
import { sendContact, validateContact } from '../services/contactService'
import type {
  ContactChangeEvent, ContactErrors, ContactFieldName, ContactFormState,
  ContactSubmitEvent, ContactValues, PendingContactRequest, SubmitStatus,
} from '../types/interactions'

export function useContactForm(): ContactFormState {
  const [values, setValues] = useState<ContactValues>(emptyContactValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<SubmitStatus>({ state: 'idle', message: '' })
  const activeRequest = useRef<PendingContactRequest | null>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => () => {
    const request: PendingContactRequest | null = activeRequest.current
    activeRequest.current = null
    if (request) {
      clearTimeout(request.timeout)
      request.controller.abort()
    }
  }, [])

  function onChange(event: ContactChangeEvent): void {
    if (activeRequest.current) return
    const name: ContactFieldName = event.currentTarget.name as ContactFieldName
    const next: ContactValues = { ...values, [name]: event.currentTarget.value }
    setValues(next)
    if (errors[name]) setErrors(previous => ({ ...previous, [name]: validateContact(next)[name] }))
    setStatus({ state: 'idle', message: '' })
  }

  function onBlur(name: ContactFieldName): void {
    if (!activeRequest.current) setErrors(previous => ({ ...previous, [name]: validateContact(values)[name] }))
  }

  async function onSubmit(event: ContactSubmitEvent): Promise<void> {
    event.preventDefault()
    if (activeRequest.current) return
    const form: HTMLFormElement = event.currentTarget
    const nextErrors: ContactErrors = validateContact(values)
    setErrors(nextErrors)
    const firstInvalid: string | undefined = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      setStatus({ state: 'error', message: 'Revisa los campos indicados antes de enviar.' })
      const field: Element | RadioNodeList | null = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    const controller: AbortController = new AbortController()
    let timedOut: boolean = false
    const request: PendingContactRequest = {
      controller,
      timeout: setTimeout(() => { timedOut = true; controller.abort() }, contactTimeoutMs),
    }
    activeRequest.current = request
    setStatus({ state: 'loading', message: 'Enviando tu mensaje…' })

    try {
      await sendContact(values, controller.signal)
      if (activeRequest.current !== request) return
      if (controller.signal.aborted) throw new DOMException('Solicitud cancelada', 'AbortError')
      setValues(emptyContactValues)
      setErrors({})
      setStatus({ state: 'success', message: '¡Mensaje enviado! Gracias por escribirme.' })
    } catch (error: unknown) {
      if (activeRequest.current !== request) return
      setStatus({ state: 'error', message: timedOut
        ? 'La confirmación tardó demasiado. No podemos asegurar si llegó el mensaje; compruébalo antes de reenviarlo.'
        : error instanceof TypeError ? 'No pudimos confirmar el envío. Revisa tu conexión; tus datos siguen aquí.'
        : error instanceof Error ? error.message : 'No se pudo confirmar el envío. Inténtalo más tarde.' })
    } finally {
      clearTimeout(request.timeout)
      if (activeRequest.current === request) {
        activeRequest.current = null
        statusRef.current?.focus()
      }
    }
  }

  return { values, errors, status, sending: status.state === 'loading', statusRef, onChange, onBlur, onSubmit }
}
