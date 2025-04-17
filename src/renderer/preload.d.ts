/**
 * The preload.d.ts file provides TypeScript type definitions
 * for the electron object exposed to the renderer process via
 * the preload script. It ensures type safety when accessing
 * the electron API in the renderer process.
 */

import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
  }
}

export {};
