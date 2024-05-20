export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto'
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.CLOUD_FLARE_URL
    }
  }
})
