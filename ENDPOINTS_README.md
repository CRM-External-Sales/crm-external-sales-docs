# CRM External Sales — Referencia de API

> **Última revisión:** mayo 2026 · **26 rutas** bajo `src/app/api/**/route.ts` · Stack: Next.js 15, Supabase Auth, Prisma/PostgreSQL.

**Manual técnico completo (MkDocs):** ejecutar `pip install -r requirements-docs.txt` y `mkdocs serve` → [estructura como Red Tides Sentinel](https://redtidessentineldocs.netlify.app/). Contenido en `docs/` + `mkdocs.yml`.

Referencia rápida de contrato HTTP para Postman, frontend y cron.

---

## Convenciones

| Tema | Detalle |
|------|---------|
| **Base** | `/api/...` (p. ej. `NEXT_PUBLIC_API_URL=http://localhost:3000/api`) |
| **Auth** | `Authorization: Bearer <JWT Supabase>` en rutas protegidas |
| **Roles** | `admin` · `agent` · `customer` — `withRole("agent")` incluye también `admin` |
| **Respuesta** | `{ success, data?, message?, error?, pagination? }` |
| **Validación** | Zod en `src/app/schemas/*.ts` |
| **Errores frecuentes** | 400 validación · 401 token · 403 rol · 404 · 409 conflicto · 429 rate limit |

**Middleware:** `withAuth`, `withAdminAuth`, `withRole` en `src/lib/auth-middleware.ts`. Varias rutas usan `withSecurity` (rate limit + sanitización).

---

## Autenticación

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/login` | — | Login (`email`, `password`) → `{ user, session }` |
| POST | `/api/auth/logout` | Bearer | Cierra sesión en Supabase |
| GET | `/api/auth/logout` | Bearer | **Usuario actual** (implementado en el mismo archivo; comentario interno: “me”) |
| POST | `/api/auth/forgot-password` | — | Email de reset → redirect `{NEXT_PUBLIC_SITE_URL}/auth/reset-password` |
| POST | `/api/auth/reset-password` | — | `password` (+ `token` en schema; el handler usa sesión Supabase del enlace) |
| POST | `/api/auth/change-password` | `withAuth` | `newPassword` (schema incluye `currentPassword` pero el handler no lo verifica) |

---

## Usuarios

### Perfil (`/api/user`)

| Método | Auth | Notas |
|--------|------|-------|
| GET | `withAuth` | Perfil sin contraseña |
| PUT | `withAuth` | Solo `phone`, `email` — `username`/`role` → 403 |
| DELETE | `withAuth` | Siempre 403 `SELF_DELETE_DISABLED` |

### Administración (`/api/users`, `/api/users/[username]`)

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/users` | Admin | Query: `page`, `limit`, `role`, `search` — incluye últimas 5 reservas por usuario |
| POST | `/api/users` | Admin | `username`, `email`, `password`, `phone` (8 dígitos), `role` |
| GET | `/api/users/[username]` | Admin o self | Incluye reservas + resumen de tour |
| PUT | `/api/users/[username]` | Admin o self | Non-admin no puede cambiar `role`; `username` inmutable |
| DELETE | `/api/users/[username]` | Admin | No auto-borrado; 409 si tiene reservas activas (`state != cancelled`) |

---

## Tours

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/tours` | `withAuth` | Query: `page`, `limit`, `type`, `name`, `availability`, `difficulty` |
| POST | `/api/tours` | Admin | `multipart/form-data`: campo `tour` (JSON `CreateTourSchema`), imágenes opcionales, `schedules` JSON opcional |
| GET | `/api/tours/[id]` | `withAuth` | Detalle con imágenes |
| PUT | `/api/tours/[id]` | Admin | `UpdateTourSchema` |
| DELETE | `/api/tours/[id]` | Admin | Bloqueado si hay reservas asociadas |

**POST tour — campos principales:** `name`, `description`, `type`, `availability`, `base_price`, `spots`, `requirements`, `duration`, `difficulty`, `supplier_corporate` opcional (default: operación interna).

**Imágenes** (`/api/tours/[id]/images`, `.../images/[imageId]`)

| Método | Auth | Notas |
|--------|------|-------|
| GET | `withAuth` | URLs firmadas (bucket `tours`, ~1 h) |
| POST | Admin | Multipart upload |
| PUT | Admin | `path`, `alt`, `is_cover`, `sort_order` |
| DELETE | Admin | — |

**Horarios** (`/api/tours/[id]/schedules`, `.../schedules/[scheduleId]`)

| Método | Auth | Notas |
|--------|------|-------|
| GET | `withAuth` | `weekday`, `start_time` (HH:MM) |
| POST | Admin | Array de horarios |
| PUT | Admin | Actualizar uno |
| DELETE | Admin | — |

**Cupo por franja**

| Método | Ruta | Query | Respuesta `data` |
|--------|------|-------|------------------|
| GET | `/api/tours/[id]/slot-availability` | `date=YYYY-MM-DD`, `time=HH:MM` | `{ capacity, used, remaining }` |

- `capacity` = `tour.spots` (fijo por turno).
- `used` = suma de `people` en reservas **no canceladas** con mismo `tour_id`, `date`, `time`.
- Misma regla valida **POST/PUT** reservas; **no** se decrementa `tour.spots` al reservar o cancelar.

**Upload genérico:** `POST /api/upload` (admin) — `multipart` campo `file`, JPEG/PNG/WEBP, máx. 5 MB, bucket `tour-images`.

---

## Transfers

El parámetro `[id]` en rutas es la **matrícula** (`license_plate`).

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/transfers` | `withAuth` | Query: `page`, `limit`, `make`, `category`, `availability`, `type` |
| POST | `/api/transfers` | Admin | `CreateTransferSchema` |
| GET | `/api/transfers/[id]` | `withAuth` | Por matrícula |
| PUT | `/api/transfers/[id]` | Admin | Tipo **Interno** fuerza `sale_price = base_price`; **Externo** exige `sale_price` |
| DELETE | `/api/transfers/[id]` | Admin | 409 si tiene reservas |

**Disponibilidad de matrícula**

| GET | `/api/transfers/slot-availability` |
|-----|--------------------------------------|
| Query | `date`, `time`, `tour_id` |
| Respuesta | `{ busy_license_plates: string[] }` |
| Lógica | Solape con reservas activas que usan transfer; ventana = servicio (`tour.duration`) + colchón `TRANSFER_POST_SERVICE_BUFFER_HOURS` (default **2**) |

---

## Proveedores (Suppliers)

`[corporate]` = cédula jurídica (entero).

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/suppliers` | Admin o agent | Query: `page`, `limit`, `company`, `service` |
| POST | `/api/suppliers` | Admin | `corporate`, `company`, `phone`, `email`, `service` |
| GET | `/api/suppliers/[corporate]` | Admin o agent | — |
| PUT | `/api/suppliers/[corporate]` | Admin | — |
| DELETE | `/api/suppliers/[corporate]` | Admin | 409 si hay tours/transfers vinculados |

**Operación interna:** `INTERNAL_SUPPLIER_CORPORATE = 999999000000001` (`src/lib/internal-supplier.ts`). Tours/transfers sin proveedor externo usan este FK.

---

## Reservas

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/reservations` | Agent (+ admin) | Listado global; sincroniza estados en BD antes de listar |
| POST | `/api/reservations` | Agent (+ admin) | Crea con `employee_user` = agente autenticado |
| GET | `/api/reservations/[id]` | `withAuth` | Admin/agent: cualquiera; **customer**: solo si es el creador |
| PUT | `/api/reservations/[id]` | `withAuth` | Ver matriz de permisos abajo |

### POST — cuerpo (`CreateReservationSchema`)

| Campo | Requerido | Default / notas |
|-------|-----------|-----------------|
| `tour_id` | sí | — |
| `people` | sí | — |
| `date` | sí | ISO 8601 |
| `time` | sí | `HH:MM` |
| `hotel_reservation` | sí | entero positivo |
| `transfer_id` | no | matrícula |
| `note` | no | `""` |
| `iva_rate` | no | `0.13` |
| `discount` | no | `0` |
| `transfer_amount` | no | default precio venta del transfer |

**Montos:** `tour_amount = base_price × people`; transfer según body o `sale_price`; `subtotal`, `iva`, `total`. Valida cupo (`assertFitsSlotCapacity`) y transfer libre (`assertTransferFreeOnSlot`) si aplica.

### GET listado — query (`ReservationListQuerySchema`)

| Param | Notas |
|-------|-------|
| `page` | default 1 |
| `limit` | default 5, máx. 100 |
| `date` | día `YYYY-MM-DD` |
| `dateFrom`, `dateTo` | rango (prioridad sobre `date`) |
| `state` | `cancelled` → filtro BD; `pending` / `in_progress` / `completed` → **estado efectivo** en memoria |
| `transfer_id` | matrícula; `__none__` = sin transfer |
| `q` | tour, id reserva, hotel |

### PUT — permisos

| Rol | Puede |
|-----|--------|
| **admin** | Editar tour, transfer, fecha, hora, personas, montos (IVA 13% al recalcular), `note`, cancelar |
| **agent** (creador) | Cancelar, editar `note`, `acknowledge_late_cancellation` |
| **agent** (no creador) | Solo cancelar (sin `note`) |
| **customer** | 403 |

**Cancelación:** única transición de `state` escrita: `"cancelled"` + `cancellation_reason` obligatorio.

| Plazo mínimo (sin penalidad informativa) | Condición |
|------------------------------------------|-----------|
| **48 h** | Tour con proveedor **externo** (`supplier_corporate` ≠ interno) |
| **24 h** | Operación **interna** |

Fuera de plazo: `acknowledge_late_cancellation: true` o **400** `LATE_CANCELLATION_ACK_REQUIRED`. Penalidad informativa: `LATE_CANCELLATION_PENALTY_USD` (default **20**). Lógica: `src/lib/reservation-cancellation-policy.ts`.

Al cancelar no se revalida cupo de franja; al editar datos sí (excluyendo la fila actual).

### Estado en JSON (efectivo)

Calculado en respuesta (`reservation-lifecycle.ts`); en BD destaca sobre todo `cancelled` vs no cancelada (cron/listado pueden sincronizar el resto).

| `state` | Criterio |
|---------|----------|
| `cancelled` | Persistido cancelada |
| `pending` | Antes del inicio del turno |
| `in_progress` | Entre inicio y fin (inicio + `tour.duration`) |
| `completed` | Después del fin |

**Zona horaria del turno:** `date` + `time` como hora local de operación; offset `RESERVATION_UTC_OFFSET_HOURS` (default **-6**, Costa Rica).

**Campos extra en respuestas de reserva:** `is_within_cancellation_lead`, `is_internal_operation`, `cancellation_lead_hours`, `late_cancellation_penalty_usd`, `late_cancellation_notice`, `cancel_forbidden_reason` (compat., suele ser `null`).

---

## Reportes

| GET | `/api/reports` — solo **admin** |
|-----|----------------------------------|

### Query (`ReportQuerySchema`)

| Param | Requerido | Valores / notas |
|-------|-----------|-----------------|
| `tipo_reporte` | sí | `reservas_tiempo`, `reservas_estado`, `reservas_empleado`, `ingresos_tiempo`, `ingresos_tour` |
| `granularidad_temporal` | sí en reportes de tiempo | `semana`, `mes`, `trimestre`, `año` |
| `fecha_inicio`, `fecha_fin` | sí | `fecha_inicio` ≤ `fecha_fin` |
| `tourId`, `usuarioId`, `estado`, `tipo_reserva` | no | `tipo_reserva`: `con_transfer` \| `sin_transfer` |
| `page`, `limit` | no | default 1 / 10; `limit` 1–1000 |

**Restricciones por tipo:** `reservas_estado` no admite filtro `estado`; `reservas_empleado` no admite `usuarioId`; `ingresos_tour` no admite `tourId`.

Filtro `estado` con valores de ciclo de vida usa el mismo **estado efectivo** que el listado de reservas (`filterReservationsByEffectiveState`).

**Respuesta `data`:** `tipo_reporte`, `granularidad_temporal`, `periodo`, `kpis`, `datosGrafico`, `totalReservas`, `reservas`, `pagination`.

---

## Operaciones y desarrollo

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/cron/sync-reservation-states` | `Bearer CRON_SECRET` | Alinea `state` en BD con ciclo de vida; programar cada 10–15 min |
| GET | `/api/dev/reset-rate-limit` | — | Solo `NODE_ENV !== production` — estadísticas |
| POST | `/api/dev/reset-rate-limit` | — | Reset total o por `{ identifier }` |

---

## Esquemas Zod (`src/app/schemas/`)

| Archivo | Uso principal |
|---------|----------------|
| `user.schema.ts` | Login, usuarios, perfil, reset password |
| `tour.schema.ts` | Tours, schedules, queries |
| `tour-image.schema.ts` | Imágenes de tour |
| `transfer.schema.ts` | Transfers |
| `supplier.schema.ts` | Proveedores |
| `reservation.schema.ts` | Crear/actualizar/listar reservas + formularios front |
| `report.schema.ts` | `ReportQuerySchema`, `TIPOS_REPORTE`, `GRANULARIDADES_TEMPORALES` |

---

## Librerías de dominio (`src/lib/`)

| Módulo | Función |
|--------|---------|
| `reservation-lifecycle.ts` | Estados efectivos, filtros de listado/reportes |
| `reservation-cancellation-policy.ts` | Plazos 24/48 h, penalidad, enrich de respuesta |
| `reservation-slot-availability.ts` | Cupo por franja y ocupación de transfer |
| `sync-reservation-db-states.ts` | Persistencia de estados (cron + GET listado) |
| `serialize-reservation-for-json.ts` | BigInt, Decimal, `time` → HH:MM |
| `report-helpers.ts`, `report-aggregations.ts` | Where, KPIs, agregaciones |
| `internal-supplier.ts` | Proveedor interno por defecto |
| `auth-middleware.ts` | Auth y roles |
| `api.ts` | Cliente Axios en frontend |

---

## Variables de entorno

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Opcionales — reservas / cron
# RESERVATION_UTC_OFFSET_HOURS=-6
# LATE_CANCELLATION_PENALTY_USD=20
# TRANSFER_POST_SERVICE_BUFFER_HOURS=2
# CRON_SECRET=          # mín. 8 caracteres para /api/cron/sync-reservation-states
```

Tras cambios de schema: `npx prisma generate` y `npx prisma db push` si aplica.

---

## Rutas frontend (App Router)

| Ruta | Uso |
|------|-----|
| `/login`, `/auth/*` | Autenticación |
| `/home` | Panel según rol |
| `/tours`, `/tours/crear`, `/tours/[id]`, `/tours/listar` | Gestión tours |
| `/transfers`, `/transfers/crear` | Transfers |
| `/proveedores`, `/proveedores/crear` | Proveedores |
| `/reservas`, `/reservas/crear`, `/reservas/[id]` | Reservas (agent/admin) |
| `/usuarios`, `/usuarios/crear` | Usuarios (admin) |
| `/reportes` | Reportes (admin) |
| `/catalogo`, `/catalogo/tour/[id]`, `.../reservar` | Vista cliente / catálogo público |

**Reservas (UI):** crear usa `date` + `time` alineados a `tour_schedule`; consulta `slot-availability` antes de fijar `people`. Listado filtra por estado efectivo; cancelación con aviso de penalidad y `acknowledge_late_cancellation` cuando aplica.

**Cliente API front:** `src/lib/api.ts`, hooks `useAuth`, `useTours`, `useReservations`, etc.

---

## Índice de rutas API

```
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts              # POST logout + GET usuario actual
src/app/api/auth/forgot-password/route.ts
src/app/api/auth/reset-password/route.ts
src/app/api/auth/change-password/route.ts
src/app/api/user/route.ts
src/app/api/users/route.ts
src/app/api/users/[username]/route.ts
src/app/api/tours/route.ts
src/app/api/tours/[id]/route.ts
src/app/api/tours/[id]/schedules/route.ts
src/app/api/tours/[id]/schedules/[scheduleId]/route.ts
src/app/api/tours/[id]/images/route.ts
src/app/api/tours/[id]/images/[imageId]/route.ts
src/app/api/tours/[id]/slot-availability/route.ts
src/app/api/transfers/route.ts
src/app/api/transfers/[id]/route.ts
src/app/api/transfers/slot-availability/route.ts
src/app/api/suppliers/route.ts
src/app/api/suppliers/[corporate]/route.ts
src/app/api/reservations/route.ts
src/app/api/reservations/[id]/route.ts
src/app/api/reports/route.ts
src/app/api/upload/route.ts
src/app/api/cron/sync-reservation-states/route.ts
src/app/api/dev/reset-rate-limit/route.ts
```

## Notas y discrepancias conocidas
1. **GET `/api/auth/logout`** devuelve el usuario autenticado; el path no refleja “me”.
2. **`change-password`:** el schema pide contraseña actual; el handler solo aplica `newPassword`.
3. **`reset-password`:** `token` en schema no se pasa explícitamente al SDK en el handler.
4. **Transfers:** comentarios antiguos mencionan rol supplier; en código solo **admin** muta.
5. **Reportes:** granularidades actuales son `semana|mes|trimestre|año` (no “semestral” genérico del doc anterior).
6. **Tours POST:** horarios van en `schedules` (`weekday` + `start_time`), no en campos sueltos `day`/`time` del tour.
