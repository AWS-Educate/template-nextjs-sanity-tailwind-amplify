import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'donationSection',
  title: 'Donation Section',
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
      type: 'blockContent',
    }),
    defineField({
      name: 'donationLink',
      title: 'Donation Link URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Donation Section',
        subtitle: 'Link to donation platform',
      }
    },
  },
})
