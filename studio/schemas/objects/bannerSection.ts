import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bannerSection',
  title: 'Banner Section',
  type: 'object',
  fields: [
    defineField({
      name: 'message',
      title: 'Banner Message',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {list: ['primary', 'secondary', 'warning']},
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name (e.g., bell, info, alert, check)',
    }),
  ],
  preview: {
    select: {
      message: 'message',
      backgroundColor: 'backgroundColor',
    },
    prepare(selection) {
      const {message, backgroundColor} = selection
      return {
        title: message || 'Banner Section',
        subtitle: `Color: ${backgroundColor || 'primary'}`,
      }
    },
  },
})
