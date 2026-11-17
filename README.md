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
| `/proyectos` | Portafolio EV2 y SpaceShooter con datos de GitHub |
| `/contacto` | Formulario con validación y envío mediante Formspree |
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


## API pública elegida: GitHub REST API

Se eligió GitHub porque permite mostrar proyectos públicos reales del mismo autor,
complementando la presentación de SpaceShooter y manteniendo actualizado el portafolio.
No se utilizan claves ni credenciales.

- URL base: https://api.github.com
- Endpoint: GET /users/mmanquelaf/repos
- Consulta completa: https://api.github.com/users/mmanquelaf/repos?sort=updated&per_page=6
- sort=updated: ordena por actualización; la dirección descendente es la predeterminada.
- per_page=6: solicita como máximo seis resultados de la primera página.
- Cabecera: Accept: application/vnd.github+json.

Contrato documentado por GitHub:
https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

### JSON esperado

La respuesta es un arreglo de repositorios. Este es un ejemplo ilustrativo del
subconjunto de propiedades utilizado; no representa una captura real de la API:

```json
[
  {
    "id": 123,
    "name": "ejemplo",
    "description": null,
    "html_url": "https://github.com/mmanquelaf/ejemplo",
    "language": "TypeScript",
    "stargazers_count": 0,
    "updated_at": "2026-11-17T12:00:00Z"
  }
]
```

GitHubRepo define esos campos en src/types/api.ts. description y language pueden ser
null y tienen texto alternativo visible. El JSON entra como unknown y se valida
antes de renderizarlo: tipos de campos, contadores enteros no negativos, fechas y
enlaces HTTPS de repositorio en github.com. Una respuesta incompatible se presenta
como error, sin convertirla mediante una aserción de tipos sin validar.

### Estados, cancelación y proyectos seleccionados

useFetchApi realiza la consulta con fetch y useEffect y expone data, loading, error
y retry. Comprueba HTTP antes de interpretar JSON y muestra carga, error y reintento.
La limpieza del efecto cancela la petición y el temporizador con AbortController.
El límite de espera es de 20 segundos y una respuesta anterior no puede reemplazar
la actual. No se realizan consultas periódicas ni reintentos automáticos.

Solo se muestran dos tarjetas: Portafolio EV2 (portafolio) y SpaceShooter
(EID-SpaceShooter). No hay buscador ni selector de lenguaje. Los nombres de repositorio
se configuran junto a cada ProjectItem en src/data/portfolioData.ts; los otros
repositorios recibidos se omiten y SpaceShooter no se duplica en otra lista.

La consulta conserva per_page=6, pero esa cantidad no obliga a mostrar seis tarjetas.
Se seleccionan los datos de esos dos proyectos dentro de la respuesta. Cada tarjeta
integra nombre real del repositorio, descripción de GitHub cuando está disponible,
lenguaje principal, estrellas, fecha y enlace. Si description es null se conserva la
explicación del proyecto que ya existía en el portafolio.

Los enlaces y descripciones locales siguen disponibles durante carga o error. Si
alguno de los repositorios no está entre los resultados de la consulta reciente,
se informa que faltan datos y no se inventan estadísticas. El reintento dirige el
foco a la región de proyectos.

### Verificación de la API

Pasaron build, lint y las 26 pruebas del proyecto: nueve del formulario y diecisiete
para la API y los dos proyectos. Las pruebas usan respuestas simuladas y cubren
carga, selección de EV2/EID, ausencia de tarjetas duplicadas y controles de búsqueda,
datos nulos, HTTP 403/404/429/500, JSON incompatible, red, reintento, timeout,
cancelación y respuestas que llegan fuera de orden.

La consulta real de GitHub se comprobó el 17 de noviembre de 2026. Los datos son
externos y pueden cambiar; no se garantiza su disponibilidad permanente.
