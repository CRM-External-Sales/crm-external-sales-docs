# Autenticación

**Ubicación:** `src/features/auth/`  
**Rutas:** `/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/change-password`  
**Servicio:** `authService` en `src/lib/api.ts`  
**Schemas:** `src/app/schemas/user.schema.ts`

## Pantallas

| Vista | Archivo | Acción |
|-------|---------|--------|
| Login | `auth/View.tsx` | Iniciar sesión |
| Olvidé contraseña | `ForgotPasswordView.tsx` | Email de recuperación |
| Restablecer | `ResetPasswordView.tsx` | Nueva contraseña con token |
| Cambiar contraseña | `ChangePasswordView.tsx` | Con sesión activa |

## Componentes

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `View` (login) | `features/auth/View.tsx` | Formulario email/contraseña; redirige tras `useAuth().login` |
| `ForgotPasswordView` | `features/auth/ForgotPasswordView.tsx` | Un campo email |
| `ResetPasswordView` | `features/auth/ResetPasswordView.tsx` | Contraseña + confirmación; lee token de URL |
| `ChangePasswordView` | `features/auth/ChangePasswordView.tsx` | Actual / nueva / confirmar |
| `AuthRouteGuard` | `components/layout/AuthRouteGuard.tsx` | Protege rutas staff; no aplica en `/login` |
| `RouteAccessSpinner` | `components/layout/RouteAccessSpinner.tsx` | Carga mientras valida sesión y rol |

**UI:** `Input`, `Label`, `Button`, `Alert` en todas las vistas. Sin tablas ni sidebar (páginas centradas).

---

## Login

**API:** `POST /api/auth/login`

| Campo | Tipo | Validación (Zod `LoginSchema`) |
|-------|------|--------------------------------|
| `email` | string | Obligatorio, email válido |
| `password` | string | Obligatorio (mín. 1 en formulario) |

**Respuesta usada:** `user`, `session.access_token` → guardados en `localStorage` vía `tokenUtils` / `userUtils`.

---

## Olvidé contraseña

**API:** `POST /api/auth/forgot-password`

| Campo | Tipo | Validación (`ForgotPasswordSchema`) |
|-------|------|-------------------------------------|
| `email` | string | Obligatorio, email válido |

---

## Restablecer contraseña

**API:** `POST /api/auth/reset-password`

| Campo | Tipo | Validación |
|-------|------|------------|
| `token` | string | Obligatorio (desde URL) |
| `password` | string | Mín. 8, mayúscula, minúscula, número, especial `@$!%*?&` |

El formulario en cliente (`ResetPasswordFormSchema`) añade **confirmación** de contraseña antes de enviar.

---

## Cambiar contraseña (logueado)

**API:** `POST /api/auth/change-password`

| Campo | Tipo | Validación (`ChangePasswordFormSchema`) |
|-------|------|----------------------------------------|
| `currentPassword` | string | Obligatorio |
| `newPassword` | string | Mismas reglas que arriba |
| `confirmPassword` | string | Debe coincidir con `newPassword` |

---

## Usuario actual

**API:** `GET /api/auth/logout` (en este proyecto devuelve el usuario de la sesión; no cierra sesión).

`authService.getCurrentUser()` — usado por `useAuth`.
