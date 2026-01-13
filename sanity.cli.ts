import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6ocswb4i',
    dataset: 'production'
  },
  deployment: {
    appId: 'xevkcqolorbetxpzoqg63580',
    autoUpdates: true,
  }
})
