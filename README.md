# Portafolio de Matías · React + TypeScript

Migración del portafolio a una SPA con React, TypeScript estricto y Vite.
Incluye las páginas con React Router y la migración de las interacciones a estado de React.

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
del portafolio actualizado. El tema sigue la preferencia del dispositivo hasta elegir uno con el selector; la elección se conserva en localStorage cuando está disponible.

## Validación de esta etapa

El 17 de noviembre de 2026 pasaron la compilación TypeScript/Vite y ESLint.
En el navegador se revisaron las cuatro rutas, el enlace activo, la página 404,
el retorno al inicio, la recarga directa de `/proyectos`, el retroceso y la
activación de un enlace con Enter. No se observaron errores de consola ni
desbordamiento horizontal en las cuatro vistas a 320 px. El avatar cargó correctamente.
Esto no equivale a una auditoría completa de accesibilidad.

## Próximas etapas

- Incorporar la API pública y sus estados de carga, éxito y error.
- Completar la revisión BEM, accesibilidad, evidencia visual y documentación final.

Al publicar, el alojamiento debe servir `index.html` para las rutas de la SPA;
BrowserRouter necesita esa configuración para abrir o recargar enlaces directos.


## Interacciones migradas a React

- Tema claro/oscuro compartido mediante ThemeProvider, createContext y useContext.
- Menú móvil hasta 700 px con aria-expanded, cierre con Escape y foco de vuelta al botón.
  También se cierra al elegir una ruta y al cambiar entre móvil y escritorio.
- Progreso de lectura actualizado con el desplazamiento y los cambios de tamaño.
- Formulario con inputs controlados, errores asociados a cada campo, contador del mensaje,
  foco en el primer campo inválido y anuncios mediante aria-live.
- Al abandonar Contacto se cancelan la petición pendiente y su temporizador.

La lógica está separada en hooks, servicio HTTP, datos y componentes. Los tipos de las
interacciones están en src/types/interactions.ts. Las animaciones no son necesarias para
utilizar estos controles.

## Contrato del formulario

POST https://formspree.io/f/maeoopdj con Content-Type: application/json y Accept: application/json.
El cuerpo incluye name, email, subject y message, con espacios exteriores recortados.

Nombre obligatorio de 2 a 100 caracteres; correo válido de hasta 254; asunto opcional de
hasta 150; mensaje obligatorio de 10 a 5000. No hay claves privadas en el código.
El aviso junto al botón informa del procesamiento mediante Formspree.

Durante el envío los campos se bloquean y no se admiten solicitudes duplicadas. Solo se
limpian tras una respuesta HTTP exitosa. Ante errores HTTP, de red o límite del servicio
se conservan los valores y se permite reintentar. El límite de espera es de 20 segundos;
si se supera se informa que no pudo confirmarse la recepción, sin reenviar automáticamente.

## Comprobación de interacciones

```sh
npm test
```

Las nueve pruebas automáticas pasaron el 17 de noviembre de 2026, junto con build y lint.
Usan respuestas simuladas: no generan mensajes. Verifican campos inválidos, límites,
éxito, bloqueo de duplicados, datos recortados, errores HTTP 429/500, fallo de red,
timeout y cancelación al desmontar.

En el navegador se comprobaron persistencia del tema tras recargar, ambos temas, menú,
Escape, cierre al navegar y al cambiar de tamaño, errores del formulario vacío,
foco del primer error, contador y progreso de lectura. Contacto no mostró desbordamiento
horizontal a 320 ni a 1280 px y no se observaron errores de consola. No se hizo un envío
real desde React ni una auditoría completa con lector de pantalla.
