import { defineField, defineType } from 'sanity'
import { RichTextPreview } from '../components/RichTextPreview'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Description (SEO Meta)', type: 'text' }),
    defineField({ name: 'mainImage', title: 'Main image (Featured)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gear Lab', value: 'gear-lab' },
          { title: 'Bean & Roastery', value: 'bean-roastery' },
          { title: 'Brew Mastery', value: 'brew-mastery' },
          { title: 'Barista Life', value: 'barista-life' },
          { title: 'Buying Guides', value: 'buying-guides' },
        ],
      },
    }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Admin', readOnly: true }),
    defineField({
      name: 'tags',
      title: 'Tags (Checklist)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Gear Lab', value: 'gear-lab' },
          { title: 'Bean & Roastery', value: 'bean-roastery' },
          { title: 'Brew Mastery', value: 'brew-mastery' },
          { title: 'Barista Life', value: 'barista-life' },
          { title: 'Buying Guides', value: 'buying-guides' },
        ],
      },
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: (new Date()).toISOString() }),
    
    defineField({
      name: 'visualContent',
      title: 'Isi Artikel Lengkap',
      type: 'array',
      components: {
        input: RichTextPreview
      },
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }]
        },
        {
          name: 'affiliateButton',
          type: 'object',
          title: '🛒 Tombol Affiliate',
          fields: [
            { name: 'url', type: 'url' },
            { name: 'label', type: 'string', initialValue: 'Check Price' }
          ]
        }
      ]
    }),
  ],
})