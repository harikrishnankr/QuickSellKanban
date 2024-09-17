const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // Resolve file extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/, // Handle JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Handle image files
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/, // Handle font files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean output directory before each build
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template HTML file
      filename: 'index.html',
      favicon: './public/favicon.ico', // Optional: Favicon
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000, // You can change the dev server port if needed
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // For React Router
  },
  mode: 'development', // Set to 'production' for production builds
};
