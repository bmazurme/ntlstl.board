import path from 'path';
import type { Configuration } from 'webpack';

const common: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.css'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default common;
