import app from './app'
import { getEnv } from './utils/index'

const PORT = Number(getEnv('PORT')) || 8080
const ENV = getEnv('ENV') || 'dev'

app.listen(
  { port: PORT, host: ENV === 'dev' ? '127.0.0.1' : '0.0.0.0' },
  async (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
)
