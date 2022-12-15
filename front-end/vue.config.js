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
    port: 8084,
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8086',
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
