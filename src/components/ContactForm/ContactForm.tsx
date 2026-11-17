import { contactFields } from '../../data/contactData'
import { useContactForm } from '../../hooks/useContactForm'
import { ContactField } from '../ContactField/ContactField'
import './ContactForm.css'

export function ContactForm() {
  const { values, errors, status, sending, statusRef, onChange, onBlur, onSubmit } = useContactForm()

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit} aria-label="Formulario de contacto" aria-describedby="contact-note" aria-busy={sending}>
      <div className="contact-form__fields">
        {contactFields.map(field => (
          <ContactField
            key={field.name} {...field}
            value={values[field.name]} error={errors[field.name]}
            readOnly={sending} onChange={onChange} onBlur={onBlur}
          />
        ))}
      </div>
      <p className="contact-form__note" id="contact-note">
        * Campos obligatorios. Al enviar, tus datos se procesan mediante Formspree para hacerme llegar tu mensaje.
      </p>
      <button className="button contact-form__submit" type="submit" disabled={sending}>
        {sending ? 'Enviando…' : 'Enviar mensaje'}
      </button>
      <p className={`contact-form__status contact-form__status--${status.state}`} role="status" aria-live="polite" aria-atomic="true" ref={statusRef} tabIndex={-1}>
        {status.message}
      </p>
    </form>
  )
}
