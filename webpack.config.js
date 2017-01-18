"use strict";

const path = require("path");

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, "/public/index.js"),
  output: {
    path: path.join(__dirname),
    publicPath: "public/",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
        // { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel'},
        { test: /\.css$/, exclude: /static/, loader: 'style!css'}
    ]
  }
};