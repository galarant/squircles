/* global __dirname */

var path = require("path");
var webpack = require("webpack");

module.exports = {
  // create sourcemaps for the bundle
  devtool: "source-map",

  // where does the import chain start
  entry: "./test/app/main.js",

  // where do the bundle files get written to
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  // custom translations and stuff
  module: {
    loaders: [
      // transpile es6 to es5 during build
      {
        loader: "babel-loader",
        test: path.join(__dirname, "app"),
        query: {
          presets: "es2015"
        }
      }
    ]
  },

  // other plugins
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],

  // output formatting
  stats: {
    colors: true
  }

};