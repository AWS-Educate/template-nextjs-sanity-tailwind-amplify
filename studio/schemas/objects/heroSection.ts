import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'href',
          title: 'Button URL',
          type: 'string',
        }),
        defineField({
          name: 'variant',
          title: 'Button Variant',
          type: 'string',
          options: {list: ['primary', 'secondary']},
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
  },
})
