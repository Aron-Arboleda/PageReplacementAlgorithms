/**
 * The clean.js script removes specified build-related
 * directories (dist, build, dll) to clean up the project.
 * It ensures a fresh start for builds by deleting old or unnecessary files.
 */

import { rimrafSync } from 'rimraf';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
];

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) rimrafSync(folder);
});
