import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'
import { contactEndpoint, contactTimeoutMs } from '../../data/contactData'

function fillValidForm(): void {
  fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { value: '  Matías  ' } })
  fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { value: 'matias@example.com' } })
  fireEvent.change(screen.getByLabelText(/Asunto/), { target: { value: '  Consulta  ' } })
  fireEvent.change(screen.getByLabelText(/^Mensaje/), { target: { value: '  Quiero conversar sobre un proyecto.  ' } })
}

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('Formulario de contacto', () => {
  it('rechaza campos vacíos o con espacios y dirige el foco al primer error', () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { value: '   ' } })
    fireEvent.submit(screen.getByRole('form'))
    expect(fetchMock).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(screen.getByLabelText(/Nombre completo/))
    expect(screen.getByLabelText(/Nombre completo/).getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByRole('status').textContent).toContain('Revisa los campos')
  })

  it('bloquea duplicados, envía valores recortados y limpia solo al confirmar éxito', async () => {
    let resolveResponse!: (response: Response) => void
    const pending: Promise<Response> = new Promise(resolve => { resolveResponse = resolve })
    const fetchMock = vi.fn<typeof fetch>().mockReturnValue(pending)
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)
    fillValidForm()
    fireEvent.submit(screen.getByRole('form'))
    fireEvent.submit(screen.getByRole('form'))
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect((screen.getByRole('button', { name: 'Enviando…' }) as HTMLButtonElement).disabled).toBe(true)
    expect((screen.getByLabelText(/Nombre completo/) as HTMLInputElement).readOnly).toBe(true)
    expect(fetchMock.mock.calls[0][0]).toBe(contactEndpoint)
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      name: 'Matías', email: 'matias@example.com', subject: 'Consulta', message: 'Quiero conversar sobre un proyecto.',
    })
    await act(async () => { resolveResponse(new Response(null, { status: 200 })) })
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('¡Mensaje enviado!'))
    expect((screen.getByLabelText(/Nombre completo/) as HTMLInputElement).value).toBe('')
    expect(screen.getByText('0 / 5000 caracteres')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Enviar mensaje' }) as HTMLButtonElement).disabled).toBe(false)
  })

  it.each([429, 500])('conserva el mensaje ante un error HTTP %s y permite reintentar', async (status: number) => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status }))
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)
    fillValidForm()
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain(status === 429 ? 'más mensajes' : 'No se pudo enviar'))
    expect((screen.getByLabelText(/^Mensaje/) as HTMLTextAreaElement).value).toContain('Quiero conversar')
    expect((screen.getByLabelText(/Nombre completo/) as HTMLInputElement).readOnly).toBe(false)
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }))
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('¡Mensaje enviado!'))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('conserva los datos cuando la red falla', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch')))
    render(<ContactForm />)
    fillValidForm()
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Revisa tu conexión'))
    expect((screen.getByLabelText(/^Mensaje/) as HTMLTextAreaElement).value).toContain('Quiero conversar')
  })

  it('cancela por timeout sin reenviar ni afirmar que el mensaje no llegó', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn<typeof fetch>().mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Cancelado', 'AbortError')))
    }))
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)
    fillValidForm()
    fireEvent.submit(screen.getByRole('form'))
    await act(async () => { await vi.advanceTimersByTimeAsync(contactTimeoutMs) })
    expect(screen.getByRole('status').textContent).toContain('No podemos asegurar si llegó')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect((screen.getByLabelText(/^Mensaje/) as HTMLTextAreaElement).value).toContain('Quiero conversar')
    expect((screen.getByRole('button', { name: 'Enviar mensaje' }) as HTMLButtonElement).disabled).toBe(false)
  })

  it('cancela la petición y su temporizador al abandonar Contacto', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn<typeof fetch>().mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Cancelado', 'AbortError')))
    }))
    vi.stubGlobal('fetch', fetchMock)
    const { unmount } = render(<ContactForm />)
    fillValidForm()
    fireEvent.submit(screen.getByRole('form'))
    await act(async () => { unmount() })
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect(vi.getTimerCount()).toBe(0)
  })
})
