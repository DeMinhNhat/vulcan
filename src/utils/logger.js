/* eslint-disable no-console */
const chalk = require('chalk')

const logger = {
  error: err => console.error(chalk.red(err)),
  info: msg => console.info(chalk.green(msg)),
  warning: msg => console.warn(chalk.yellow(msg)),
  appStarted: (port, host) => {
    console.log(`Server started on http://${host}:${port} ${chalk.green('✓')}`)
    console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`)
  },
}

module.exports = logger
