# Rutas (App Router)

Control de acceso: `src/lib/route-access.ts` + `AuthRouteGuard`.

## Autenticación (públicas / recuperación)

| Ruta | Página |
|------|--------|
| `/login` | Login |
| `/auth/forgot-password`, `/forgot-password` | Solicitar reset |
| `/auth/reset-password` | Nueva contraseña |
| `/auth/change-password` | Cambio con sesión |

## Staff (admin / agent)

| Ruta | Rol | Contenido |
|------|-----|-----------|
| `/home` | admin, agent | Panel (`HomeRouter`) |
| `/reservas` | admin, agent | Listado |
| `/reservas/crear` | admin, agent | Nueva reserva |
| `/reservas/[id]` | admin, agent | Detalle |
| `/tours`, `/tours/listar` | admin, agent | Tours |
| `/tours/crear` | **admin** | Alta tour |
| `/tours/[id]` | admin, agent | Detalle tour |
| `/transfers` | admin, agent | Transfers |
| `/transfers/crear` | **admin** | Alta transfer |
| `/proveedores` | admin, agent | Proveedores |
| `/proveedores/crear` | **admin** | Alta proveedor |
| `/usuarios` | **admin** | Usuarios |
| `/usuarios/crear` | **admin** | Alta usuario |
| `/reportes` | **admin** | Reportes |

Prefijos prohibidos para **agent** (`AGENT_FORBIDDEN_PREFIXES`): `/usuarios`, `/tours/crear`, `/transfers/crear`, `/proveedores/crear`, `/reportes`.

## Cliente (catálogo)

| Ruta | Rol |
|------|-----|
| `/catalogo` | Público / customer |
| `/catalogo/tour/[id]` | Detalle tour |
| `/catalogo/tour/[id]/reservar` | Flujo reserva |

## Raíz

`/` — redirección según sesión y rol.
