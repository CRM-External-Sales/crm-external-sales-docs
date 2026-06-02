# Usuarios

**Schema:** `user.schema.ts`  
**Rutas:** `src/app/api/user/route.ts`, `users/route.ts`, `users/[username]/route.ts`

## Perfil — `/api/user`

| Método | Auth | Notas |
|--------|------|-------|
| GET | `withAuth` | Perfil sin contraseña |
| PUT | `withAuth` | Solo `phone`, `email` |
| DELETE | `withAuth` | Siempre **403** `SELF_DELETE_DISABLED` |

## Administración

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/users` | Admin | Query: `page`, `limit`, `role`, `search` |
| POST | `/api/users` | Admin | Crea Auth + `app_user` |
| GET | `/api/users/[username]` | Admin o self | Incluye reservas recientes |
| PUT | `/api/users/[username]` | Admin o self | Non-admin no cambia `role` |
| DELETE | `/api/users/[username]` | Admin | 409 si reservas activas |

## POST crear usuario

| Campo | Validación |
|-------|------------|
| `username` | único |
| `email` | único |
| `password` | política segura |
| `phone` | 8 dígitos |
| `role` | `admin` \| `agent` \| `customer` |

## Frontend

- `src/features/users/View.tsx`, `Create.tsx`, `Edit.tsx`
- Rutas: `/usuarios`, `/usuarios/crear`
- Hook: `useUsers.ts`
