# Variables de entorno

Archivo recomendado:  **`.env`** en la raíz del proyecto.

## Obligatorias

```env
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_WHATSAPP_NUMBER="50688888888"

NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Prisma — pooler |
| `DIRECT_URL` | Prisma — conexión directa migraciones |
| `NEXT_PUBLIC_SUPABASE_*` | Cliente browser + auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Operaciones admin en servidor |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Teléfono de reservas |
| `NEXT_PUBLIC_API_URL` | Base Axios para el cliente |
| `NEXT_PUBLIC_SITE_URL` | Links de reset password |

## Opcionales — reservas

```env
# Zona horaria del turno (default -6, Costa Rica)
RESERVATION_UTC_OFFSET_HOURS=-6

# Penalidad informativa USD al cancelar fuera de plazo (default 20)
LATE_CANCELLATION_PENALTY_USD=20

# Horas de colchón tras fin de servicio para ocupación de transfer (default 2)
TRANSFER_POST_SERVICE_BUFFER_HOURS=2
```

## Cron

```env
# Mínimo 8 caracteres — header Bearer en GET /api/cron/sync-reservation-states
CRON_SECRET="tu-secreto-largo"
```

**Seguridad:** No commitear `.env`. El repositorio ignora `.env*` en `.gitignore`.
