import { defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        filter: 'section == $section',
        filterParams: {
          section: 'service',
        },
      },
      description: 'Opcional. Crea categorías en "Contenido > Categorías".',
    },
    {
      name: 'icon',
      title: 'Icon Name (lucide-react)',
      type: 'string',
      description: 'Name of lucide-react icon (e.g., Printer3d, Zap)',
    },
  ],
})
