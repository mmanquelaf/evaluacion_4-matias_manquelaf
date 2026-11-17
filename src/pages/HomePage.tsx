import { Link } from 'react-router-dom'
import { introduction, skills } from '../data/portfolioData'
import './HomePage.css'

export function HomePage() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <p className="eyebrow">Portafolio de aprendizaje / 2026</p>
      <h1 className="hero__title" id="home-title">
        Hola, soy Matías.<br /><span className="hero__accent">Aprendo creando.</span>
      </h1>
      <p className="hero__text">{introduction}</p>
      <Link className="button" to="/proyectos">
        Conoce mis proyectos <span aria-hidden="true">↗</span>
      </Link>
      <ul className="hero__skills" aria-label="Tecnologías que estoy aprendiendo">
        {skills.map(skill => <li className="hero__skill" key={skill}>{skill}</li>)}
      </ul>
    </section>
  )
}
