import { useRef } from 'react'
import { PageSection } from '../components/PageSection/PageSection'
import { ProjectCard } from '../components/ProjectCard/ProjectCard'
import { StatusMessage } from '../components/StatusMessage/StatusMessage'
import { githubApiUrl } from '../data/apiData'
import { projects } from '../data/portfolioData'
import { useFetchApi } from '../hooks/useFetchApi'
import { decodeRepositories } from '../services/apiService'
import type { GitHubRepo } from '../types/api'
import './ProjectsPage.css'

export function ProjectsPage() {
  const { data: repositories, loading, error, retry } = useFetchApi<GitHubRepo[]>(githubApiUrl, decodeRepositories)
  const contentRef = useRef<HTMLDivElement>(null)
  const availableCount: number = projects.filter(project => repositories?.some(repo => repo.name === project.repositoryName)).length

  function onRetry(): void {
    retry()
    contentRef.current?.focus()
  }

  return (
    <PageSection title="Mis trabajos" eyebrow="02 / Práctica" headingId="projects-title">
      <div className="projects" ref={contentRef} tabIndex={-1} role="region" aria-label="Proyectos seleccionados">
        <p className="projects__intro">Mi portafolio de aprendizaje y un videojuego desarrollado en equipo.</p>
        {loading && <StatusMessage kind="loading" message="Cargando datos de GitHub…" />}
        {!loading && error && <StatusMessage kind="error" message={error} onRetry={onRetry} />}
        {!loading && !error && repositories && availableCount < projects.length && (
          <StatusMessage kind="empty" message="Algunos datos de GitHub no están disponibles en esta consulta. Puedes seguir visitando los proyectos." />
        )}
        <div className="projects__list" aria-busy={loading}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} repo={repositories?.find(repo => repo.name === project.repositoryName)} />
          ))}
        </div>
      </div>
    </PageSection>
  )
}
