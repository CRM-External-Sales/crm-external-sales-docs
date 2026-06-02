# Proveedores

**Ubicación:** `src/features/suppliers/`  
**Rutas:** `/proveedores`, `/proveedores/crear` (admin)  
**Servicio:** `supplierService`  
**Schema:** `src/app/schemas/supplier.schema.ts`

## Pantallas

| Vista | Archivo |
|-------|---------|
| Listado | `View.tsx` |
| Crear | `Create.tsx` |
| Editar | `Edit.tsx` |

## Componentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `SuppliersView` | `View.tsx` | Tabla; filtros empresa/servicio; paginación |
| `CreateSupplierView` | `Create.tsx` | Alta con select `Tour` / `Transfer` |
| `EditSupplierView` | `Edit.tsx` | Edición; `corporate` solo lectura |
| `useSuppliers` | `hooks/useSuppliers.ts` | Listado API |

**UI:** `Table`, `Dialog`, `Input`, `Label`, `Button`, `Alert`.

---

## Listado — filtros

**API:** `GET /api/suppliers`

| Parámetro | Tipo | Límites |
|-----------|------|---------|
| `page` | number | 1–1000 |
| `limit` | number | 1–100 |
| `company` | string | Nombre empresa (opcional) |
| `service` | string | Tipo servicio (opcional) |

---

## Crear proveedor

**API:** `POST /api/suppliers`  
**Formulario:** `CreateSupplierSchema` + coerce en `createSupplierFormSchema`

| Campo | Tipo | Validación |
|-------|------|------------|
| `corporate` | number entero | Positivo (ID corporativo) |
| `company` | string | 2–200 caracteres |
| `phone` | string | 7–30 caracteres |
| `email` | string | Email válido |
| `service` | enum | `Tour` o `Transfer` (select obligatorio) |

---

## Actualizar proveedor

**API:** `PUT /api/suppliers/:corporate`

| Campo | Tipo | Validación (`UpdateSupplierSchema`) |
|-------|------|-------------------------------------|
| `company` | string | Opcional, 2–200 |
| `phone` | string | Opcional, 7–30 |
| `email` | string | Opcional, email |
| `service` | string | Opcional, 2–100 |

`corporate` no se modifica (es la clave).

---

## Relación con tours y transfers

- **Operación interna:** `INTERNAL_SUPPLIER_CORPORATE` en tours/transfers cuando no se elige proveedor externo.
- Tours y transfers pueden enviar `supplier_corporate` opcional al crear.
