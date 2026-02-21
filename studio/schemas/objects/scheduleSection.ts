import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'scheduleSection',
  title: 'Schedule Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Schedule Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              day: 'day',
              time: 'time',
            },
            prepare(selection) {
              const {title, day, time} = selection
              return {
                title: title || 'Schedule Item',
                subtitle: `${day || ''} - ${time || ''}`,
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
      items: 'items',
    },
    prepare(selection) {
      const {items} = selection
      return {
        title: 'Schedule Section',
        subtitle: `${items?.length || 0} schedule items`,
      }
    },
  },
})
