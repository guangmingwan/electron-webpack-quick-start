'use strict'

process.env.BABEL_ENV = 'main'
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
var babelOptions = {
  
};
let mainConfig = {
  entry: {
    main: path.join(__dirname, '/src/main/index.ts')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        // include: [
        //   path.resolve('app/node_modules/iview/src')
        // ],
        // exclude:[ /node_modules\/(vue-video-player\/).*/,
        //   /node_modules\/(coffee-script\/).*/,
        // ]
        // exclude:[ 
        //   /app\/dist\/.*/,
        //   ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      { test: /\.coffee$/, 
        loader: "guangmingwan-coffee-loader" 
      },
      { test: /\.(coffee\.md|litcoffee)$/, 
        loader: "guangmingwan-coffee-loader?literate" 
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",
      // jquery: "jquery",
      // "window.jQuery": "jquery"
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    },
    extensions: ['.coffee','.ts', '.js', '.json', '.node'],
    modules: [
      path.join(__dirname, 'app/node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  },
  target: 'electron-main'
  ,
  devtool: '#source-map'
}
/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  );
}
module.exports = mainConfig
