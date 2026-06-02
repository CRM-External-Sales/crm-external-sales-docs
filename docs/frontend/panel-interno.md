# Panel interno (CRM)

Interfaz para **admin** y **agent**: sidebar, dashboard y CRUD operativo.

## Layout

- `DashboardLayout` — shell con `app-sidebar`, breadcrumbs
- `AuthRouteGuard` — redirige si no hay sesión o rol incorrecto
- `RouteAccessSpinner` — estado de carga en verificación

## Módulos feature

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

- **Zod** schemas compartidos con API (`src/app/schemas/`)
- **React Hook Form** + `zodResolver`
- Reservas: fecha/hora según `tour_schedule`; consulta `slot-availability` antes de `people`
- Cancelación: diálogo con motivo y `acknowledge_late_cancellation` si aplica penalidad

## Reportes (admin)

- Filtros: `ReportFilters.tsx`
- KPIs: `ReportKpis.tsx`
- Gráfico: `ReportChart.tsx`
- Tabla: `ReportReservationsTable.tsx`
- Export: `export-report.ts`, `report-pdf-chart.ts`

## Componentes compartidos

- `tours/TourImageCarousel.tsx`
- `ui/pagination-controls.tsx`
- `components/team-switcher.tsx` (si aplica multi-tenant visual)
