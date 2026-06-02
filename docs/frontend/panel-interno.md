# Panel interno (CRM)

Interfaz para **admin** y **agent**: sidebar, dashboard y CRUD operativo.

## Layout

- `DashboardLayout` — shell con `app-sidebar`, breadcrumbs
- `AuthRouteGuard` — redirige si no hay sesión o rol incorrecto
- `RouteAccessSpinner` — estado de carga en verificación

## Módulos feature

Documentación resumida de módulos y datos: ver `rutas.md` + `servicios.md` + `hooks.md`.

| Módulo | Rutas | Vistas |
|--------|-------|--------|
| Home | `/home` | `HomeRouter`, `Home/View` |
| Reservas | `/reservas/*` | `View`, `Create`, `Detail` |
| Tours | `/tours/*` | `View`, `Create`, `Edit`, `Detail` |
| Transfers | `/transfers/*` | `View`, `Create`, `Edit` |
| Proveedores | `/proveedores/*` | `View`, `Create`, `Edit` |
| Usuarios | `/usuarios/*` | `View`, `Create`, `Edit` (admin) |
| Reportes | `/reportes` | `ReportsView`, filtros, gráficos Recharts, export PDF |

## Formularios

- **Zod** en `src/app/schemas/` y schemas locales del feature
- **React Hook Form** + `zodResolver`
- Componentes compartidos: ver `componentes.md`

## Reportes (admin)

- Filtros: `ReportFilters.tsx`
- KPIs: `ReportKpis.tsx`
- Gráfico: `ReportChart.tsx`
- Tabla: `ReportReservationsTable.tsx`
- Export: `export-report.ts`, `report-pdf-chart.ts`

## Componentes compartidos (resumen)

| Área | Componentes |
|------|-------------|
| Layout | `DashboardLayout`, `AppSidebar`, `AuthRouteGuard`, `RouteAccessSpinner` |
| UI | `components/ui/*` (Table, Dialog, Calendar, Sonner…) |
| Tours | `TourImageCarousel` |
| Reportes | `ReportFilters`, `ReportKpis`, `ReportChart`, `ReportReservationsTable` |
| Usuario menú | `NavUser`, `TeamSwitcher` |

Detalle de componentes: ver `componentes.md`.
