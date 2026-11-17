import type { GitHubRepo } from './api'
import type { ReactNode } from 'react'

export interface NavigationItem {
  path: string
  label: string
  pageTitle: string
}

export interface Interest {
  tone: 'accent' | 'gold' | 'rose'
  title: string
  description: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  urlRepo: string
  repositoryName: string
  category: string
}

export interface ProjectCardProps {
  project: ProjectItem
  repo?: GitHubRepo
}

export interface PageSectionProps {
  title: string
  eyebrow: string
  headingId: string
  headingContent?: ReactNode
  children: ReactNode
}
