# Estructura del proyecto  

La app comparte repositorio con la API (Next.js App Router).

```
src/
├── app/                      # Rutas y layouts
│   ├── catalogo/             # Cliente (público / customer)
│   ├── reservas/             # Staff
│   ├── tours/, transfers/, proveedores/, usuarios/, reportes/
│   ├── login/, auth/
│   └── layout.tsx
├── features/                 # Pantallas por dominio
│   ├── auth/
│   ├── client-home/          # Catálogo marketing
│   ├── client-tour-detail/
│   ├── tours/, transfers/, suppliers/
│   ├── reservations/
│   ├── users/
│   ├── reports/
│   └── home/
├── components/
│   ├── ui/                   # shadcn (button, dialog, sidebar…)
│   ├── layout/               # DashboardLayout, guards, ClientShellLayout
│   ├── i18n/                 # ClientI18nProvider, ClientLangSwitcher
│   ├── tours/                # TourImageCarousel
│   ├── app-sidebar.tsx       # Menú staff por rol
│   ├── nav-main.tsx, nav-user.tsx
│   └── client/               # ClientWhatsAppFab
├── hooks/
├── i18n/                     # locales/en, es — catálogo
└── lib/
    └── api.ts                # Cliente Axios
```

## Patrón feature

Cada dominio staff suele tener:

| Archivo | Rol |
|---------|-----|
| `View.tsx` | Tabla + filtros + paginación |
| `Create.tsx` | Alta con React Hook Form + Zod |
| `Edit.tsx` | Edición |
| `Detail.tsx` | Solo reservas/tours detalle |

## Layouts

- **Staff:** `DashboardLayout` + `app-sidebar` — rutas bajo `/home`, `/reservas`, etc.
- **Catálogo:** `catalogo/layout.tsx` — shell cliente, i18n, sin sidebar admin.

## Índice de componentes

Ver: `componentes.md` para el listado y la clasificación de componentes (UI base, layout, navegación, i18n y componentes de dominio).
