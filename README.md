# CRM External Sales — Documentación

Sitio estático del manual técnico (MkDocs Material). El código de la aplicación vive en el repositorio **crm-external-sales**.

## Requisitos

- Python 3.11+

## Uso local

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Abrir `http://127.0.0.1:8000`.

## Build

```bash
mkdocs build
```

Salida en `site/`.

## Despliegue (Netlify)

1. Conectar este repositorio en Netlify.
2. El archivo `netlify.toml` ya define build y carpeta de publicación.
3. No hace falta configurar Node.js ni variables de la app CRM.

## Estructura

| Ruta | Contenido |
|------|-----------|
| `docs/` | Páginas del manual |
| `mkdocs.yml` | Configuración del sitio |
