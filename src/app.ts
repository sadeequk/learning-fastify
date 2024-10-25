import { version, memoryUsage, uptime, platform, arch } from 'process'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import Logger from './configs/logger'
import routes from './routes/index'
const app = Fastify({
  logger: {
    level: 'info',
    stream: new Logger()
  },
  bodyLimit: 5242880
})
app.register(cors, {
  origin: true,
  exposedHeaders: ['X-Thread-Id']
})
for (const route of routes) {
  app.register(route.plugin, { prefix: '/api' + route.prefix })
}
// const routes = [
//   { plugin: usersPlugin, prefix: '/users' },
//   { plugin: productsPlugin, prefix: '/products' }
// ]

app.get('/', async (req, res) => {
  return res.status(200).send({
    status: true,
    message: 'Server Online',
    data: null
  })
})

app.get('/debug', async (req, res) => {
  return res.status(200).send({
    status: true,
    message: 'Success',
    data: {
      timestamp: new Date().toISOString(),
      memory:
        Number(memoryUsage().heapUsed / 1024 / 1024)
          .toFixed(2)
          .toString() + ' MB',
      uptime:
        Number(uptime() / 60)
          .toFixed(2)
          .toString() + ' Mins',
      platform: platform,
      arch: arch,
      node: version
    }
  })
})

export default app
