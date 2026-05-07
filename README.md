# Lab8 Serie

Proyecto para consultar una serie en TVMaze y visualizar sus episodios agrupados por temporada.

## Estructura

```text
Lab8_Serie/
├── src/
│   ├── services/
│   │   └── tvmaze.js
│   ├── index.html
│   ├── index.css
│   └── index.js
├── index.html
├── README.md
├── .gitignore
└── package.json
```

## Uso

Abre `src/index.html` en el navegador. El proyecto carga una serie por ID desde TVMaze y muestra sus temporadas con episodios coloreados por rating.

## GitHub Pages

El proyecto incluye un `index.html` en la raiz para que GitHub Pages pueda abrir la pagina automaticamente.

En GitHub:

1. Entra al repositorio.
2. Ve a `Settings`.
3. Entra a `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Selecciona la rama principal y la carpeta `/root`.
