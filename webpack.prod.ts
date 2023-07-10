/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import type { Configuration } from 'webpack';

const clientConfig: Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|ico|json)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '.',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '.' },
        { from: 'public/logo192.png', to: '.' },
        { from: 'public/logo512.png', to: '.' },
        { from: 'public/favicon.ico', to: '.' },
      ],
    }),
  ],
};

const serverConfig: Configuration = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/server.ts',
  mode: 'production',
  output: {
    filename: 'server.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

export default [clientConfig, serverConfig];
