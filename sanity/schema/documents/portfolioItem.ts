import { defineType } from 'sanity'

export const portfolioItemType = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Cofradías', value: 'cofradias' },
          { title: 'Fiestas', value: 'fiestas' },
          { title: 'Merchandising', value: 'merchandising' },
          { title: 'Industrial', value: 'industrial' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'material',
      title: 'Material',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar los items (menor = primero)',
    },
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
