# Proveedores (Suppliers)

**Schema:** `supplier.schema.ts`  
**Rutas:** `src/app/api/suppliers/**`

`[corporate]` = cédula jurídica (BigInt en path).

## Endpoints

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/suppliers` | Admin o agent | Query: `page`, `limit`, `company`, `service` |
| POST | `/api/suppliers` | Admin | |
| GET | `/api/suppliers/[corporate]` | Admin o agent | |
| PUT | `/api/suppliers/[corporate]` | Admin | |
| DELETE | `/api/suppliers/[corporate]` | Admin | 409 si tours/transfers vinculados |

## POST — cuerpo

| Campo | Notas |
|-------|-------|
| `corporate` | ID único |
| `company` | Razón social |
| `phone` | único |
| `email` | único |
| `service` | tipo de servicio |

## Operación interna

`INTERNAL_SUPPLIER_CORPORATE = 999999000000001` — tours/transfers sin proveedor externo. Afecta política de cancelación de reservas (24 h vs 48 h).

## Frontend

`src/features/suppliers/*`, `/proveedores`, `useSuppliers`.
