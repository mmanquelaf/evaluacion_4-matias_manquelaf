import { contactEndpoint } from '../data/contactData'
import type { ContactErrors, ContactValues } from '../types/interactions'

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2 || values.name.length > 100) {
    errors.name = 'Escribe tu nombre (entre 2 y 100 caracteres).'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) {
    errors.email = 'Escribe un correo electrónico válido.'
  }
  if (values.subject.length > 150) errors.subject = 'El asunto debe tener hasta 150 caracteres.'
  if (values.message.trim().length < 10 || values.message.length > 5000) {
    errors.message = 'Escribe un mensaje de entre 10 y 5000 caracteres.'
  }
  return errors
}

export async function sendContact(values: ContactValues, signal: AbortSignal): Promise<void> {
  const response: Response = await fetch(contactEndpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name.trim(), email: values.email.trim(),
      subject: values.subject.trim(), message: values.message.trim(),
    }),
    signal,
  })
  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'El servicio no puede recibir más mensajes ahora. Inténtalo más tarde.'
      : 'No se pudo enviar el mensaje. Tus datos siguen aquí; inténtalo más tarde.')
  }
}
