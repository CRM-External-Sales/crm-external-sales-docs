# Transfers

**Schema:** `transfer.schema.ts`  
**Rutas:** `src/app/api/transfers/**`

El parámetro `[id]` es la **matrícula** (`license_plate`).

## CRUD

| Método | Ruta | Auth | Notas |
|--------|------|------|-------|
| GET | `/api/transfers` | `withAuth` | Query: `page`, `limit`, `make`, `category`, `availability`, `type` |
| POST | `/api/transfers` | Admin | Ver reglas de precio abajo |
| GET | `/api/transfers/[id]` | `withAuth` | Por matrícula |
| PUT | `/api/transfers/[id]` | Admin | |
| DELETE | `/api/transfers/[id]` | Admin | 409 si tiene reservas |

## Reglas de precio

| Tipo | `sale_price` |
|------|----------------|
| **Interno** | Forzado = `base_price` |
| **Externo** | Obligatorio en alta/edición |

## Disponibilidad de matrícula

`GET /api/transfers/slot-availability?date=&time=&tour_id=`

```json
{
  "success": true,
  "data": {
    "busy_license_plates": ["ABC123", "XYZ789"]
  }
}
```

Ventana de ocupación: duración del tour + `TRANSFER_POST_SERVICE_BUFFER_HOURS` (default 2 h).

## Respuesta (ejemplo) — crear transfer

```json
{
  "success": true,
  "data": {
    "license_plate": "ABC123",
    "supplier_corporate": 999999000000001,
    "availability": "available",
    "make": "Toyota",
    "model": "Hiace",
    "category": "Van",
    "capacity": 12,
    "type": "Interno",
    "base_price": 80,
    "sale_price": 80
  }
}
```

## Cliente

`src/features/transfers/*`, `/transfers`, `/transfers/crear`, `useTransfers`.
