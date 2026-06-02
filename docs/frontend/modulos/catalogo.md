# Catálogo cliente

**Ubicación:** `src/features/client-home/`, `client-tour-detail/`  
**Rutas:** `/catalogo`, `/catalogo/tour/[id]`, `/catalogo/tour/[id]/reservar`  
**Rol:** público o **customer**  
**i18n:** `src/i18n/locales/{es,en}/client.json`

!!! important "No crea reserva en la API"
    El formulario de reserva del catálogo **no llama** a `POST /api/reservations`. Al enviar, abre **WhatsApp** con un mensaje prellenado (`openWhatsApp`). La reserva operativa la registra staff en `/reservas/crear`.

## Componentes

### Layout y shell

| Componente | Archivo | Descripción |
|------------|-----------|-------------|
| `ClientCatalogAccessGate` | `client-home/clientCatalogAccess.tsx` | Gate de primera visita al catálogo |
| `ClientShellLayout` | `components/layout/ClientShellLayout.tsx` | Contenedor marketing (sin sidebar staff) |
| `ClientI18nProvider` | `components/i18n/ClientI18nProvider.tsx` | i18n solo catálogo |
| `ClientLangSwitcher` | `components/i18n/ClientLangSwitcher.tsx` | ES / EN en hero |
| `ClientWhatsAppFab` | `components/client/ClientWhatsAppFab.tsx` | Botón flotante WhatsApp |
| `ClientWhatsAppMessageScope` | `client-home/ClientWhatsAppMessageContext.tsx` | Mensaje personalizado por página |

### Vistas feature

| Componente | Archivo | Descripción |
|------------|-----------|-------------|
| `ClientHomeHeroView` | `client-home/ClientHomeHeroView.tsx` | Landing inicial Río Perdido |
| `ClientHero` | `client-home/ClientHero.tsx` | Hero con CTA al catálogo |
| `ClientCatalogPageView` | `client-home/ClientCatalogPageView.tsx` | Página listado tours |
| `TourCatalog` | `client-home/TourCatalog.tsx` | Grid tarjetas + búsqueda |
| `ClientMarketingBackNav` | `client-home/ClientMarketingBackNav.tsx` | Volver al marketing |
| `TourDetailCard` | `client-tour-detail/TourDetailCard.tsx` | Detalle tour + CTA reservar |
| `TourReservationForm` | `client-tour-detail/TourReservationForm.tsx` | Formulario → WhatsApp |

**UI:** `Input`, `Button`, `Label`, `Calendar`, `Popover` (fecha cliente).

---

## Listado (`/catalogo`)

**Componentes:** `ClientCatalogPageView`, `TourCatalog`

**API (lectura):**

| Llamada | Parámetros típicos |
|---------|-------------------|
| `GET /api/tours` | Tours disponibles para mostrar en catálogo |
| Filtros en cliente | Búsqueda / acceso según `clientCatalogAccess.tsx` |

No hay formulario POST en el listado.

---

## Detalle tour (`/catalogo/tour/[id]`)

**Componente:** `TourDetailCard`

Muestra datos del tour (nombre, imágenes, horarios, precio, cupo). Navegación a `/reservar`.

---

## Formulario de reserva (`TourReservationForm`)

**Schema:** Zod dinámico `buildReservationSchema(tour, t)` en `TourReservationForm.tsx`

| Campo | Tipo | Validación |
|-------|------|------------|
| `fullName` | string | Obligatorio |
| `people` | number | ≥ 1; ≤ `tour.spots` si hay cupo definido |
| `date` | string | `YYYY-MM-DD`, no pasada |
| `schedule` | string | `HH:MM` del `tour_schedule`; obligatorio si hay horarios ese día |
| `requiresTransfer` | `yes` \| `no` | Solo para el mensaje de WhatsApp |

### Reglas según tour

- Solo fechas cuyo **día de la semana** tenga entrada en `tour_schedule`.
- Si el día tiene horarios, debe elegirse `schedule`.
- `people` no puede superar `tour.spots`.

### Salida (WhatsApp)

Mensaje con: nombre del tour, nombre del cliente, personas, fecha (formato legible), horario, si requiere transfer (sí/no). Textos traducidos vía i18n (`reservation.waMessageIntro`, etc.).

---

## Marca Río Perdido

- `brandLine` / `logoAria` en traducciones cliente.
- Estilos superficie: crema `#F2F1ED` en componentes cliente (alineado con panel staff).

---

## Contraste con reserva staff

| | Catálogo | Panel `/reservas/crear` |
|---|----------|-------------------------|
| Autenticación | Opcional / customer | admin, agent |
| Persistencia | WhatsApp | `POST /api/reservations` |
| Campos | Nombre, personas, fecha, hora, transfer sí/no | Tour, hotel, IVA, descuento, transfer real, etc. |
