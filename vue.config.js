// vue.config.js file to be place in the root of your repository

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/typing_tool/' : '/',
  chainWebpack: config => config.plugin('html').tap(args => args[0].title = "Typing Tool"),
}