import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Form Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Form Description',
      type: 'text',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
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
              options: {list: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox']},
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
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
