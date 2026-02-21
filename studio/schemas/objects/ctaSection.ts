import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {list: ['primary', 'secondary', 'outline']},
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'href',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {list: ['primary', 'secondary', 'neutral', 'transparent']},
      initialValue: 'secondary',
    }),
  ],
})
