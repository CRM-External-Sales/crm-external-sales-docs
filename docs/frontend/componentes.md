# Componentes

En este proyecto, la UI se construye con componentes reutilizables y “shells” (layout + navegación) que se combinan dentro de las vistas en `src/features/`.

## Dónde vive cada cosa

| Capa | Ruta | Qué contiene |
|---|---|---|
| UI base (shadcn/Radix) | `src/components/ui/*` | Componentes atómicos: inputs, botones, tablas, overlays, etc. |
| Layout staff / guards | `src/components/layout/*` | Estructura de panel: `DashboardLayout`, `AuthRouteGuard`, `RouteAccessSpinner` y el shell de cliente. |
| Navegación | `src/components/app-sidebar.tsx`, `src/components/nav-*.tsx` | Menú lateral y entradas por rol (admin/agent). |
| i18n (catálogo) | `src/components/i18n/*` | Provider y selector de idioma para el catálogo del cliente. |
| Componentes de dominio | `src/components/tours/*` | Componentes “propios del dominio”, p. ej. carrusel de imágenes. |
| Client utilities | `src/components/client/*` | Componentes utilitarios del catálogo (p. ej. WhatsApp FAB). |

> Nota: componentes específicos de reportes (ej. `ReportFilters`, `ReportChart`) se implementan dentro de `src/features/*/components/` y se describen mejor en cada módulo.

## UI base (`src/components/ui/*`)

Comúnmente usados en los módulos:

- `Button`, `Input`, `Label`
- `Table` y `PaginationControls`
- `Dialog` / `AlertDialog` (confirmaciones)
- `Alert` (mensajes de error/ok)
- `Calendar`, `Popover`, `Tooltip`
- Navegación responsiva: `Sidebar`, `Sheet`, `Collapsible`, `Separator`
- Feedback: `sonner` (toasts), `Skeleton` (loading)
- Extras: `Breadcrumb`, `Avatar`, `DropdownMenu`

## Layout y protección de rutas

- `src/components/layout/DashboardLayout.tsx`: shell del panel staff (incluye sidebar, separators y carga de acceso).
- `src/components/layout/AuthRouteGuard.tsx`: bloquea rutas staff si el usuario no tiene sesión/rol permitido.
- `src/components/layout/RouteAccessSpinner.tsx`: spinner mientras se valida acceso.
- `src/components/layout/ClientShellLayout.tsx`: estructura del catálogo sin sidebar admin.

## Navegación (por rol)

- `src/components/app-sidebar.tsx`: genera el menú según permisos (`role-permissions`).
- `src/components/nav-main.tsx`, `src/components/nav-user.tsx`: piezas del menú.
- `src/components/team-switcher.tsx`: selector de “equipo/tenant” si aplica (según rol y permisos).

## i18n del catálogo

- `src/components/i18n/ClientI18nProvider.tsx`: provider i18n para el catálogo.
- `src/components/i18n/ClientLangSwitcher.tsx`: selector de idioma ES/EN.

## Dominio y utilidades del catálogo

- `src/components/tours/TourImageCarousel.tsx`: carrusel de imágenes del tour (usado en vistas de tours).
- `src/components/client/ClientWhatsAppFab.tsx`: botón flotante WhatsApp para contacto del catálogo.

