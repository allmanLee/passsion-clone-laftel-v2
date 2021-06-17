"use strict";
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};