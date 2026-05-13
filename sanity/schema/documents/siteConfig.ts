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
  ],
})
