import type { PageSectionProps } from '../../types'

export function PageSection({ title, eyebrow, headingId, headingContent, children }: PageSectionProps) {
  return (
    <section className="section" aria-labelledby={headingId}>
      <div className="section__heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section__title" id={headingId}>{title}</h1>
        {headingContent}
      </div>
      <div className="section__body">{children}</div>
    </section>
  )
}
