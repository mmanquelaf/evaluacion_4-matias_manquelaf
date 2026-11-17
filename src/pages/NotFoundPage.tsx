import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="hero" aria-labelledby="not-found-title">
      <p className="eyebrow">Error 404</p>
      <h1 className="section__title" id="not-found-title">Esta página no existe</h1>
      <p>El enlace puede haber cambiado. Puedes continuar desde el inicio.</p>
      <Link className="button" to="/">Volver al inicio</Link>
    </section>
  )
}
