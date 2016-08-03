var webpack = require("webpack");

module.exports = {
  entry: ["lodash", "./src/main.ts"],
  output: {
    filename: "./init.js"
  },
  target: "node",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env':{'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: false}),
  ],

  module: {
    loaders: [
      {
	test: /\.tsx?$/,
	loaders: [
	  "babel-loader?presets[]=es2015",
	  "ts-loader?configFileName=tsconfig.webpack.json",
	],
      },
      {
	test: /\.json/,
	loader: "json",
      },
    ],
  },
};
