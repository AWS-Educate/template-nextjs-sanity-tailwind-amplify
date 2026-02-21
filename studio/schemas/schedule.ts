import {defineArrayMember, defineField, defineType} from 'sanity'

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
      validation: (rule) => rule.required().min(1).max(53),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(2024).max(2100),
    }),
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
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time (HH:MM)',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^\d{1,2}:\d{2}$/, {
                  name: 'time format',
                  invert: false,
                }),
            }),
            defineField({
              name: 'title',
              title: 'Activity Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'instructor',
              title: 'Instructor',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'zoomLink',
              title: 'Zoom Link (if online)',
              type: 'url',
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
