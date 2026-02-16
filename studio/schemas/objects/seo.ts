import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (50-60 characters)',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description (150-160 characters)',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main SEO keywords (comma-separated)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
    }),
  ],
})
