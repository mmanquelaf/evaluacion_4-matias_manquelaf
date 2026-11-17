import type { Interest, NavigationItem, ProjectItem } from '../types'

export const navigation: NavigationItem[] = [
  { path: '/', label: 'Inicio', pageTitle: 'Inicio' },
  { path: '/sobre-mi', label: 'Sobre mí', pageTitle: 'Sobre mí' },
  { path: '/proyectos', label: 'Trabajos', pageTitle: 'Mis trabajos' },
  { path: '/contacto', label: 'Contacto', pageTitle: 'Contacto' },
]

export const introduction: string = 'Soy estudiante de informática. Me interesa entender cómo funciona la tecnología y aprender a crear soluciones útiles para las personas.'
export const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'Python']

export const aboutParagraphs: string[] = [
  'Soy Matías, estudiante de informática. Me gusta descubrir cómo funcionan las cosas y pasar de una idea a algo que pueda usar, mostrar y mejorar. Estoy construyendo mis bases en programación y desarrollo web, un proyecto a la vez.',
  'Este portafolio es parte de ese proceso. Aquí comparto lo que voy creando, los desafíos que encuentro y lo que aprendo al resolverlos. Desde una página web hasta un juego como SpaceShooter, cada proyecto me da una razón para seguir explorando.',
]

export const interests: Interest[] = [
  { tone: 'accent', title: 'Programación', description: 'Entender la lógica y encontrar distintas maneras de resolver un problema.' },
  { tone: 'gold', title: 'Desarrollo web', description: 'Aprender a construir páginas claras, accesibles y fáciles de usar.' },
  { tone: 'rose', title: 'Tecnología', description: 'Explorar nuevas herramientas y comprender cómo funcionan.' },
]

export const projects: ProjectItem[] = [
  {
    id: 'portafolio',
    title: 'Portafolio · EV2',
    repositoryName: 'portafolio',
    description: 'Mi portafolio personal de aprendizaje, creado con HTML, CSS y JavaScript, con diseño responsive y modo claro y oscuro.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    urlRepo: 'https://github.com/mmanquelaf/portafolio',
    category: 'Desarrollo web · Evaluación 2',
  },
  {
    id: 'spaceshooter',
    repositoryName: 'EID-SpaceShooter',
    title: 'SpaceShooter',
    description: 'Un juego espacial 2D con oleadas de enemigos, un jefe final y disparos con trayectorias rectas, parabólicas y elípticas.',
    technologies: ['Python', 'Pygame'],
    urlRepo: 'https://github.com/mmanquelaf/EID-SpaceShooter',
    category: 'Videojuego · Proyecto académico en equipo',
  },
]
