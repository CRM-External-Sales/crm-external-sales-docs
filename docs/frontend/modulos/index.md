# Módulos

Cada dominio del CRM vive en `src/features/<modulo>/` y usa **React Hook Form + Zod** para validar lo que el usuario envía antes de llamar a `src/lib/api.ts` (Axios).

Selecciona un módulo en la **tabla de contenidos** (derecha) o en los enlaces de cada sección.

## Autenticación {#autenticacion}

[Ver documentación del módulo](autenticacion.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/login`, `/auth/*` | Todos (público/recuperación) | `user.schema.ts` | `authService` |

## Usuarios {#usuarios}

[Ver documentación del módulo](usuarios.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/usuarios/*` | **admin** | `user.schema.ts` | `userService` |

## Tours {#tours}

[Ver documentación del módulo](tours.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/tours/*` | admin, agent (crear solo admin) | `tour.schema.ts` + formularios en feature | `tourService` |

## Transfers {#transfers}

[Ver documentación del módulo](transfers.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/transfers/*` | admin, agent (crear solo admin) | `transfer.schema.ts` | `transferService` |

## Proveedores {#proveedores}

[Ver documentación del módulo](proveedores.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/proveedores/*` | admin, agent (crear solo admin) | `supplier.schema.ts` | `supplierService` |

## Reservas {#reservas}

[Ver documentación del módulo](reservas.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/reservas/*` | admin, agent | `reservation.schema.ts` | `reservationService` |

## Reportes {#reportes}

[Ver documentación del módulo](reportes.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/reportes` | **admin** | `report.schema.ts` | `GET /api/reports` |

## Catálogo cliente {#catalogo}

[Ver documentación del módulo](catalogo.md){ .modulo-link }

| Rutas | Rol | Schema / validación | Servicio API |
|-------|-----|---------------------|--------------|
| `/catalogo/*` | Público / customer | Zod en `TourReservationForm` | WhatsApp (sin POST) |

## Flujo común

```mermaid
flowchart LR
  A[Formulario UI] --> B[Zod resolver]
  B --> C[api.ts servicio]
  C --> D[Route Handler /api]
```

1. El usuario completa el formulario o filtros.
2. **Zod** valida tipos, rangos y reglas de negocio en cliente.
3. El **servicio** arma el JSON, query params o `FormData` y llama a la API.
4. Los **hooks** (`useTours`, `useReservations`, …) cachean la respuesta con React Query.

## Esquemas compartidos con el backend

Los archivos en `src/app/schemas/` son la referencia canónica; muchas pantallas duplican reglas en schemas locales del feature (p. ej. `tourFormSchema` en `Create.tsx`) con mensajes orientados al formulario.

## Capas de componentes

| Capa | Ruta | Rol |
|------|------|-----|
| **UI base** | `src/components/ui/*` | shadcn/Radix reutilizable (Button, Table, Dialog, Calendar…) |
| **Layout staff** | `src/components/layout/*` | `DashboardLayout`, `AuthRouteGuard`, spinner de acceso |
| **Shell cliente** | `ClientShellLayout`, `ClientI18nProvider` | Catálogo sin sidebar admin |
| **Navegación** | `app-sidebar`, `nav-main`, `nav-user` | Menú lateral según rol |
| **Dominio** | `src/components/tours/*`, `src/features/*/components/*` | Piezas específicas (carrusel, reportes) |
| **Pantallas** | `src/features/*/*.tsx` | Vistas que componen UI + hooks + API |

### UI más usada en el panel

`Button`, `Input`, `Label`, `Table`, `Dialog`, `Alert`, `AlertDialog`, `DropdownMenu`, `PaginationControls`, `Calendar` + `Popover` (fechas en reservas), `Sonner` (toasts globales).

Cada módulo documenta sus **vistas** (`View`, `Create`, …) y los componentes propios o compartidos que monta.

## Home

`/home` solo enruta según rol (`HomeRouter`); no tiene formulario ni payload propio.
