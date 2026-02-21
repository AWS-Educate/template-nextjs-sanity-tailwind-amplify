import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'legacyRedirect',
  title: 'Legacy URL Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'oldPath',
      title: 'Old URL Path',
      type: 'string',
      description: 'Path from old Wix site (e.g., /meditation-guide)',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\//, {name: 'starts with /', invert: false}),
    }),
    defineField({
      name: 'newPath',
      title: 'New URL Path',
      type: 'string',
      description: 'Path in new Next.js site (e.g., /teachings/meditation-guide)',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\//, {name: 'starts with /', invert: false}),
    }),
    defineField({
      name: 'statusCode',
      title: 'HTTP Status Code',
      type: 'number',
      options: {list: [301, 302, 307, 308]},
      initialValue: 301,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Reason for redirect or migration notes',
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
      oldPath: 'oldPath',
      newPath: 'newPath',
    },
    prepare(selection) {
      const {oldPath, newPath} = selection
      return {
        title: oldPath,
        subtitle: `→ ${newPath}`,
      }
    },
  },
})
