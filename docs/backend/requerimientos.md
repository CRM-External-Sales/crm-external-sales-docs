# Requerimientos (Backend / entorno)

## Software

| Componente | Versión mínima recomendada |
|------------|----------------------------|
| Node.js | 20 LTS |
| npm | 10+ |
| PostgreSQL | 14+ (Supabase o local) |
| Cuenta Supabase | Auth + Storage |

## Servicios externos

- **PostgreSQL** — esquemas `public` (negocio) y `auth` (Supabase).
- **Supabase Auth** — login, logout, reset password.
- **Supabase Storage** — buckets `tours`, `tour-images`.

## Variables obligatorias

Ver [Variables de entorno](variables-entorno.md).

## Generación de cliente Prisma

Tras clonar o cambiar `schema.prisma`:

```bash
npx prisma generate
```

El cliente se genera en `src/generated/prisma` (no versionar; ver `.gitignore`).
