# Reservas

**Schema:** `reservation.schema.ts`  
**Rutas:** `src/app/api/reservations/**`  
**Utilidades:** `reservation-lifecycle.ts`, `reservation-cancellation-policy.ts`, `reservation-slot-availability.ts`

## Endpoints

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/reservations` | Agent (+ admin) | Listado global; sync estados en BD |
| POST | `/api/reservations` | Agent (+ admin) | `employee_user` = agente autenticado |
| GET | `/api/reservations/[id]` | `withAuth` |  admin/agent sin restricción |
| PUT | `/api/reservations/[id]` | `withAuth` | Ver permisos abajo |

## POST — cuerpo principal

| Campo | Requerido | Default |
|-------|-----------|---------|
| `tour_id` | sí | |
| `people` | sí | |
| `date` | sí | ISO 8601 |
| `time` | sí | HH:MM |
| `hotel_reservation` | sí | entero |
| `transfer_id` | no | matrícula |
| `note` | no | `""` |
| `iva_rate` | no | `0.13` |
| `discount` | no | `0` |
| `transfer_amount` | no | precio venta transfer |

**Montos:** `tour_amount = base_price × people`; luego `subtotal`, `iva`, `total`. Valida cupo y transfer libre.

## GET listado — query

| Param | Notas |
|-------|-------|
| `page` / `limit` | default 1 / 5 (máx. 100) |
| `date` | `YYYY-MM-DD` |
| `dateFrom`, `dateTo` | rango |
| `state` | `cancelled` en BD; otros por **estado efectivo** |
| `transfer_id` | `__none__` = sin transfer |
| `q` | búsqueda libre |

## Estados efectivos (JSON)

| `state` | Criterio |
|---------|----------|
| `cancelled` | Persistido |
| `pending` | Antes del turno |
| `in_progress` | Durante servicio (`tour.duration`) |
| `completed` | Tras fin del intervalo |

Offset horario: `RESERVATION_UTC_OFFSET_HOURS` (default **-6**).

## Cancelación (PUT)

Única escritura de estado: `"cancelled"` + `cancellation_reason`.

| Plazo sin penalidad informativa | Condición |
|--------------------------------|-----------|
| 48 h | Tour proveedor **externo** |
| 24 h | Operación **interna** |

Fuera de plazo: `acknowledge_late_cancellation: true` o error `LATE_CANCELLATION_ACK_REQUIRED`.

## PUT — permisos por rol

| Rol | Acciones |
|-----|----------|
| admin | Edición completa + cancelar |
| agent (creador) | Cancelar, `note`, ack penalidad |
| agent (otro) | Solo cancelar |
| customer | 403 |

## Campos extra en respuesta

`is_within_cancellation_lead`, `is_internal_operation`, `cancellation_lead_hours`, `late_cancellation_penalty_usd`, `late_cancellation_notice`.

## Frontend

`/reservas`, `/reservas/crear`, `/reservas/[id]` — `Create.tsx`, `View.tsx`, `Detail.tsx`; hooks `useReservations`, `useReservation`.
