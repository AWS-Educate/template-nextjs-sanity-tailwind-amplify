import {defineField, defineType} from 'sanity'

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
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {list: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'date']},
              validation: (rule) => rule.required(),
            },
            {
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              name: 'name',
              type: 'type',
              required: 'required',
            },
            prepare(selection) {
              const {name, type, required} = selection
              return {
                title: name || 'Form Field',
                subtitle: `${type}${required ? ' (required)' : ''}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
