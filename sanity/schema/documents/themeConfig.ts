import { defineType, defineField } from 'sanity'

export const themeConfigType = defineType({
  name: 'themeConfig',
  title: 'Configuración de Tema',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'colors', title: 'Colores' },
    { name: 'typography', title: 'Tipografía' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Tema',
      type: 'string',
      description: 'Ej: "Tema Principal", "Oscuro", etc.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'isActive',
      title: 'Activar en producción',
      type: 'boolean',
      description: 'Solo un tema puede estar activo',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'colors',
      title: 'Colores',
      type: 'object',
      group: 'colors',
      fields: [
        defineField({
          name: 'primary',
          title: 'Color Primario',
          type: 'string',
          description: 'Formato: "H S% L%" (ej: "8 75% 45%")',
        }),
        defineField({
          name: 'primaryForeground',
          title: 'Primario - Texto',
          type: 'string',
          description: 'Formato: "H S% L%" (ej: "0 0% 100%")',
        }),
        defineField({
          name: 'secondary',
          title: 'Color Secundario',
          type: 'string',
        }),
        defineField({
          name: 'secondaryForeground',
          title: 'Secundario - Texto',
          type: 'string',
        }),
        defineField({
          name: 'accent',
          title: 'Color Acentuado',
          type: 'string',
        }),
        defineField({
          name: 'accentForeground',
          title: 'Acentuado - Texto',
          type: 'string',
        }),
        defineField({
          name: 'background',
          title: 'Fondo',
          type: 'string',
        }),
        defineField({
          name: 'foreground',
          title: 'Texto Principal',
          type: 'string',
        }),
        defineField({
          name: 'card',
          title: 'Fondo Tarjetas',
          type: 'string',
        }),
        defineField({
          name: 'cardForeground',
          title: 'Tarjetas - Texto',
          type: 'string',
        }),
        defineField({
          name: 'muted',
          title: 'Muted (Desactivado)',
          type: 'string',
        }),
        defineField({
          name: 'mutedForeground',
          title: 'Muted - Texto',
          type: 'string',
        }),
        defineField({
          name: 'destructive',
          title: 'Destructivo (Error)',
          type: 'string',
        }),
        defineField({
          name: 'destructiveForeground',
          title: 'Destructivo - Texto',
          type: 'string',
        }),
        defineField({
          name: 'border',
          title: 'Bordes',
          type: 'string',
        }),
        defineField({
          name: 'input',
          title: 'Inputs',
          type: 'string',
        }),
        defineField({
          name: 'ring',
          title: 'Ring (Focus)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Tipografía',
      type: 'object',
      group: 'typography',
      fields: [
        defineField({
          name: 'borderRadius',
          title: 'Border Radius (px)',
          type: 'string',
          description: 'Ej: "0.75rem" o "12px"',
        }),
        defineField({
          name: 'fontFamily',
          title: 'Font Family',
          type: 'string',
          description: 'Ej: "Inter, sans-serif"',
        }),
      ],
    }),
  ],
})
