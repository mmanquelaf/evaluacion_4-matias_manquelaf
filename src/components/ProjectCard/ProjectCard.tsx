import type { ProjectCardProps } from '../../types'
import './ProjectCard.css'

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card" aria-labelledby={`project-${project.id}`}>
      <div className="project-card__art" aria-hidden="true">
        <span className="project-card__star">✦</span>
        <span className="project-card__caption">SPACE / SHOOTER</span>
      </div>
      <p className="project-card__category">{project.category}</p>
      <h2 className="project-card__title" id={`project-${project.id}`}>{project.title}</h2>
      <p>{project.description}</p>
      <ul className="project-card__tags" aria-label="Tecnologías">
        {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <a className="project-card__link" href={project.urlRepo} target="_blank" rel="noopener noreferrer">
        Ver repositorio de {project.title}
        <span aria-hidden="true">↗</span>
        <span className="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
    </article>
  )
}
