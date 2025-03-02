const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;
