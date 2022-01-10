import { bootstrap } from '@/app'
import fastify from 'fastify'

const port = process.env.PORT || 8080
const app = fastify({ logger: !!(process.env.NODE_ENV !== 'development') })

bootstrap(app)
  .then(async () => {
    const address = await app.listen(port)
    console.log(`Server listening at ${address}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
