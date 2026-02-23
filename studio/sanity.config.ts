import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: '{{PROJECT_NAME}} Studio',

  projectId: '{{SANITY_PROJECT_ID}}',
  dataset: '{{SANITY_DATASET}}',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
