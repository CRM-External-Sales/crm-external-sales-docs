# Router (API)

Todas las rutas viven bajo **`/api`** como Route Handlers de Next.js (`src/app/api/**/route.ts`).

## Resumen por dominio

| Dominio | Prefijo | Rutas |
|---------|---------|-------|
| Auth | `/api/auth/*` | login, logout, forgot/reset/change password |
| Perfil | `/api/user` | GET/PUT/DELETE perfil actual |
| Usuarios | `/api/users`, `/api/users/[username]` | CRUD (admin) |
| Tours | `/api/tours`, `/api/tours/[id]`, imágenes, schedules, slot-availability | CRUD +  archivos y datos asociados |
| Transfers | `/api/transfers`, `/api/transfers/[id]`, slot-availability | CRUD por matrícula |
| Proveedores | `/api/suppliers`, `/api/suppliers/[corporate]` | CRUD |
| Reservas | `/api/reservations`, `/api/reservations/[id]` | Listado, alta, detalle, PUT |
| Reportes | `/api/reports` | GET agregaciones (admin) |
| Upload | `/api/upload` | POST imagen |
| Cron | `/api/cron/sync-reservation-states` | Sincroniza estados en BD |
| Dev | `/api/dev/reset-rate-limit` | Solo no producción |

**Total: 26 archivos `route.ts`.**

## Convenciones

| Tema | Detalle |
|------|---------|
| Auth | `Authorization: Bearer <JWT Supabase>` |
| Roles | `withAuth`, `withAdminAuth`, `withRole("agent")` |
| Validación | Zod en `src/app/schemas/` |
| Respuesta | `{ success, data?, message?, error?, pagination? }` |

## Índice de archivos

```
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts
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

## Detalle por módulo

Cada dominio está documentado en **Módulos**:

- [Autenticación](modulos/autenticacion.md)
- [Usuarios](modulos/usuarios.md)
- [Tours](modulos/tours.md)
- [Transfers](modulos/transfers.md)
- [Proveedores](modulos/proveedores.md)
- [Reservas](modulos/reservas.md)
- [Reportes](modulos/reportes.md)
- [Operaciones](modulos/operaciones.md)
