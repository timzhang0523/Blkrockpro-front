// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})

module.exports = {
    devServer: {
        proxy: {
            '/': {
                // target: 'http://api.sohonft.xyz',
                target: 'http://admm.blkrockpro.xyz/',
                changeOrigin: true,

            }
        }
    }
   
}
