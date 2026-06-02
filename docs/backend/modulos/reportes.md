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

## Respuesta (ejemplo) — `tipo_reporte=reservas_estado`

```json
{
  "success": true,
  "data": {
    "tipo_reporte": "reservas_estado",
    "granularidad_temporal": null,
    "periodo": { "fecha_inicio": "2026-06-01", "fecha_fin": "2026-06-30" },
    "kpis": {
      "total_reservas": 12,
      "reservas_canceladas": 2,
      "reservas_no_canceladas": 10,
      "porcentaje_cancelaciones": 16.67,
      "total_ingresos": 2100,
      "total_descuentos": 0,
      "total_iva": 273,
      "promedio_reserva": 175
    },
    "datosGrafico": [
      { "estado": "pending", "cantidad": 6 },
      { "estado": "in_progress", "cantidad": 2 },
      { "estado": "completed", "cantidad": 2 },
      { "estado": "cancelled", "cantidad": 2 }
    ],
    "totalReservas": 12,
    "reservas": [],
    "pagination": { "page": 1, "limit": 10, "total": 12, "totalPages": 2 }
  }
}
```

## Cliente

`src/features/reports/ReportsView.tsx`, `/reportes`, export PDF/Excel en `export-report.ts`.
