# Catálogo cliente

Superficie orientada al visitante o rol **customer**, bajo `/catalogo`.

## Rutas

| Ruta | Componente principal |
|------|----------------------|
| `/catalogo` | `ClientCatalogPageView`, `TourCatalog` |
| `/catalogo/tour/[id]` | `TourDetailCard` |
| `/catalogo/tour/[id]/reservar` | `TourReservationForm` |

## i18n

- Recursos: `src/i18n/locales/es/client.json`, `en/client.json`
- Instancia cliente: `src/i18n/clientInstance.ts`
- Selector: `ClientLangSwitcher`

## Características

- Hero y marketing: `ClientHero`, `ClientHomeHeroView`
- Acceso condicional: `clientCatalogAccess.tsx`
- WhatsApp: `ClientWhatsAppFab`, `ClientWhatsAppMessageContext`
- Layout dedicado sin sidebar admin: `src/app/catalogo/layout.tsx`

## API usada

El catálogo consume endpoints públicos o autenticados según flujo (tours GET, slot-availability, creación de reserva si el usuario es agent/customer con permiso).

!!! tip "Staff vs cliente"
    Los agentes/admin gestionan reservas en `/reservas`; el catálogo es la experiencia comercial para el cliente final.
