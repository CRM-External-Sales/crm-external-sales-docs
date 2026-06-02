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

## Respuesta (ejemplo) — login (administración)

Ejemplo de respuesta al autenticar (mismo shape que usa el cliente para guardar sesión):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "admin1",
      "email": "admin@ejemplo.com",
      "phone": "88888888",
      "role": "admin",
      "created_at": "2026-06-01T12:00:00.000Z",
      "updated_at": "2026-06-01T12:00:00.000Z"
    },
    "session": {
      "access_token": "jwt",
      "refresh_token": "jwt",
      "expires_in": 3600,
      "token_type": "bearer"
    }
  }
}
```

## Cliente

- `src/features/users/View.tsx`, `Create.tsx`, `Edit.tsx`
- Rutas: `/usuarios`, `/usuarios/crear`
- Hook: `useUsers.ts`
