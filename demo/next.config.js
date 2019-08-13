const path = require("path");
const webpack = require("webpack");

console.log("NODE_ENV", process.env.NODE_ENV);

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config

    config.resolve.alias["storefront-ui"] = path.resolve(__dirname, "../dist/");

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            },
            titleProp: true
          }
        }
      ]
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: true,
        __BROWSER__: !isServer
      })
    );

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  target: "server"
};
