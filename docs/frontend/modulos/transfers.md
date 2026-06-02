[← Regresar a Módulos](index.md){ .modulo-back }

# Transfers

**Ubicación:** `src/features/transfers/`  
**Rutas:** `/transfers`, `/transfers/crear` (admin)  
**Servicio:** `transferService`  
**Schema:** `src/app/schemas/transfer.schema.ts`

## Pantallas

| Vista | Archivo |
|-------|---------|
| Listado + filtros | `View.tsx` |
| Crear | `Create.tsx` |
| Editar | `Edit.tsx` |

## Componentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `TransfersView` | `View.tsx` | Tabla; filtros `TransferViewFiltersSchema`; búsqueda por placa |
| `CreateTransferView` | `Create.tsx` | Formulario strings → `CreateTransferFormSchema` |
| `EditTransferView` | `Edit.tsx` | Sin placa editable; diálogo confirmación en algunos flujos |
| `useTransfers` | `hooks/useTransfers.ts` | Listado paginado |

**UI:** `Table`, `Dialog`, `Label`, `Input`, `PaginationControls`, `DropdownMenu`.

---

## Listado — filtros

**API:** `GET /api/transfers`

Validación UI: `TransferViewFiltersSchema`

| Campo formulario | Query API | Notas |
|------------------|-----------|--------|
| `searchTerm` | (cliente) | Si parece placa, filtra por matrícula |
| `makeFilter` | `make` | Marca |
| `categoryFilter` | `category` | Categoría |
| `availabilityFilter` | `availability` | `available`, `maintenance`, `unavailable` o vacío |
| `typeFilter` | `type` | `Interno`, `Externo` o vacío |
| `page`, `limit` | sí | Paginación |

---

## Crear / editar transfer

**API:** `POST /api/transfers` · `PUT /api/transfers/:license_plate`  
**Formulario:** `CreateTransferFormSchema` / `UpdateTransferFormSchema`

| Campo | Tipo | Validación |
|-------|------|------------|
| `license_plate` | string | Solo letras y números, normalizada a mayúsculas (solo en alta) |
| `make` | string | Obligatorio, marca del vehículo |
| `model` | string | Obligatorio, modelo |
| `category` | string | Obligatorio, categoría |
| `capacity` | number entero | > 0 |
| `availability` | string | Obligatorio, disponibilidad |
| `type` | string | `Interno` o `Externo` |
| `base_price` | number | > 0 |
| `sale_price` | number | **Obligatorio si `type` = Externo**; si Interno = `base_price` automático |
| `supplier_corporate` | number | Opcional; default operación interna en servidor |

---

## Disponibilidad en reservas

**API:** `GET /api/transfers/slot-availability`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `date` | string | Fecha de la reserva |
| `time` | string | `HH:MM` |
| `tour_id` | number | Define ventana de ocupación según duración del tour |

**Respuesta:** `{ busy_license_plates: string[] }` — matrículas no seleccionables en ese turno.
