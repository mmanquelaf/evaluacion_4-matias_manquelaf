import { PageSection } from '../components/PageSection/PageSection'
import { aboutParagraphs, interests } from '../data/portfolioData'
import profile from '../assets/perfil.jpg'
import './AboutPage.css'

export function AboutPage() {
  return (
    <PageSection
      title="Sobre mí"
      eyebrow="01 / Presentación"
      headingId="about-title"
      headingContent={
        <img className="profile" src={profile} alt="Emblema blanco de Spider-Man sobre fondo negro y rojo, avatar de Matías" width={160} height={160} />
      }
    >
      <p className="lead">Aprender, probar, equivocarme y volver a intentarlo.</p>
      {aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <ul className="interests" aria-label="Áreas de interés">
        {interests.map(interest => (
          <li className={`interests__item interests__item--${interest.tone}`} key={interest.title}>
            <h2 className="interests__title">{interest.title}</h2>
            <p className="interests__text">{interest.description}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  )
}
