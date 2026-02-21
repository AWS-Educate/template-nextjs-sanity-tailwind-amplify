import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              caption: 'caption',
            },
            prepare(selection) {
              const {media, caption} = selection
              return {
                title: caption || 'Gallery Item',
                media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {list: ['grid', 'carousel']},
      initialValue: 'grid',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      images: 'images',
      layout: 'layout',
    },
    prepare(selection) {
      const {images, layout} = selection
      return {
        title: 'Gallery Section',
        subtitle: `${images?.length || 0} images (${layout})`,
      }
    },
  },
})
