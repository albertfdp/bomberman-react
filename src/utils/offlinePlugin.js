module.exports = __PRODUCTION__
  ? require('./offlinePlugin.prod')
  : {}
