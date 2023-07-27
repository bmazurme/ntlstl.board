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
  name: 'server',
  target: 'node',
  entry: './src/server/index.ts',
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules'],
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
    ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default [clientConfig, serverConfig];
