import { resolve } from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { readFileSync } from 'fs';

const config: Configuration = {
  entry: {
    'opal-loader': resolve(__dirname, 'src/opal-loader.ts'),
    runtime: resolve(__dirname, 'src/runtime.rb'),
  },
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.rb$/,
        loader: {
          loader: resolve(__dirname, 'src/opal-loader.ts'),
          options: {
            paths: [],
          },
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    library: 'OpalLoader',
    libraryTarget: 'umd',
  },
  plugins: [
    new DefinePlugin({
      BUILDER: JSON.stringify(
        readFileSync(resolve(__dirname, 'src/build.rb')).toString(),
      ),
    }),
  ],
  target: 'node',
};
export default config;
