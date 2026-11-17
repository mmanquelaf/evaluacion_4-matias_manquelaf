import { PageSection } from '../components/PageSection/PageSection'
import { ProjectCard } from '../components/ProjectCard/ProjectCard'
import { projects } from '../data/portfolioData'

export function ProjectsPage() {
  return (
    <PageSection title="Mis trabajos" eyebrow="02 / Práctica" headingId="projects-title">
      {projects.map(project => <ProjectCard key={project.id} project={project} />)}
    </PageSection>
  )
}
