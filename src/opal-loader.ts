/* eslint no-invalid-this: off */

import { spawn } from 'child_process';
import { getOptions } from 'loader-utils';
import { platform } from 'os';
import { basename } from 'path';
import { loader as WebpackLoader, loader } from 'webpack';

declare const BUILDER: string | undefined;
const Builder = typeof BUILDER === 'undefined' ? null : BUILDER;

export interface LoaderOptions {
  paths?: string[];
}

/**
 * Opal loader
 * @param {webpack.loaderLoaderContext} this - Loader context
 * @param {string} content - Content
 */
export default function loader(
  this: WebpackLoader.LoaderContext,
  content: string,
): void {
  const callback = this.async() as loader.loaderCallback;
  if (!callback) throw new Error('Callback is undefined');

  const options = getOptions(this) as LoaderOptions;

  const chunks: Buffer[] = [];

  const command = platform().match(/win/) ? 'ruby.exe' : 'ruby';
  const args = [
    '-Eutf-8',
    ...(Builder ? ['-e', Builder] : ['src/build.rb']),
    basename(this.resourcePath),
    ...(options.paths || []),
  ];

  // console.log(command, args.join(' '));
  const opal = spawn(command, args);

  opal.stderr.pipe(process.stderr);
  opal.stdout.on('data', chunk => chunks.push(chunk));

  opal.on('error', e => console.error(e.stack || e));

  opal.on('close', code => {
    if (code) {
      callback(new Error(`Opal errored with code ${code}`));
    } else {
      const source = Buffer.concat(chunks);
      callback(null, source);
    }
  });

  opal.stdin.write(content);
  opal.stdin.end();
}
