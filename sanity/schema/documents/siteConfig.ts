import { defineType } from 'sanity'

export const siteConfigType = defineType({
  name: 'siteConfig',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
    },
    {
      name: 'businessHours',
      title: 'Horario de atención',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: "Lunes a Viernes: 9:00 - 18:00"',
    },
    {
      name: 'whyChooseUs',
      title: '¿Por qué elegirnos?',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'heroTitle',
      title: 'Hero - Título principal',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero - Subtítulo',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero - Descripción',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroPrimaryCtaText',
      title: 'Hero - Texto botón principal',
      type: 'string',
    },
    {
      name: 'heroPrimaryCtaTarget',
      title: 'Hero - ID destino botón principal',
      type: 'string',
      description: 'Ej: contact o portfolio',
    },
    {
      name: 'heroSecondaryCtaText',
      title: 'Hero - Texto botón secundario',
      type: 'string',
    },
    {
      name: 'heroSecondaryCtaTarget',
      title: 'Hero - ID destino botón secundario',
      type: 'string',
      description: 'Ej: portfolio o contact',
    },
    {
      name: 'footerBrandTitle',
      title: 'Footer - Título marca',
      type: 'string',
      description: 'Ej: cetresdé',
    },
    {
      name: 'footerDescription',
      title: 'Footer - Descripción',
      type: 'text',
      rows: 3,
    },
    {
      name: 'footerQuickLinks',
      title: 'Footer - Enlaces rápidos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Etiqueta', type: 'string' },
            {
              name: 'targetId',
              title: 'ID destino',
              type: 'string',
              description: 'Usa top para ir arriba o el id de sección, por ejemplo contact',
            },
          ],
        },
      ],
    },
    {
      name: 'footerServices',
      title: 'Footer - Lista de servicios',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'footerCopyrightText',
      title: 'Footer - Copyright',
      type: 'string',
      description: 'Ej: © 2026 cetresdé. Todos los derechos reservados.',
    },
  ],
})
