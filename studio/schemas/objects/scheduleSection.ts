import {defineField, defineType} from 'sanity'

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
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
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
                subtitle: `${day} - ${time}`,
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
