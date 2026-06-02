# Hooks

Ubicación: `src/hooks/`

## Autenticación

| Hook | Archivo | Uso |
|------|---------|-----|
| `useAuth` | `useAuth.ts` | Login, logout, usuario, loading |

## Datos (React Query)

| Hook | Dominio |
|------|---------|
| `useTours` | Listado tours paginado |
| `useTour` | Detalle un tour |
| `useTransfers` | Transfers |
| `useSuppliers` | Proveedores |
| `useUsers` | Usuarios |
| `useReservations` | Listado reservas |
| `useReservation` | Detalle una reserva |

Patrón típico:

```typescript
const { data, isLoading, error, refetch } = useTours({
  page: 1,
  limit: 10,
  name: searchTerm,
});
```

## Utilidades UI

| Hook | Uso |
|------|-----|
| `use-mobile` | Breakpoint móvil (sidebar) |
| `useFormDraft` | Borrador de formularios en `localStorage` |
| `useStateDraft` | Borrador de estado de filtros |

## Provider

`src/providers/ReactQuery.tsx` — envuelve la app con `QueryClientProvider` y devtools en desarrollo.
