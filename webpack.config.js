module.exports = process.env.NODE_ENV === 'production'
  ? require('./config/webpack.config.prod')
  : require('./config/webpack.config.dev')
