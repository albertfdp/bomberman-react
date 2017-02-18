import OfflinePlugin from 'offline-plugin/runtime'

OfflinePlugin.install({
  onUpdateReady: function () {
    OfflinePlugin.applyUpdate()
  },
  onUpdated: function () {
    window.location.reload()
  }
})

export default OfflinePlugin
