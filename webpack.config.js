/* global __dirname process */

var path = require("path"); var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var env = process.env.NODE_ENV;

var config = {
  // create sourcemaps for the bundle
  devtool: "source-map",

  // where does the import chain start
  entry: "./app/main.js",

  // where do the bundle files get written to
  output: {
    path: path.resolve(__dirname, "static", "dist"),
    filename: "bundle.js",
    publicPath: "/static"

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

if (env === "dev") {
  new WebpackDevServer(webpack(config), {
    contentBase: "./",
    hot: true,
    debug: true,
    inline: true
  }).listen(8000, "localhost", function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("-------------------------");
  console.log("Local web server runs at http://localhost:8000");
  console.log("-------------------------");
}

module.exports = config;
