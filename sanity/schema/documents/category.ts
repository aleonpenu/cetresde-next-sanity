import { defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
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
      name: 'section',
      title: 'Sección',
      type: 'string',
      options: {
        list: [
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Servicios', value: 'service' },
        ],
        layout: 'radio',
      },
      initialValue: 'portfolio',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Menor número = aparece antes',
    },
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Título A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'section',
    },
    prepare({ title, subtitle }) {
      const sectionLabel = subtitle === 'service' ? 'Servicios' : 'Portfolio'
      return {
        title,
        subtitle: `Sección: ${sectionLabel}`,
      }
    },
  },
})
