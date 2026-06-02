# Instalación

El proyecto no se instala por separado: usa el mismo que la API.

Configurar `.env` / `.env.local` en la raíz (incluye `NEXT_PUBLIC_WHATSAPP_NUMBER` para reservar). Lista completa en [Variables de entorno](../backend/variables-entorno.md).

```bash
npm install
npm run dev
```

## Scripts npm

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor desarrollo (Turbopack) |
| `npm run build` | Build producción |
| `npm run start` | Servidor producción |
| `npm run lint` | ESLint |
