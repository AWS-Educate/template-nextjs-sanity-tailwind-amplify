import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogFeedSection',
  title: 'Blog Feed Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Posts',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.min(1).max(50),
    }),
    defineField({
      name: 'categoryFilter',
      title: 'Category Filter',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional: Filter posts by category. Leave empty for all posts.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      limit: 'limit',
    },
    prepare(selection) {
      const {title, limit} = selection
      return {
        title: title || 'Blog Feed Section',
        subtitle: `Show ${limit || 6} latest posts`,
      }
    },
  },
})
