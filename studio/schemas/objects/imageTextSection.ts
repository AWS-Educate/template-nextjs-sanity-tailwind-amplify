import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageTextSection',
  title: 'Image + Text Section',
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
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {list: ['left', 'right']},
      initialValue: 'left',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
      position: 'imagePosition',
    },
    prepare(selection) {
      const {title, media, position} = selection
      return {
        title: title || 'Image + Text Section',
        subtitle: `Image position: ${position}`,
        media,
      }
    },
  },
})
