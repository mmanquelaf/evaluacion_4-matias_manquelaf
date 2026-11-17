import { describe, expect, it } from 'vitest'
import { validateContact } from './contactService'
import type { ContactValues } from '../types/interactions'

const valid: ContactValues = { name: 'Matías', email: 'matias@example.com', subject: '', message: 'Un mensaje suficientemente largo.' }

describe('Límites del formulario', () => {
  it('acepta el asunto vacío y los límites máximos de nombre y mensaje', () => {
    expect(validateContact({ ...valid, name: 'M'.repeat(100), message: 'a'.repeat(5000) })).toEqual({})
  })
  it('valida espacios, correo y los límites superiores aunque se eluda maxlength', () => {
    const errors = validateContact({ name: ' ', email: 'correo-invalido', subject: 'a'.repeat(151), message: 'a'.repeat(5001) })
    expect(Object.keys(errors)).toEqual(['name', 'email', 'subject', 'message'])
    expect(validateContact({ ...valid, message: '          ' }).message).toBeTruthy()
  })
})
