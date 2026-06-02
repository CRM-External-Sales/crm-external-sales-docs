# Reportes

**Ubicación:** `src/features/reports/`  
**Ruta:** `/reportes` (solo **admin**)  
**API:** `GET /api/reports` vía `features/reports/api.ts`  
**Schema servidor:** `src/app/schemas/report.schema.ts`  
**Filtros UI:** `filter-types.ts` → `ReportFilterForm`

## Pantalla y subcomponentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `ReportsView` | `ReportsView.tsx` | Orquesta fetch, estado filtros, export PDF/Excel |
| `ReportFilters` | `components/ReportFilters.tsx` | Formulario filtros (tipo, fechas, tour, usuario, estado) |
| `ReportKpis` | `components/ReportKpis.tsx` | Tarjetas KPI (`total_reservas`, ingresos, cancelaciones…) |
| `ReportChart` | `components/ReportChart.tsx` | Gráficos **Recharts** (área, barras, pie según `tipo_reporte`) |
| `ReportReservationsTable` | `components/ReportReservationsTable.tsx` | Tabla detalle de reservas del periodo |
| `buildReportQuery` | `query-builder.ts` | `ReportFilterForm` → query params |
| `export-report` / `report-pdf-chart` | utilidades | Exportación y gráfico embebido en PDF |

**UI:** `Button`, `Input`, `Label`, `Tooltip`, `Table`, `Alert`.

---

## Parámetros de consulta

**Schema:** `ReportQuerySchema`

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `tipo_reporte` | enum | **Sí** | Tipo de reporte (ver abajo) |
| `fecha_inicio` | string (fecha) | **Sí** | Inicio del periodo |
| `fecha_fin` | string (fecha) | **Sí** | Fin (≥ inicio) |
| `granularidad_temporal` | enum | Condicional | Requerida si el tipo es de **tiempo** |
| `tourId` | string | No | Filtrar por tour |
| `usuarioId` | string (UUID) | No | Filtrar por empleado |
| `estado` | string | No | Estado de reserva |
| `tipo_reserva` | enum | No | `con_transfer` \| `sin_transfer` |
| `page` | number | No | Default 1 |
| `limit` | number | No | 1–1000, default 10 |

### `tipo_reporte`

| Valor | Pregunta de negocio |
|-------|---------------------|
| `reservas_tiempo` | Reservas agrupadas en el tiempo |
| `reservas_estado` | Distribución por estado |
| `reservas_empleado` | Reservas por agente |
| `ingresos_tiempo` | Ingresos en el tiempo |
| `ingresos_tour` | Ingresos por tour |

### `granularidad_temporal`

Solo para `reservas_tiempo` e `ingresos_tiempo`:

`semana` · `mes` · `trimestre` · `año`

---

## Formulario de filtros (`ReportFilterForm`)

| Campo UI | Mapea a query |
|----------|----------------|
| `tipo_reporte` | `tipo_reporte` |
| `fecha_inicio` | `fecha_inicio` |
| `fecha_fin` | `fecha_fin` |
| `granularidad_temporal` | `granularidad_temporal` (oculto si no aplica) |
| `tourId` | `tourId` (vacío = todos) |
| `usuarioId` | `usuarioId` |
| `estado` | `estado` |
| `tipo_reserva` | `tipo_reserva` |

Función auxiliar: `needsGranularidad(tipo)` → true para reportes de tiempo.

---

## Respuesta (resumen)

`ReportsData`: KPIs, `datosGrafico` (forma según tipo), `reservas[]`, `pagination`.

Ver tipos en `src/features/reports/types.ts`.
