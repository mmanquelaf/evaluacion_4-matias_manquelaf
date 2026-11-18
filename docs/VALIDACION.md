# Validación del portafolio

Revisión técnica: 17 de noviembre de 2026. Revisión local y comprobación de la publicación.
Actualización documental: 18 de noviembre de 2026.
No acredita por sí sola conformidad completa con WCAG ni una evaluación con
dispositivos físicos o lector de pantalla.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| TypeScript y producción (`npm run build`) | Correcto. |
| Reglas de código (`npm run lint`) | Correcto. |
| Pruebas (`npm test`) | 26 pruebas correctas, en cinco archivos. |
| Rutas y 404 | Navegación, ruta activa, retorno al inicio, recarga y retroceso revisados. |
| Vistas a 320, 768 y 1280 px | Inicio, Sobre mí, Trabajos, Contacto y 404 sin desbordamiento horizontal en los anchos comprobados. |
| Tema | Claro y oscuro revisados; preferencia conservada tras recargar. |
| Menú móvil | Apertura, Escape, cierre al navegar y al cambiar de ancho revisados. |
| Teclado | Salto al contenido, activación de enlaces, retorno de foco al menú y primer campo inválido revisados. |
| Tarjetas | Dos proyectos; elevación de 5 px y foco visible comprobados al enfocar el enlace. |
| Formulario | Campos inválidos, contador y estados comprobados. El propietario confirmó también el envío real desde la web publicada y la recepción por correo. |
| API real | GitHub devolvió datos de portafolio y EID-SpaceShooter. |
| Publicación manual | GitHub Pages publica la compilación de gh-pages; se revisaron Inicio, Trabajos, Contacto y la recarga directa de Proyectos. |
| Consola del navegador | Sin errores ni advertencias observados durante la revisión. |

Las nueve pruebas del formulario cubren validación, límites, éxito, errores HTTP y
de red, duplicados, timeout y cancelación. Las diecisiete restantes cubren la API,
selección de dos proyectos, JSON inválido, estados, reintento y respuestas fuera de orden.
Las pruebas usan respuestas simuladas y no envían correos.

## Contraste calculado

Relaciones calculadas a partir de luminancia relativa sRGB, con los valores hexadecimales
de los estilos. Se revisaron combinaciones principales; no cada píxel de los degradados.

| Combinación | Relación |
| --- | --- |
| Texto secundario claro `#706056` sobre `#faf5ee` | 5,54:1 |
| Acento claro `#a13f29` sobre `#faf5ee` | 5,94:1 |
| Texto blanco sobre el extremo más claro del botón `#a13f29` | 6,44:1 |
| Texto secundario oscuro `#c8b5a5` sobre `#2a211c` | 7,96:1 |
| Acento oscuro `#f0ab87` sobre `#1c1714` | 9,20:1 |
| Borde claro anterior `#a68b79` sobre `#faf5ee` | 2,94:1 |
| Borde claro corregido `#9a7e6b` sobre `#faf5ee` | 3,48:1 |
| Borde oscuro `#aa8973` sobre `#2a211c` | 4,90:1 |

## Movimiento

Las transiciones, la elevación y el giro de símbolos se declaran dentro de
`prefers-reduced-motion: no-preference`. Con movimiento reducido se conservan borde,
color y foco, sin esas animaciones. Se inspeccionaron las condiciones CSS y se
comprobó la animación normal con teclado; no se cambió la preferencia del sistema
operativo durante esta revisión.

## Evidencia visual

- [Referencia del portafolio estático actualizado](captura-e2.png).
- [Versión publicada en GitHub Pages](captura-publicacion.png).

## Límites de la revisión

No se ejecutó Lighthouse ni una auditoría integral con lector de pantalla. La
revisión de tamaños usa el navegador y no sustituye dispositivos físicos. El envío
real y su recepción fueron confirmados por el propietario; las pruebas automáticas
y la comprobación del asistente utilizaron respuestas simuladas, sin enviar correos.

El sitio está publicado en https://mmanquelaf.github.io/evaluacion_4-matias_manquelaf/.
La compilación incluye 404.html como copia de index.html para renderizar las rutas
de BrowserRouter al abrirlas directamente; el servidor de Pages puede conservar
un estado HTTP 404 en esas peticiones. No se realizaron envíos reales del formulario
durante la verificación de la publicación.
