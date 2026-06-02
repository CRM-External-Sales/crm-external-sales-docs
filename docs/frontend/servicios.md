# Servicios (`src/lib/api.ts`)

Cliente **Axios** centralizado con interceptores para JWT y manejo de errores.

## Configuración

- Base URL: `process.env.NEXT_PUBLIC_API_URL` (p. ej. `http://localhost:3000/api`).
- Token: `localStorage` / cabecera `Authorization: Bearer …` tras login.

## Servicios exportados 

| Servicio | Dominio |
|----------|---------|
| `authService` | login, logout, password |
| `userService` | perfil y usuarios |
| `tourService` | tours, imágenes, schedules, `getSlotAvailability` |
| `transferService` | transfers, slot availability |
| `supplierService` | proveedores |
| `reservationService` | reservas CRUD |
| `reportService` | reportes admin |

## Ejemplo — cupo de tour

```typescript
import { tourService } from "@/lib/api";

const { data } = await tourService.getSlotAvailability(tourId, {
  date: "2026-06-01",
  time: "09:00",
});
// data: { capacity, used, remaining }
```

## Tipos de error

Respuestas con `success: false` y `error` string; Axios puede lanzar en 4xx/5xx — los hooks suelen mostrar toast (`sonner`).

## Alternativa fetch

Para pruebas manuales se puede usar `fetch` directo; en producción el proyecto estandariza Axios en features y hooks.
