const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
