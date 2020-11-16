const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({ API_DOMAIN: JSON.stringify('https://localhost:5001') })
  ]
});
