# Uso de inteligencia artificial

Esta bitácora corresponde al desarrollo de la EV4 desde el reinicio con una base
React + TypeScript limpia. Describe la asistencia técnica y las decisiones adoptadas
durante esa etapa, con responsabilidad del estudiante sobre el trabajo entregado.

## 1. Herramientas utilizadas

Se utilizó OpenAI Codex, mediante ChatGPT, con el modelo **Sol** y nivel de
razonamiento **Medio**, según la configuración indicada por el estudiante. La
asistencia se empleó para proponer e implementar código, revisarlo y preparar
documentación.

La ejecución y comprobación se hicieron con las herramientas del proyecto: TypeScript,
Vite, ESLint, Vitest y Testing Library, además de revisión en navegador. Son herramientas
de desarrollo y validación; sus resultados no sustituyen la comprensión del código.

## 2. Propósito de uso y condiciones de trabajo

La asistencia se solicitó para convertir la plantilla a TypeScript, separar el
portafolio en componentes y rutas, migrar las interacciones a estado de React,
integrar la API de GitHub y revisar CSS BEM, accesibilidad y diseño responsive.
También se utilizó para preparar pruebas y organizar la documentación técnica.

El trabajo se delimitó mediante estas condiciones:

- Partir de React + TypeScript como base inicial y avanzar por funcionalidad.
- Conservar el diseño y contenido del portafolio actualizado de la E2.
- Reservar al estudiante la creación y gestión de ramas, commits, push y Pull Requests.
  El asistente modifica archivos y ejecuta comprobaciones, sin realizar esas operaciones.
- Mantener tipos estrictos, datos separados y ausencia de `any` explícito.
- Mostrar únicamente el portafolio EV2 y EID-SpaceShooter, sin buscador ni filtros.
- Usar respuestas simuladas para probar errores y no generar mensajes reales del formulario.
- Preparar cambios revisables antes de que el estudiante los registre e integre.

## 3. Prompts representativos

Se incluyen extractos textuales de instrucciones relevantes, no una transcripción
completa de la conversación:

> «Prepara la carpeta a .ts»

Solicitud de preparar la plantilla con TypeScript antes del desarrollo funcional.

> «Okei, empecemos»

Inicio del trabajo organizado por las etapas acordadas y los requerimientos de la EV4.

> «Solo menciona 2 proyectos»

Decisión de reducir la sección de proyectos a los repositorios EV2 y EID-SpaceShooter.

Las condiciones de Git y la separación por etapas se mantuvieron como instrucciones
de trabajo durante este desarrollo.

## 4. Output recibido

La asistencia produjo la configuración TypeScript y ESLint, componentes funcionales,
interfaces, datos tipados, rutas y página 404. Propuso el contexto de tema y los hooks
para menú, formulario y consumo de API, junto con servicios HTTP separados.

Para la API se generó un ciclo de carga, datos y error con `AbortController`, timeout,
reintento y validación de respuesta. Los datos de GitHub se integraron en las tarjetas
seleccionadas. Para el formulario se incorporaron validaciones, contador, bloqueo de
duplicados y conservación de contenido ante errores.

También se prepararon pruebas automáticas, estilos modulares BEM, recuperación de
animaciones, inventario de migración y documentación del contrato técnico de la API.
La reflexión de este documento se redactó con asistencia a petición del estudiante.

## 5. Ajustes, refactorización y verificación

El estudiante definió el alcance por etapas, gestionó el flujo de Git y corrigió la
propuesta de proyectos: se descartaron el buscador, el filtro por lenguaje y el listado
general de repositorios. Se conservaron solo dos tarjetas y se evitó repetir SpaceShooter.

Durante las comprobaciones se corrigieron el foco al reintentar o navegar, la selección
de datos de los proyectos y el comportamiento de peticiones antiguas. Los estilos se
separaron por componente, se incorporaron modificadores BEM explícitos y se reforzó el
contraste de los bordes del formulario.

Las verificaciones de código se ejecutaron con asistencia en el entorno local:

- `npm run build`: comprobación de tipos y empaquetado de producción.
- `npm run lint`: revisión de reglas de React y TypeScript.
- `npm test`: 32 pruebas de formulario, API, tema global y títulos de navegación.
- Revisión en navegador de navegación, tema, menú, formularios, foco, tarjetas y anchos
  de 320, 768 y 1280 px.
- Comprobación de una consulta real de GitHub; los fallos se probaron con simulaciones.

El resultado de estas comprobaciones está detallado en `docs/VALIDACION.md`.
El estudiante confirmó además el envío de un mensaje real desde la web publicada y
su recepción en el correo, de forma independiente a las pruebas simuladas. La revisión
y explicación personal del código forman parte de su responsabilidad sobre la entrega.

Para la publicación se mantuvo el mismo acuerdo: el asistente ajustó la ruta base
de Vite y preparó la compilación; el estudiante creó la rama de publicación y subió
manualmente los archivos a GitHub Pages. No se añadió un workflow propio de despliegue.
La comprobación posterior incluyó navegación y recarga de una ruta publicada.

En la revisión del 18 de noviembre se centralizaron los tipos de eventos y estados
simples y se corrigió el título de pestaña de rutas con barra final. Se añadieron
pruebas del tema y de navegación; pasaron las 32 pruebas, compilación y ESLint.
Se completó además la identificación de la herramienta con modelo Sol y nivel Medio,
según la configuración indicada por el estudiante.

## 6. Reflexión crítica final

La idea central de esta migración es que React organiza la interfaz a partir de
componentes, datos y estado. Cambiar la extensión de un archivo no basta: también hay
que decidir qué responsabilidad tiene cada componente, dónde vive el estado y cómo
se comunican las partes de la página. TypeScript ayuda a expresar esos acuerdos y a
detectar usos incompatibles antes de ejecutar la aplicación.

La IA facilita preparar una estructura y explorar soluciones, pero aceptar código
que funciona sin entenderlo genera deuda cognitiva. Las pruebas aportan evidencia
de comportamiento, aunque no reemplazan la capacidad de explicar por qué una
petición debe cancelarse, por qué se conserva el formulario ante un fallo o por qué
un dato externo necesita validación además de una interfaz.

Para defender el proyecto sin asistencia, necesito repasar especialmente las
dependencias y la limpieza de `useEffect`, la diferencia entre estado local y Context
API, y el recorrido de una respuesta desde `fetch` hasta las tarjetas. Mi criterio
para considerar comprendida la solución es poder seguir ese recorrido, explicar los
estados de error y realizar un cambio pequeño sin depender de una respuesta generada.

El uso responsable de la herramienta consiste en mantener decisiones propias sobre
el alcance, revisar los resultados y reconocer la asistencia recibida. Esa revisión
es parte del aprendizaje y de la responsabilidad sobre el proyecto entregado.
