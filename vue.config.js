module.exports = {
  lintOnSave: false,
  devServer: {
    // 这里填IP地址
    host: "192.168.1.55",
    port: 8080,
    open: true, //浏览器自动打开页面
    proxy: {
      //第一个代理，这里的/api1和/api2就对应了第一步的 baseURL
      "/jiekou_api": {
        // target: "http://192.168.1.157:35001",//只要是以/api2开头的链接都会被代理到 这个target属性所代表的位置（我这里是：https://www.666.com）
        target: "http://192.168.2.31:35001",//只要是以/api2开头的链接都会被代理到 这个target属性所代表的位置（我这里是：https://www.666.com）
        ws: false,
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": ""
        },
        cookiePathRewrite: {
          "*": ""
        },
        pathRewrite: {
          "^/jiekou_api": ""  //这里是将/api2替换为空字符串“” ，也就是删除的意思
        }
      },

    }
  }

}
