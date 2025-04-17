/**
 * The check-node-env.js script ensures that the NODE_ENV environment
 * variable matches the expected value. If it does not, it logs an
 * error message and exits the process to prevent misconfiguration
 * during the build or runtime.
 */

import chalk from 'chalk';

export default function checkNodeEnv(expectedEnv) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalk.whiteBright.bgRed.bold(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`,
      ),
    );
    process.exit(2);
  }
}
