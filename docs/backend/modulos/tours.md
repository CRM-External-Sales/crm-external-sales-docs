# Tours

**Schema:** `tour.schema.ts`, `tour-image.schema.ts`  
**Rutas:** `src/app/api/tours/**`

## CRUD principal

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/tours` | `withAuth` | Query: `page`, `limit`, `type`, `name`, `availability`, `difficulty` |
| POST | `/api/tours` | Admin | `multipart`: `tour` (JSON), imágenes, `schedules` opcional |
| GET | `/api/tours/[id]` | `withAuth` | Detalle + imágenes |
| PUT | `/api/tours/[id]` | Admin | `UpdateTourSchema` |
| DELETE | `/api/tours/[id]` | Admin | Bloqueado si hay reservas |

## Imágenes — `/api/tours/[id]/images`

| Método | Auth |
|--------|------|
| GET | `withAuth` — URLs firmadas bucket `tours` |
| POST | Admin — multipart |
| PUT | Admin — `path`, `alt`, `is_cover`, `sort_order` |
| DELETE | Admin |

## Horarios — `/api/tours/[id]/schedules`

| Campo schedule | Formato |
|----------------|---------|
| `weekday` | día de la semana |
| `start_time` | `HH:MM` |

POST acepta **array** de horarios.

## Cupo por franja

`GET /api/tours/[id]/slot-availability?date=YYYY-MM-DD&time=HH:MM`

```json
{
  "success": true,
  "data": {
    "capacity": 20,
    "used": 8,
    "remaining": 12
  }
}
```

- `capacity` = `tour.spots` (no baja al reservar).
- `used` = suma `people` de reservas no canceladas en ese turno.

## Upload auxiliar

`POST /api/upload` (admin) — bucket `tour-images`, máx. 5 MB, JPEG/PNG/WEBP.

## Frontend

`src/features/tours/*`, rutas `/tours`, `/tours/crear`, `/tours/[id]`, hook `useTours`, `useTour`.
