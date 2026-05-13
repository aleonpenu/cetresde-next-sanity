# CETRESDÉ Web - Next.js + Sanity CMS

Sitio web profesional para CETRESDÉ con Next.js, Sanity CMS y Tailwind CSS.

## Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **CMS**: Sanity
- **Styling**: Tailwind CSS v4 + Radix UI
- **Hosting**: Vercel (ready)
- **Future**: Shopify / Stripe / Medusa integration

## Setup Inicial

### 1. Crear cuenta en Sanity (si no tienes)

1. Ve a [sanity.io](https://sanity.io)
2. Crea una cuenta gratis
3. Crea un nuevo proyecto
4. Cuando termines, copia el **Project ID** y el **Dataset name** (usualmente "production")

### 2. Configurar variables de entorno

1. Copia `.env.local.example` a `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Rellena con tus datos de Sanity:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-11-01
   SANITY_API_TOKEN=tu_api_token  # (opcional, para server-side queries)
   ```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará en `http://localhost:3000`

### 4. Acceder a Sanity Studio

Abre `http://localhost:3000/studio` en el navegador (después de configurar env vars).

## Estructura del Proyecto

```
cetresde-next-sanity/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   └── globals.css        # Tailwind + theme CSS
├── components/            # React components (copiar de spark-template)
│   ├── ui/                # Radix UI components
│   ├── Hero.tsx
│   ├── Services.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── utils.ts
│   └── sanity.client.ts   # Sanity queries
├── sanity/                # Sanity CMS config
│   ├── sanity.config.ts   # Studio config
│   ├── env.ts             # Environment setup
│   ├── lib/
│   │   └── client.ts      # Sanity client
│   ├── schema/
│   │   ├── documents/     # Content types
│   │   └── objects/       # Reusable objects
│   └── types/             # Auto-generated types
├── public/                # Static assets
├── .env.local.example     # Environment template
├── next.config.ts
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## Próximos Pasos

1. ✅ **Crear cuenta Sanity** y copiar credentials
2. ⏳ **Copiar componentes UI** desde `spark-template/src/components/ui/`
3. ⏳ **Crear contenido en Sanity** (services, portfolio, pages)
4. ⏳ **Conectar páginas** con queries a Sanity
5. ⏳ **Deployar en Vercel**
6. ⏳ **Integrar e-commerce** (Shopify/Stripe/Medusa)

## Comandos Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build para producción
npm start            # Ejecutar build de producción
npm run lint         # ESLint check
```

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## Licencia

Proyecto privado de CETRESDÉ
