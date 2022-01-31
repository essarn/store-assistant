import { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import mercurius from 'mercurius'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { CampaignResolver } from './assortment/campaigns'
import { CategoryResolver } from './assortment/categories'
import { ProductResolver } from './assortment/products'
import { StoreResolver } from './stores'

export const { ErrorWithProps } = mercurius

export type RequestContext = {
  store: string
}

export const bootstrap = async (app: FastifyInstance) => {
  await app.register(cors)

  const schema = await buildSchema({
    resolvers: [
      StoreResolver,
      CategoryResolver,
      CampaignResolver,
      ProductResolver,
    ],
    dateScalarMode: 'timestamp',
  })
  await app.register(mercurius, {
    schema,
    graphiql: true,
    context({ headers }, _reply): RequestContext {
      const store = headers.store as string | undefined

      return { store: store ?? '2110' }
    },
  })

  app.get('/ping', async (_request, _reply) => ({ message: 'pong' }))
}
