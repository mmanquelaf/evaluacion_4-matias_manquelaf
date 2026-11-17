import type { ProjectCardProps } from '../../types'
import { unknownLanguageLabel } from '../../data/apiData'
import './ProjectCard.css'

export function ProjectCard({ project, repo }: ProjectCardProps) {
  const isPortfolio: boolean = project.id === 'portafolio'

  return (
    <article className="project-card" aria-labelledby={`project-${project.id}`}>
      <div className={`project-card__art${isPortfolio ? ' project-card__art--portfolio' : ''}`} aria-hidden="true">
        <span className={`project-card__symbol project-card__symbol--${isPortfolio ? 'code' : 'star'}`}>{isPortfolio ? '</>' : '✦'}</span>
        <span className="project-card__caption">{isPortfolio ? 'PORTAFOLIO / EV2' : 'SPACE / SHOOTER'}</span>
      </div>
      <p className="project-card__category">{project.category}</p>
      <h2 className="project-card__title" id={`project-${project.id}`}>{project.title}</h2>
      <p className="project-card__description">{repo?.description?.trim() || project.description}</p>
      <ul className="project-card__tags" aria-label="Tecnologías">
        {project.technologies.map(technology => <li className="project-card__tag" key={technology}>{technology}</li>)}
      </ul>
      {repo && (
        <div className="project-card__github">
          <p className="project-card__repo-name">Repositorio: {repo.name}</p>
          <ul className="project-card__metadata" aria-label="Datos de GitHub">
            <li>Lenguaje principal: {repo.language ?? unknownLanguageLabel}</li>
            <li><span aria-hidden="true">☆ </span>{repo.stargazers_count.toLocaleString('es-CL')} {repo.stargazers_count === 1 ? 'estrella' : 'estrellas'}</li>
          </ul>
          <p className="project-card__updated">
            Actualizado el <time dateTime={repo.updated_at}>{new Intl.DateTimeFormat('es-CL', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(repo.updated_at))}</time>
          </p>
        </div>
      )}
      <a className="project-card__link" href={repo?.html_url ?? project.urlRepo} target="_blank" rel="noopener noreferrer">
        Ver repositorio de {project.title}
        <span className="project-card__arrow" aria-hidden="true">↗</span>
        <span className="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
    </article>
  )
}
