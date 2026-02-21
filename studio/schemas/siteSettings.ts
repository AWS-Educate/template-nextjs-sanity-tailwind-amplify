import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) =>
        rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['Facebook', 'Instagram', 'Twitter', 'YouTube', 'LinkedIn'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
