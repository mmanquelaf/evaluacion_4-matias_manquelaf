# Inventario de migración E2 → React

## Referencia de partida

La referencia es el portafolio HTML/CSS/JavaScript actualizado antes de esta migración:
[repositorio de la E2](https://github.com/mmanquelaf/portafolio).
Se tomaron en cuenta los cambios acordados en el otro chat: paleta crema/terracota y
café/durazno, avatar de Spider-Man, textos más grandes, menú móvil y formulario Formspree.

La [captura de referencia](docs/captura-e2.png) reproduce la captura de escritorio
guardada el 17 de noviembre de 2026 en el portafolio estático. Se convirtió de JPEG a
PNG sin redimensionar ni modificar el contenido. Corresponde a esa versión actualizada;
no se presenta como una captura de una entrega histórica anterior sin modificaciones.

## Mapeo de secciones y recursos

| Origen estático | Destino React | Tratamiento |
| --- | --- | --- |
| Cabecera y enlaces a secciones | `Navbar` y `Layout` | Navegación con `NavLink` y rutas; marca y colores conservados. |
| Presentación inicial | `HomePage` | Título, descripción y tecnologías conservados; CTA mediante `Link`. |
| Sobre mí e intereses | `AboutPage` | Textos y avatar conservados; intereses tipados en `src/data/portfolioData.ts`. |
| Tarjeta SpaceShooter | `ProjectCard` y `ProjectsPage` | Descripción y enlace recuperados; se agregó la tarjeta del portafolio EV2 por decisión del estudiante. |
| Contacto | `ContactPage`, `ContactForm` y `ContactField` | Campos, endpoint, límites y estados migrados a una interfaz controlada. |
| Foto de perfil y favicon | `src/assets/perfil.jpg`, `public/favicon.svg` | Recursos originales copiados, sin cambiar el repositorio E2. |
| Pie de página | `Layout` | Texto recuperado y retorno al inicio mediante `Link`. |

## Migración de JavaScript

| Comportamiento anterior | Implementación actual |
| --- | --- |
| Cambio de tema y preferencia guardada | `ThemeProvider`, `ThemeContext` y `useTheme`; estado React, `localStorage` y preferencia del dispositivo. |
| Menú móvil, cierre al navegar y Escape | Estado local de `Navbar` y `useMediaQuery`; `aria-expanded`, restauración de foco y limpieza de listeners. |
| Sección activa al desplazarse | Ruta activa con `NavLink`; las vistas ya no se enlazan mediante `#seccion`. |
| Progreso de lectura | `ReadingProgress`, con estado React, `requestAnimationFrame`, `ResizeObserver` y limpieza del efecto. |
| Validación, contador y envío del formulario | `useContactForm`, `contactService` y campos controlados; el contador deriva del valor del mensaje. |
| Confirmación, fallo y bloqueo de duplicados | Estado tipado, bloqueo de edición, temporizador y `AbortController`; no se vacían datos si falla la confirmación. |

La mejora progresiva del formulario HTML sin JavaScript de la versión estática no
se traslada como una garantía de esta SPA: React necesita JavaScript para renderizar.

## Estilos y refactorización BEM

La versión estática acumulaba estilos base y ajustes sucesivos en `styles.css` y
`layout.css`. Se preservaron las variables de color, la jerarquía visual, los fondos,
las proporciones de las tarjetas y los puntos de adaptación, separando ahora:

- `src/styles/tokens.css`: colores y temas.
- `src/styles/base.css`: normalización, tipografía y bloques compartidos.
- `Layout.css`, `Navbar.css`, `PageSection.css`, `ProjectCard.css`, `ContactForm.css`,
  `ReadingProgress.css` y `StatusMessage.css`: estilos de sus componentes.
- `HomePage.css`, `AboutPage.css` y `ProjectsPage.css`: distribución propia de las vistas.

Se sustituyeron dependencias de posición o etiquetas por elementos y modificadores
explícitos: `hero__skill`, `project-card__tag`, `navbar__link--active`,
`contact-form__field--full`, `contact-form__input--invalid` e `interests__item--gold`.
Las tarjetas recuperan elevación y movimiento decorativo con foco y con ratón;
las transformaciones animadas solo se activan si no se solicita movimiento reducido.

## Funcionalidades añadidas

- Rutas Inicio, Sobre mí, Proyectos, Contacto y comodín 404.
- Consulta REST de GitHub con tipos y validación de JSON desde `unknown`.
- Datos dinámicos integrados en solo dos tarjetas: `portafolio` y `EID-SpaceShooter`.
- Gestión explícita de carga, error, datos, reintento y cancelación de peticiones.
- Pruebas de formulario y API, incluidas respuestas fuera de orden y cancelación.

La selección de dos proyectos se realiza por nombre de repositorio. La consulta
mantiene `per_page=6`; si uno no está en esos resultados, se conservan sus datos
locales y se informa de la ausencia de información dinámica, sin inventar estadísticas.

## Accesibilidad y verificación

Se mantienen estructura semántica, etiquetas, textos alternativos, regiones de estado,
foco visible y uso de botones/enlaces nativos. Se reforzó el borde de los campos en
tema claro y se añadió margen de desplazamiento para que el foco no quede bajo la
cabecera fija. Las tarjetas responden también al foco del teclado.

El detalle de las comprobaciones y sus límites está en [VALIDACION.md](docs/VALIDACION.md).
La asistencia utilizada se documenta en [uso_ia.md](uso_ia.md).
