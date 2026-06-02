# Reservas

**Ubicación:** `src/features/reservations/`  
**Rutas:** `/reservas`, `/reservas/crear`, `/reservas/[id]`  
**Servicio:** `reservationService`  
**Schema:** `src/app/schemas/reservation.schema.ts`

## Pantallas

| Vista | Archivo |
|-------|---------|
| Listado | `View.tsx` |
| Crear | `Create.tsx` |
| Detalle / cancelar | `Detail.tsx` |

## Componentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `ReservationsView` | `View.tsx` | Tabla reservas; filtros estado, transfer, fechas; `AlertDialog` acciones |
| `CreateReservationView` | `Create.tsx` | Formulario completo: selects tour/transfer, **Calendar** + **Popover** fecha, resumen montos (IVA, descuento), validación cupo en vivo |
| `ReservationDetailView` | `Detail.tsx` | Ficha; edición nota; flujo cancelación en dos pasos (`AlertDialog`) |
| `useReservations` / `useReservation` | `hooks/useReservations.ts`, `useReservation.ts` | Listado y detalle |
| `TourImageCarousel` | (opcional en detalle tour) | — |

**UI destacada:** `Calendar`, `Popover` (fecha reserva), `Table`, `AlertDialog`, `Alert` con avisos de penalidad por cancelación tardía.

---

## Listado — filtros

**API:** `GET /api/reservations`  
**Schema:** `ReservationListQuerySchema`

| Parámetro | Tipo | UI |
|-----------|------|-----|
| `page` | number | 1… (default 1) |
| `limit` | number | 1–100 (default 5 en schema) |
| `date` | string | Un día `YYYY-MM-DD` |
| `dateFrom`, `dateTo` | string | Rango (prioridad sobre `date`) |
| `state` | string | pending, in_progress, completed, cancelled |
| `transfer_id` | string | Matrícula; `__none__` = sin transfer |
| `q` | string | Búsqueda libre |

---

## Crear reserva (staff)

**API:** `POST /api/reservations`

### Formulario (`CreateReservationFormBaseSchema`)

| Campo formulario | Envío API | Validación |
|------------------|-----------|------------|
| `tour_id` | `tour_id` (number) | ID tour > 0 |
| `hotel_reservation` | `hotel_reservation` | Entero positivo (habitación / ref. hotel) |
| `reservation_date` | parte de `date` | `YYYY-MM-DD`, día con horario en `tour_schedule` |
| `reservation_time` | `time` | `HH:MM`, debe existir para ese día |
| `people` | `people` | Entero > 0; ≤ cupo del slot (`getSlotAvailability`) |
| `note` | `note` | Opcional |
| `needs_transfer` | — | `yes` / `no` (solo UI) |
| `transfer_id` | `transfer_id` | Obligatorio si `needs_transfer=yes`; placa válida |
| `transfer_amount` | `transfer_amount` | ≥ 0; default precio venta del vehículo |
| `iva_rate` | `iva_rate` | 0–1 (default **0.13**) |
| `discount` | `discount` | ≥ 0 |

`date` en API se envía en **ISO 8601** (función `ymdToReservationDateIso`).

### Validaciones extra en cliente (antes del POST)

- Cupo del turno: `tourService.getSlotAvailability`.
- Horario coherente con schedules del tour.
- Capacidad del transfer ≥ `people`.
- Placa no en `busy_license_plates` (`transferService.getSlotBusyPlates`).

---

## Detalle — actualizar nota

**API:** `PUT /api/reservations/:id`

| Campo | Schema |
|-------|--------|
| `note` | `ReservationNoteFormSchema` |

---

## Cancelar reserva

**API:** `PUT /api/reservations/:id`

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| `state` | `"cancelled"` | Sí |
| `cancellation_reason` | string | Sí, no vacío |
| `acknowledge_late_cancellation` | boolean | **Sí** si cancelación fuera de plazo y hay penalidad |

El detalle muestra `is_within_cancellation_lead`, `late_cancellation_penalty_usd` y plazo 24 h (interno) / 48 h (externo) antes de confirmar.

---

## Estados

| Estado | Significado |
|--------|-------------|
| `pending` | Pendiente |
| `in_progress` | En curso |
| `completed` | Completada |
| `cancelled` | Cancelada |

Otros estados los calcula el servidor según fecha, hora y duración del tour.
