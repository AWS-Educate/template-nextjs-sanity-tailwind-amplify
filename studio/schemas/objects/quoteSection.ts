import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
      description: 'E.g., "Yoga Instructor", "Devotee", "Teacher"',
    }),
    defineField({
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      author: 'author',
      media: 'image',
    },
    prepare(selection) {
      const {author, media} = selection
      return {
        title: author || 'Quote Section',
        subtitle: 'Testimonial',
        media,
      }
    },
  },
})
