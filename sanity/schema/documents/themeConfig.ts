import { defineType, defineField } from 'sanity'
// color type is registered via sanity-plugin-color-input in sanity.config.ts

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
        defineField({ name: 'primary', title: 'Color Primario', type: 'color' }),
        defineField({ name: 'primaryForeground', title: 'Primario - Texto', type: 'color' }),
        defineField({ name: 'secondary', title: 'Color Secundario', type: 'color' }),
        defineField({ name: 'secondaryForeground', title: 'Secundario - Texto', type: 'color' }),
        defineField({ name: 'accent', title: 'Color Acentuado', type: 'color' }),
        defineField({ name: 'accentForeground', title: 'Acentuado - Texto', type: 'color' }),
        defineField({ name: 'background', title: 'Fondo', type: 'color' }),
        defineField({ name: 'foreground', title: 'Texto Principal', type: 'color' }),
        defineField({ name: 'card', title: 'Fondo Tarjetas', type: 'color' }),
        defineField({ name: 'cardForeground', title: 'Tarjetas - Texto', type: 'color' }),
        defineField({ name: 'muted', title: 'Muted (Desactivado)', type: 'color' }),
        defineField({ name: 'mutedForeground', title: 'Muted - Texto', type: 'color' }),
        defineField({ name: 'destructive', title: 'Destructivo (Error)', type: 'color' }),
        defineField({ name: 'border', title: 'Bordes', type: 'color' }),
        defineField({ name: 'ring', title: 'Ring (Focus)', type: 'color' }),
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Tipografía',
      type: 'object',
      group: 'typography',
      fields: [
        defineField({
          name: 'fontFamily',
          title: 'Fuente Principal',
          type: 'string',
          options: {
            list: [
              { title: 'Inter — moderna sans-serif', value: 'Inter, sans-serif' },
              { title: 'Geist — minimalista (defecto)', value: 'Geist, sans-serif' },
              { title: 'Roboto — neutra y legible', value: 'Roboto, sans-serif' },
              { title: 'Poppins — geométrica amigable', value: 'Poppins, sans-serif' },
              { title: 'Montserrat — elegante display', value: 'Montserrat, sans-serif' },
              { title: 'Raleway — refined display', value: 'Raleway, sans-serif' },
              { title: 'Space Grotesk — técnica moderna', value: 'Space Grotesk, sans-serif' },
              { title: 'DM Sans — limpia editorial', value: 'DM Sans, sans-serif' },
              { title: 'Merriweather — serif clásica', value: 'Merriweather, serif' },
              { title: 'Playfair Display — serif elegante', value: 'Playfair Display, serif' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'borderRadius',
          title: 'Redondez de esquinas',
          type: 'string',
          options: {
            list: [
              { title: 'Cuadrado (0px)', value: '0rem' },
              { title: 'Sutil (4px)', value: '0.25rem' },
              { title: 'Normal (8px)', value: '0.5rem' },
              { title: 'Redondeado (12px)', value: '0.75rem' },
              { title: 'Muy redondeado (16px)', value: '1rem' },
              { title: 'Píldora (9999px)', value: '9999px' },
            ],
            layout: 'radio',
          },
        }),
      ],
    }),
  ],
})
