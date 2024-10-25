import moment from 'moment'
import chalk from 'chalk'
import { Writable } from 'stream'

class Logger extends Writable {
  constructor() {
    super({ objectMode: true })
  }

  _write(
    buffer: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    const log = JSON.parse(buffer.toString())
    const timestamp = `[${moment(log.time).format('YYYY-MM-DD kk:mm:ss')}]`

    if (!log.reqId) {
      console.log(chalk.blue(`${timestamp} ${log.msg}`))
    } else {
      if (log.req) {
        console.log(chalk.gray(`${timestamp} ${log.msg}`))
        console.log(
          chalk.white(`${timestamp} ${log.req.method} ${log.req.url}`)
        )
      } else if (log.res) {
        if (log.res.statusCode >= 200 && log.res.statusCode <= 299) {
          console.log(
            chalk.green(
              `${timestamp} Status: ${log.res.statusCode} Time: ${
                log.responseTime ? log.responseTime.toFixed(2) : 0
              }ms`
            )
          )
        } else {
          console.log(
            chalk.red(
              `${timestamp} Status: ${log.res.statusCode} Time: ${
                log.responseTime ? log.responseTime.toFixed(2) : 0
              }ms`
            )
          )
        }
        console.log(chalk.gray(`${timestamp} ${log.msg}`))
      } else {
        console.log(chalk.gray(`${timestamp} ${log.msg}`))
      }
    }
    callback()
  }
}

export default Logger
