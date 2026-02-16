import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'Meditation Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'week',
      title: 'Week Number',
      type: 'number',
      description: 'ISO week number',
      validation: (rule) => rule.required().min(1).max(52),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Schedule Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', type: 'string', title: 'Day', options: {list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}},
            {name: 'time', type: 'string', title: 'Time (HH:MM)', validation: (rule) => rule.required()},
            {name: 'title', type: 'string', title: 'Activity Title', validation: (rule) => rule.required()},
            {name: 'description', type: 'text', title: 'Description', rows: 2},
            {name: 'instructor', type: 'string', title: 'Instructor'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'zoomLink', type: 'url', title: 'Zoom Link (if online)'},
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      week: 'week',
      year: 'year',
    },
    prepare(selection) {
      const {title, week, year} = selection
      return {
        title,
        subtitle: `Week ${week}, ${year}`,
      }
    },
  },
})
