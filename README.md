# Portafolio de Matías · React + TypeScript

Migración del portafolio a una SPA con React, TypeScript estricto y Vite.
Esta etapa incorpora las páginas y la navegación con React Router.

## Ejecutar

```sh
npm install
npm run dev
```

## Comprobar y compilar

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

`build` comprueba los tipos y genera `dist/`.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación y tecnologías |
| `/sobre-mi` | Presentación personal, avatar e intereses |
| `/proyectos` | Proyecto SpaceShooter |
| `/contacto` | Presentación de la sección de contacto |
| Cualquier otra | Página 404 con retorno al inicio |

Se usa BrowserRouter, Routes, Route, Link y NavLink. Los enlaces internos no
recargan el documento y la navegación indica la página activa. Al cambiar de
ruta se actualizan el título de la pestaña, el foco del contenido y el desplazamiento.

## Organización

- `src/components/`: cabecera, distribución, sección de página y tarjeta de proyecto.
- `src/pages/`: vistas vinculadas a las rutas.
- `src/data/portfolioData.ts`: contenido estático separado de los componentes.
- `src/types/index.ts`: interfaces de datos y propiedades.
- `src/assets/`: avatar recuperado del portafolio actualizado.
- `src/index.css`: estilos generales y adaptación responsive.

Se conserva el contenido, la paleta crema/terracota y café/durazno, y el avatar
del portafolio actualizado. El tema sigue la preferencia del dispositivo.

## Validación de esta etapa

El 17 de noviembre de 2026 pasaron la compilación TypeScript/Vite y ESLint.
En el navegador se revisaron las cuatro rutas, el enlace activo, la página 404,
el retorno al inicio, la recarga directa de `/proyectos`, el retroceso y la
activación de un enlace con Enter. No se observaron errores de consola ni
desbordamiento horizontal en las cuatro vistas a 320 px. El avatar cargó correctamente.
Esto no equivale a una auditoría completa de accesibilidad.

## Próximas etapas

- Migrar el selector de tema, menú móvil, progreso y formulario a estado de React.
- Incorporar la API pública y sus estados de carga, éxito y error.
- Completar la revisión BEM, accesibilidad, evidencia visual y documentación final.

La página de Contacto todavía no incluye formulario en esta etapa.
Al publicar, el alojamiento debe servir `index.html` para las rutas de la SPA;
BrowserRouter necesita esa configuración para abrir o recargar enlaces directos.
