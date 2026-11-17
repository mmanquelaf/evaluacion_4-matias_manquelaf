# React + TypeScript + Vite

Base inicial del proyecto de la Evaluación 4. Usa React, TypeScript en modo
estricto y ESLint. Conserva la pantalla inicial de Vite.

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

`build` comprueba los tipos y genera la carpeta `dist/`.

## Estructura inicial

- `src/App.tsx`: componente principal.
- `src/main.tsx`: punto de entrada de React.
- `src/vite-env.d.ts`: tipos de Vite para recursos y variables de entorno.
- `vite.config.ts`: configuración de Vite.
- `tsconfig.app.json`: configuración estricta del código de la aplicación.
- `tsconfig.node.json`: configuración TypeScript para Vite.
- `eslint.config.js`: revisión del código y prohibición de `any` explícito.
