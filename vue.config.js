const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:8989',//
            // target:process.env.VUE_APP_BASE_URL,//
            ws: true,
            changeOrigin: true,
            pathRewrite:{//重写路径
                '^/api':''
            }
        },
    },
}
})
