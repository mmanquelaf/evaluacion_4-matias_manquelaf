import type { ContactFieldProps } from '../../types/interactions'

export function ContactField({
  name, label, value, error, minLength, maxLength, type = 'text', multiline = false,
  required = false, autoComplete, placeholder, readOnly, onChange, onBlur,
}: ContactFieldProps) {
  const id: string = `contact-${name}`
  const attributes = {
    id, name, value, required, minLength, maxLength, autoComplete, placeholder, readOnly, onChange,
    onBlur: () => onBlur(name),
    'aria-invalid': Boolean(error),
    'aria-describedby': `${name}-error${multiline ? ' message-count' : ''}`,
  }

  return (
    <div className="contact-form__field">
      <label className="contact-form__label" htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {multiline
        ? <textarea className="contact-form__input" {...attributes} rows={6} />
        : <input className="contact-form__input" {...attributes} type={type} />}
      <span className="contact-form__error" id={`${name}-error`}>{error}</span>
      {multiline && <small className="contact-form__count" id="message-count">{value.length} / {maxLength} caracteres</small>}
    </div>
  )
}
