[← Regresar a Módulos](index.md){ .modulo-back }

# Tours

**Ubicación:** `src/features/tours/`  
**Rutas:** `/tours`, `/tours/listar`, `/tours/crear` (admin), `/tours/[id]`  
**Servicio:** `tourService`  
**Schemas:** `src/app/schemas/tour.schema.ts`, `tour-image.schema.ts`

## Pantallas

| Vista | Archivo |
|-------|---------|
| Listado | `View.tsx` |
| Crear | `Create.tsx` |
| Editar | `Edit.tsx` |
| Detalle | `Detail.tsx` |

## Componentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `ToursView` | `View.tsx` | Tabla tours; filtros nombre, tipo, dificultad, disponibilidad |
| `CreateTourView` | `Create.tsx` | Formulario + tabla horarios + subida imágenes (`File`, previews) |
| `EditTourView` | `Edit.tsx` | Edición campos tour; gestión schedules/imágenes |
| `TourDetailView` | `Detail.tsx` | Ficha tour; enlaces a edición |
| `TourImageCarousel` | `components/tours/TourImageCarousel.tsx` | Carrusel imágenes con URL firmada en detalle |
| `useTours` / `useTour` | `hooks/useTours.ts`, `useTour.ts` | Datos listado y detalle (React Query) |

**UI:** `Table`, `Dialog` (confirmar borrado), `Input`, selects nativos en formularios, `Alert`, iconos Lucide en crear (subida).

---

## Listado — filtros (query)

**API:** `GET /api/tours`

| Parámetro | Tipo | UI |
|-----------|------|-----|
| `page`, `limit` | number | Paginación |
| `name` | string | Búsqueda por nombre |
| `type` | string | Tipo de tour |
| `difficulty` | string | Dificultad |
| `availability` | string | p. ej. `Disponible` |

---

## Crear tour

**API:** `POST /api/tours` (`multipart/form-data`)

### Cuerpo del tour (`tour` JSON)

| Campo | Tipo | Formulario (`tourFormSchema`) | API (`CreateTourSchema`) |
|-------|------|-------------------------------|---------------------------|
| `name` | string | Obligatorio | 3–200 caracteres |
| `description` | string | Obligatorio | Mín. 10 caracteres |
| `type` | string | Select: Aventura, Cultural, Naturaleza, Relax | Obligatorio |
| `availability` | string | Disponible / No disponible | Obligatorio |
| `base_price` | number | > 0 | Positivo |
| `spots` | number entero | > 0 | Cupo del tour |
| `requirements` | string | Obligatorio | Obligatorio |
| `duration` | string | 1–2 h, 3–4 h, Medio día, Día completo, Múltiples días | Obligatorio |
| `difficulty` | string | Baja, Media, Alta | Obligatorio |
| `supplier_corporate` | number | Proveedor (default operación interna) | Opcional en API; positivo si se envía |

### Horarios (`schedules` JSON array)

| Campo | Tipo | Validación |
|-------|------|------------|
| `weekday` | string | Día: Lunes … Domingo |
| `start_time` | string | Formato `HH:MM` |

Se agregan en UI como filas antes de enviar; mínimo recomendado: al menos un horario.

### Imágenes (multipart)

Por cada archivo:

| Parte | Descripción |
|-------|-------------|
| `images` | Archivo `File` |
| `alts[]` | Texto alternativo |
| `sort_orders[]` | Orden (número) |
| `is_covers[]` | `true` / `false` — portada |

---

## Editar tour

**API:** `PUT /api/tours/:id`  
**Formulario:** `editTourFormSchema` (mismos campos que crear, parcial en API `UpdateTourSchema`).

Horarios e imágenes se gestionan en detalle/edición con endpoints dedicados (`/schedules`, `/images/upload`).

---

## Consultas auxiliares (staff)

| Método | Parámetros | Uso en UI |
|--------|------------|-----------|
| `getSlotAvailability` | `date` (`YYYY-MM-DD`), `time` (`HH:MM`) | Cupo al crear reserva |
| `getTourSchedules` | — | Calendario de reservas |
| `getTourImages` | — | Carrusel / edición |

---

## Valores típicos en selects (crear)

| Campo | Opciones en UI |
|-------|----------------|
| `type` | Aventura, Cultural, Naturaleza, Relax |
| `availability` | Disponible, No disponible |
| `difficulty` | Baja, Media, Alta |
| `duration` | 1 a 2 horas, 3 a 4 horas, Medio día, Día completo, Múltiples días |
| `weekday` | Lunes … Domingo |
