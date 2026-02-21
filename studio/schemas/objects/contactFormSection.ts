import {defineArrayMember, defineField, defineType} from 'sanity'

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
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name (internal)',
              type: 'string',
              description: 'Internal field name (e.g., "first_name", "email")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
              description: 'Display label shown to the user',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {list: ['text', 'email', 'phone', 'textarea', 'select', 'checkbox']},
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
            defineField({
              name: 'options',
              title: 'Select Options',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Option Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Option Value',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                }),
              ],
              description: 'Options for select fields',
              hidden: ({parent}) => parent?.type !== 'select',
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
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
