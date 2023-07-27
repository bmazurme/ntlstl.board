import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import { SourceMapDevToolPlugin } from 'webpack';
import common from './webpack.common';

const configuration = merge<DevServerConfiguration & Configuration>(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts$|tsx/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              auto: true,
              exportGlobals: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        }],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|ico|json)$/,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '',
    }),
    new MiniCssExtractPlugin(),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/public'),
    },
    watchFiles: ['src/**/*.tsx'],
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
});

export default configuration;
