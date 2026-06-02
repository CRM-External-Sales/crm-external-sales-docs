# Instalación

## 1. Clonar e instalar dependencias

```bash
git clone <url-del-repositorio>
cd crm-external-sales
npm install
```

`postinstall` ejecuta `prisma generate` automáticamente.

## 2. Configurar entorno

Copiar variables de ejemplo (crear `.env.local` en la raíz):

```bash
# Ver lista completa en variables-entorno.md
DATABASE_URL=""
DIRECT_URL=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
NEXT_PUBLIC_WHATSAPP_NUMBER=""
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 3. Base de datos

```bash
npx prisma db push
# o, si usan migraciones versionadas:
# npx prisma migrate deploy
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

Aplicación en `http://localhost:3000`.

## 5. Build de producción

```bash
npm run build
npm run start
```

Programar cron (Vercel u otro) para `GET /api/cron/sync-reservation-states` con header `Authorization: Bearer <CRON_SECRET>` cada 10–15 minutos.
