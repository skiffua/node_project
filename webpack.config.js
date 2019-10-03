const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src/client');


// const VENDOR_LIBS = [
//   'react'
// ]

const config = {
     entry: APP_DIR,
    entry: {
      bundle: APP_DIR,
      // vendor: VENDOR_LIBS
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: APP_DIR,
                exclude: /node_modules/,
                use: [ 'babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              },
              {
                test: /\.(png|woff|woff2|eot|ttf|svg|img|jpg|jpeg|gif)$/,
                use: 'file-loader'
              },
        ]
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      compress: true,
      disableHostCheck: true,
      open: true,
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          automaticNameMaxLength: 30,
          name: true,
          cacheGroups: {
            // vendors: {
            //   test: /[\\/]node_modules[\\/]/,
            //   priority: -10
            // },
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }

          }
        }
      }  
};

module.exports = config;

