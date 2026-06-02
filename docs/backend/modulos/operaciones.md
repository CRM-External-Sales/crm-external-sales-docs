# Operaciones (cron, dev, upload)

## Cron — sincronización de estados

| GET | `/api/cron/sync-reservation-states` |
|-----|-------------------------------------|

- Header: `Authorization: Bearer <CRON_SECRET>` (mín. 8 caracteres en env).
- Alinea `state` en BD con estados de ciclo de vida (`pending`, `in_progress`, `completed`).
- Programar cada **10–15 min** (Vercel Cron u otro).

Respuesta:

```json
{
  "success": true,
  "scanned": 120,
  "updated": 15
}
```

Implementación: `src/lib/sync-reservation-db-states.ts`.

## Desarrollo — rate limit

Solo si `NODE_ENV !== production`:

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/dev/reset-rate-limit` | Estadísticas |
| POST | `/api/dev/reset-rate-limit` | Reset global o `{ "identifier": "..." }` |

## Upload

| POST | `/api/upload` |
|------|----------------|

- Auth: admin.
- `multipart` campo `file`.
- Máx. 5 MB; JPEG, PNG, WEBP.
- Bucket `tour-images`.
