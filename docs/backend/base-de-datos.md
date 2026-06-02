# Base de datos

## Prisma

- **Schema:** `prisma/schema.prisma`
- **Provider:** PostgreSQL
- **Schemas:** `public` (negocio), `auth` (tablas Supabase)

El cliente se genera con `output = "../src/generated/prisma"`.

## Modelos de negocio (`public`)

| Modelo | Clave | Relaciones principales |
|--------|-------|------------------------|
| `app_user` | `id` (UUID, FK a `auth.users`) | `reservation[]` |
| `supplier` | `corporate` (BigInt) | `tour[]`, `transfer[]` |
| `tour` | `id_tour` | `supplier`, `tour_image`, `tour_schedule`, `reservation` |
| `tour_image` | `id` | `tour` |
| `tour_schedule` | `id` | `tour` — `weekday`, `start_time` |
| `transfer` | `license_plate` | `supplier`, `reservation` |
| `reservation` | `reservation_id` | `tour`, `transfer?`, `app_user` |

## Enum de roles

```prisma
enum user_role {
  admin
  agent
  customer
}
```

## Proveedor interno

Tours/transfers sin proveedor externo usan `INTERNAL_SUPPLIER_CORPORATE = 999999000000001` (`src/lib/internal-supplier.ts`), creado con `ensureInternalSupplierExists`.

## Reservas — campos relevantes

| Campo | Notas |
|-------|-------|
| `state` | En BD: cancelada vs no cancelada; estados `pending`/`in_progress`/`completed` se calculan o sincronizan vía cron |
| `date`, `time` | Fecha/hora del turno |
| `people` | Pasajeros |
| `tour_amount`, `transfer_amount`, `subtotal`, `iva`, `discount`, `total` | Montos calculados en API |
| `cancellation_reason` | Obligatorio al cancelar |

## Diagrama entidad-relación

**Modelo lógico** del CRM: relaciones del esquema `public` y vínculo con `auth.users` (Supabase). En cada entidad: **PK** = clave primaria, **FK** = clave foránea, **UK** = único.

```mermaid
erDiagram
  users {
    uuid id PK
    string email
  }

  supplier {
    bigint corporate PK
    string company
    string email UK
    string phone UK
    string service
  }

  tour {
    bigint id_tour PK
    bigint supplier_corporate FK
    string name UK
    string type
    string availability
    decimal base_price
    bigint spots
    string duration
    string difficulty
  }

  tour_schedule {
    bigint id PK
    bigint tour_id FK
    string weekday
    time start_time
  }

  tour_image {
    bigint id PK
    bigint tour_id FK
    string path
    boolean is_cover
    int sort_order
  }

  transfer {
    string license_plate PK
    bigint supplier_corporate FK
    string make
    string model
    string type
    bigint capacity
    decimal base_price
    decimal sale_price
    string availability
  }

  app_user {
    uuid id PK
    string username UK
    user_role role
    string email UK
    string phone
  }

  reservation {
    bigint reservation_id PK
    uuid employee_user FK
    bigint tour_id FK
    string transfer_id FK
    timestamptz date
    time time
    int people
    int hotel_reservation
    string state
    decimal tour_amount
    decimal transfer_amount
    decimal subtotal
    decimal iva
    decimal discount
    decimal total
    string cancellation_reason
  }

  users ||--|| app_user : "auth.uid()"
  supplier ||--o{ tour : provee
  supplier ||--o{ transfer : provee
  tour ||--o{ tour_schedule : tiene
  tour ||--o{ tour_image : tiene
  tour ||--o{ reservation : reserva
  transfer ||--o{ reservation : "opcional"
  app_user ||--o{ reservation : crea
```
