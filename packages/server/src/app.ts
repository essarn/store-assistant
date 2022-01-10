import { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import mercurius from 'mercurius'
import { buildSchema } from 'type-graphql'
import { CampaginResolver } from './graphql/campaigns'
import { CategoryResolver } from './graphql/categories'
import { ProductResolver } from './graphql/products'

export const bootstrap = async (app: FastifyInstance) => {
  await app.register(cors)

  const schema = await buildSchema({
    resolvers: [CategoryResolver, ProductResolver, CampaginResolver],
    dateScalarMode: 'timestamp',
  })
  await app.register(mercurius, {
    schema,
    graphiql: true,
  })

  app.get('/ping', async (_request, _reply) => ({ message: 'pong' }))
}
