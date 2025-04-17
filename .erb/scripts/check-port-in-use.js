/**
 * The check-port-in-use.js script checks if the specified port
 * (default 1212) is already in use on localhost.
 * If the port is unavailable, it throws an error prompting the
 * user to use a different port.
 */

import chalk from 'chalk';
import detectPort from 'detect-port';

const port = process.env.PORT || '1212';

detectPort(port, (_err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`,
      ),
    );
  } else {
    process.exit(0);
  }
});
