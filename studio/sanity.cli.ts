import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '{{SANITY_PROJECT_ID}}',
    dataset: '{{SANITY_DATASET}}'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
