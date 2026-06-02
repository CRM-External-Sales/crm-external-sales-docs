# Reportes

**Schema:** `report.schema.ts`  
**Ruta:** `src/app/api/reports/route.ts` — solo **admin**

## GET `/api/reports`

### Query obligatorios

| Param | Valores |
|-------|---------|
| `tipo_reporte` | Ver tabla abajo |
| `fecha_inicio`, `fecha_fin` | Fechas válidas, inicio ≤ fin |
| `granularidad_temporal` | Requerido si el tipo es “de tiempo” |

### Tipos de reporte

| `tipo_reporte` | Pregunta de negocio |
|----------------|---------------------|
| `reservas_tiempo` | Reservas agrupadas en el tiempo |
| `reservas_estado` | Distribución por estado |
| `reservas_empleado` | Por agente / empleado |
| `ingresos_tiempo` | Ingresos en el tiempo |
| `ingresos_tour` | Ingresos por tour |

### Granularidad (reportes de tiempo)

`semana` · `mes` · `trimestre` · `año`

### Filtros opcionales

`tourId`, `usuarioId`, `estado`, `tipo_reserva` (`con_transfer` | `sin_transfer`), `page`, `limit` (1–1000).

### Restricciones por tipo

| Tipo | Filtro no permitido |
|------|---------------------|
| `reservas_estado` | `estado` |
| `reservas_empleado` | `usuarioId` |
| `ingresos_tour` | `tourId` |

El filtro `estado` con valores de ciclo de vida usa el mismo **estado efectivo** que el listado de reservas.

### Respuesta `data`

`tipo_reporte`, `granularidad_temporal`, `periodo`, `kpis`, `datosGrafico`, `totalReservas`, `reservas`, `pagination`.

## Frontend

`src/features/reports/ReportsView.tsx`, `/reportes`, export PDF/Excel en `export-report.ts`.
