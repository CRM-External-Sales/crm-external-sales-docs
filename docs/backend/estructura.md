# Estructura del proyecto

```
crm-external-sales/
├── docs/                    # Manual MkDocs (este sitio)
├── prisma/
│   ├── schema.prisma        # Modelo PostgreSQL (public + auth)
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/             # 26 Route Handlers REST
│   │   ├── auth/            # Páginas recuperación / cambio contraseña
│   │   ├── catalogo/        # Vista cliente
│   │   ├── reservas/        # Gestión reservas (staff)
│   │   ├── tours/           # Gestión tours
│   │   ├── transfers/
│   │   ├── proveedores/
│   │   ├── usuarios/
│   │   ├── reportes/
│   │   ├── login/
│   │   └── schemas/         # Esquemas Zod compartidos API + forms
│   ├── components/          # UI (shadcn/Radix)
│   ├── features/            # Vistas por dominio (Create, View, Edit…)
│   ├── hooks/               # React Query + auth
│   ├── i18n/                # Traducciones catálogo cliente
│   ├── lib/                 # Lógica de negocio y middleware
│   └── generated/prisma/    # Cliente Prisma generado
├── public/
├── mkdocs.yml
├── ENDPOINTS_README.md      # Referencia API compacta
└── package.json
```

## Convenciones

| Patrón | Uso |
|--------|-----|
| `src/features/<dominio>/View.tsx` | Listados con filtros y paginación |
| `src/features/<dominio>/Create.tsx` | Alta |
| `src/features/<dominio>/Edit.tsx` | Edición |
| `src/hooks/use<Dominio>.ts` | Fetch con React Query |
| `src/app/api/<recurso>/route.ts` | Colección |
| `src/app/api/<recurso>/[id]/route.ts` | Recurso por ID |

## Archivo principal de la aplicación

- **Layout raíz:** `src/app/layout.tsx` — providers (tema, React Query, i18n según ruta).
- **Entrada:** `src/app/page.tsx` — redirección según sesión/rol.
