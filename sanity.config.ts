import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {markdownSchema} from 'sanity-plugin-markdown'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'zaidly',
  projectId: '6ocswb4i', // ID Proyek abang
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    markdownSchema(), // Pakai yang standar aja biar stabil
  ],

  schema: {
    types: schemaTypes,
  },
})