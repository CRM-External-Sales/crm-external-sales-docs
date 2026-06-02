# Inicio

---

## Descripción

Bienvenido a la **documentación técnica de CRM External Sales**, sistema de gestión para venta de tours. El proyecto integra:

- **Panel interno** para administradores y agentes (reservas, proveedores,transfers, reportes, usuarios).
- **Catálogo cliente** (`/catalogo`) para consulta de tours y flujo de reserva orientado al visitante.
- **API REST** bajo `/api/*` (Next.js Route Handlers), autenticación con **Supabase Auth** y persistencia con **PostgreSQL** vía **Prisma**.

La estructura de este manual se divide de la siguiente manera:  **Backend** y **Frontend**.

## Stack resumido

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 4, Radix UI |
| API | Route Handlers + Zod |
| Auth | Supabase (JWT Bearer) |
| ORM | Prisma 6 |
| Estado remoto | TanStack React Query |
| Formularios | React Hook Form + Zod |
| i18n | i18next (catálogo cliente ES/EN) |
| Storage | Supabase Storage (imágenes) |

## Documentos en el repositorio de la aplicación

| Recurso | Contenido |
|---------|-----------|
| [prisma/schema.prisma](https://github.com/your-org/crm-external-sales/blob/main/prisma/schema.prisma) | Modelo de datos |

## Cómo leer este manual

1. **Backend** — arquitectura, instalación, base de datos, router API y módulos por dominio.
2. **Frontend** — rutas App Router, servicios Axios, hooks y vistas por rol.
