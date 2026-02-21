import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'eventRegistrationSection',
  title: 'Event Registration Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'eventLink',
      title: 'Event Registration URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'formFields',
      title: 'Registration Form Fields',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name (internal)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {list: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'date']},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              required: 'required',
            },
            prepare(selection) {
              const {label, type, required} = selection
              return {
                title: label || 'Form Field',
                subtitle: `${type}${required ? ' (required)' : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
