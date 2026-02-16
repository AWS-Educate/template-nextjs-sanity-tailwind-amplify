import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookstoreItem',
  title: 'Bookstore Item',
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
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {list: ['Spanish', 'English', 'Portuguese']},
    }),
    defineField({
      name: 'price',
      title: 'Price (COP)',
      type: 'number',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      title: 'Book Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Autobiography', 'Teachings', 'Meditation', 'Philosophy', 'Biography', 'Self-help']},
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'author',
    },
  },
})
