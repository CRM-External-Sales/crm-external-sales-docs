[← Regresar a Módulos](index.md){ .modulo-back }

# Usuarios

**Ubicación:** `src/features/users/`  
**Rutas:** `/usuarios`, `/usuarios/crear`, edición vía query `?edit=me` o por ID  
**Rol:** solo **admin**  
**Servicio:** `userService`  
**Schemas:** `src/app/schemas/user.schema.ts`

## Pantallas

| Vista | Archivo |
|-------|---------|
| Listado + filtros | `View.tsx` |
| Alta | `Create.tsx` |
| Edición | `Edit.tsx` |

## Componentes

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `UsersView` | `View.tsx` | Tabla paginada, búsqueda, filtros por rol (radio), menú acciones, diálogo eliminar |
| `CreateUserView` | `Create.tsx` | Tarjeta formulario alta; borrador `useFormDraft` |
| `EditUserView` | `Edit.tsx` | Edición; deshabilita rol si es el propio usuario |
| `AppSidebar` → Usuarios | `components/app-sidebar.tsx` | Entrada “Gestión de Usuarios” solo si `canAccessUsersArea` |
| `PaginationControls` | `components/ui/pagination-controls.tsx` | Paginación del listado |
| `DashboardLayout` | `components/layout/DashboardLayout.tsx` | Shell con sidebar en `/usuarios/*` |

**UI habitual:** `Table`, `DropdownMenu`, `Dialog`, `Input`, `Button`, `Alert`.

---

## Listado — filtros (query)

**API:** `GET /api/users`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `page` | number | Página (default 1) |
| `limit` | number | Tamaño de página (default 10) |
| `role` | `admin` \| `agent` \| `customer` | Filtro por rol (toggle en UI) |
| `search` | string | Búsqueda (username/email; debounce en UI) |

Schema de referencia: `UserQuerySchema`.

---

## Crear usuario

**API:** `POST /api/users`  
**Schema formulario:** `CreateUserSchema`

| Campo | Tipo | Validación |
|-------|------|------------|
| `username` | string | 3–20 caracteres, solo `a-zA-Z0-9_` |
| `email` | string | Email válido |
| `password` | string | Mín. 8, mayúscula, minúscula, número, especial |
| `phone` | string | **Exactamente 8 dígitos** |
| `role` | enum | `admin`, `agent`, `customer` |

---

## Actualizar usuario

**API:** `PUT /api/users/:id`

| Campo | Tipo | Validación (`UpdateUserSchema`) |
|-------|------|----------------------------------|
| `username` | string | Opcional, mismas reglas que crear |
| `email` | string | Opcional, email válido |
| `phone` | string | Opcional |
| `role` | enum | Opcional |
| `password` | string | Opcional, mismas reglas de complejidad |

En edición del **propio usuario**, el rol puede estar deshabilitado en UI.

---

## Eliminar

**API:** `DELETE /api/users/:id` — solo admin; diálogo de confirmación en `View.tsx`.
