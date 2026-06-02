# Utilidades (`src/lib/`)

Módulos de dominio reutilizados por API y, en algunos casos, por el cliente.

## Autenticación y seguridad

| Archivo | Función |
|---------|---------|
| `auth-middleware.ts` | `withAuth`, `withAdminAuth`, `withRole` |
| `supabase.ts` / `supabase-client.ts` | Clientes Supabase servidor/browser |
| `rate-limit.ts` | Límite de peticiones (login, etc.) |
| `error-formatter.ts` | Respuestas 400 Zod unificadas |

## Reservas

| Archivo | Función |
|---------|---------|
| `reservation-lifecycle.ts` | Estados efectivos `pending` / `in_progress` / `completed` |
| `reservation-cancellation-policy.ts` | Plazos 24 h / 48 h, penalidad, campos en JSON |
| `reservation-slot-availability.ts` | Cupo por franja y solape de transfers |
| `sync-reservation-db-states.ts` | Persistir estados (cron + listado) |
| `serialize-reservation-for-json.ts` | BigInt, Decimal, `time` → HH:MM |
| `reservation-owner-match.ts` | Permisos customer vs creador |

## Reportes

| Archivo | Función |
|---------|---------|
| `report-helpers.ts` | `construirWhereClause`, KPIs, filtros por tipo |
| `report-aggregations.ts` | Agregaciones por tiempo, estado, empleado, ingresos |

## Catálogo y tours

| Archivo | Función |
|---------|---------|
| `internal-supplier.ts` | Proveedor operación interna |
| `tour-weekday.ts` / `tour-schedule-picker.ts` | Calendario y horarios en UI |
| `tour-image-url.ts` | URLs de imágenes |
| `license-plate.ts` | Normalización matrículas |

## Cliente (cliente HTTP)

| Archivo | Función |
|---------|---------|
| `api.ts` | Axios + servicios (`tourService`, `reservationService`, …) |
| `route-access.ts` | Rutas permitidas por rol |
| `role-permissions.ts` | Matriz de permisos UI |

## Esquemas Zod

Ubicación: `src/app/schemas/` — ver [Router](api-router.md).
