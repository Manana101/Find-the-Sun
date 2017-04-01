//Konfiguracja Webpack
module.exports = {
  entry: ['whatwg-fetch', './js/app.jsx'],
  output: { filename: "./js/out.js" },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/, exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'stage-2', 'react'] }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
}
