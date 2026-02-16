import {defineField, defineType} from 'sanity'

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
        {
          type: 'object',
          fields: [
            {name: 'text', type: 'string', title: 'Button Text'},
            {name: 'href', type: 'string', title: 'URL'},
            {name: 'variant', type: 'string', title: 'Variant', options: {list: ['primary', 'secondary', 'outline']}},
          ],
        },
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
