const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/renderer/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{from: "./src/electron/index.js", to: "./index.js"},
                           {from: "./package.json", to: "./package.json"},
                           {from: "./assets/bell_ring.mp3", to: "./bell_ring.mp3"}]),
    new HtmlWebpackPlugin({
      title: 'Pomodo',
      filename: 'index.html',
      template: 'assets/index.html',
    })
  ],
}
