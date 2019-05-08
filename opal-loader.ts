/* eslint no-invalid-this: off */

import { spawn } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import { loader as WebpackLoader } from 'webpack';

/**
 * Opal loader
 * @param {webpack.loaderLoaderContext} this - Loader context
 * @param {string} content - Content
 */
export default function loader(
  this: WebpackLoader.LoaderContext,
  content: string,
): void {
  const callback = this.async();
  if (!callback) throw new Error('Callback is undefined');

  const chunks: Buffer[] = [];

  const command = os.platform().match(/win/) ? 'ruby.exe' : 'ruby';
  const args = [
    '-Eutf-8',
    path.resolve(__dirname, 'build.rb'),
    path.basename(this.resourcePath),
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
