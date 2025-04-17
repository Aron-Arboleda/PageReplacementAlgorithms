/* eslint import/prefer-default-export: off */

/**
 * The util.ts file provides utility functions for the Electron app,
 * such as resolveHtmlPath, which resolves the correct URL or file
 * path for loading HTML files based on the environment (development
 * or production).
 */

import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
