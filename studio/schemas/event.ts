import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as {startDate?: string})?.startDate
          if (endDate && startDate && endDate < startDate) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'zoomLink',
      title: 'Zoom Meeting Link',
      type: 'url',
      description: 'URL to join the Zoom meeting',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum attendees (leave empty for unlimited)',
      validation: (rule) => rule.positive().integer(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'startDate',
    },
  },
})
