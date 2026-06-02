# Requerimientos (Frontend)

Mismos requisitos base que el backend:

- Node.js 20+
- npm 10+
- Variables `NEXT_PUBLIC_*` configuradas (Supabase, `API_URL`, `SITE_URL`)

## Dependencias UI principales

| Paquete | Uso |
|---------|-----|
| `react` / `react-dom` 19 | UI |
| `next` 15 | Framework |
| `@tanstack/react-query` | Cache y fetch |
| `axios` | HTTP client |
| `react-hook-form` + `@hookform/resolvers` | Formularios |
| `zod` | Validación |
| `i18next` / `react-i18next` | Catálogo bilingüe |
| `recharts` | Gráficos reportes |
| `tailwindcss` 4 | Estilos |
| `@radix-ui/*` | Primitivos accesibles |

Ver `package.json` para versiones exactas.
