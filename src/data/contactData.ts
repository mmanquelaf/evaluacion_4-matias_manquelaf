import type { ContactFieldDefinition, ContactValues } from '../types/interactions'

export const contactEndpoint: string = 'https://formspree.io/f/maeoopdj'
export const contactTimeoutMs: number = 20000
export const emptyContactValues: ContactValues = { name: '', email: '', subject: '', message: '' }

export const contactFields: ContactFieldDefinition[] = [
  { name: 'name', label: 'Nombre completo', placeholder: 'Tu nombre', minLength: 2, maxLength: 100, required: true, autoComplete: 'name' },
  { name: 'email', label: 'Correo electrónico', placeholder: 'tu@correo.cl', maxLength: 254, required: true, autoComplete: 'email', type: 'email' },
  { name: 'subject', label: 'Asunto (opcional)', placeholder: '¿Sobre qué conversamos?', maxLength: 150 },
  { name: 'message', label: 'Mensaje', placeholder: 'Cuéntame tu idea…', minLength: 10, maxLength: 5000, required: true, multiline: true },
]
