const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

function resolve(dir) {
  return path.join(__dirname, dir)
}

const vueConfig = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    // config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: true
}

module.exports = Object.assign(
  defineConfig({ transpileDependencies: true }),
  vueConfig
)
