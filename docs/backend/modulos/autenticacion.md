# Autenticación

**Schema:** `src/app/schemas/user.schema.ts` (`LoginSchema`, `ChangePasswordSchema`, …)  
**Rutas:** `src/app/api/auth/*/route.ts`

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/login` | — | `email`, `password` → `{ user, session }` |
| POST | `/api/auth/logout` | Bearer | Cierra sesión Supabase |
| GET | `/api/auth/logout` | Bearer | **Usuario actual** (mismo handler; path histórico) |
| POST | `/api/auth/forgot-password` | — | Email reset → `{SITE_URL}/auth/reset-password` |
| POST | `/api/auth/reset-password` | — | `password` (sesión del enlace Supabase) |
| POST | `/api/auth/change-password` | `withAuth` | `newPassword` |

## Respuesta login (ejemplo)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "agente1",
      "email": "a@ejemplo.com",
      "phone": "88888888",
      "role": "agent",
      "created_at": "...",
      "updated_at": "..."
    },
    "session": { "access_token": "...", "refresh_token": "..." }
  }
}
```

## Rate limiting

Login usa límite estricto en producción (≈20 req / 15 min). En desarrollo: `GET/POST /api/dev/reset-rate-limit`.

## Notas

!!! info "Discrepancias conocidas"
    - `ChangePasswordSchema` incluye `currentPassword` pero el handler no lo valida.
    - `ResetPasswordSchema` exige `token` en Zod; el handler confía en la sesión Supabase del enlace.

## Frontend

Vistas en `src/features/auth/`: login (`/login`), forgot, reset, change password.
