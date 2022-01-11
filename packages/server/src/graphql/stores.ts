import { RestStores } from '@/types/remote'
import { makeUrl } from '@/utils'
import fetch from 'node-fetch'
import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class Store {
  @Field(() => ID)
  id!: string

  @Field()
  name!: string

  @Field()
  online!: boolean
}

@Resolver(Store)
export class StoreResolver {
  @Query(() => [Store])
  async stores(): Promise<Store[]> {
    const url = makeUrl('axfood/rest/store')
    const response = await fetch(url)
    const json = await response.json()

    const data = json as [RestStores]
    data.shift() // Remove empty store
    const stores = data.map((store) => ({
      id: store.storeId,
      name: store.name,
      online: store.onlineStore,
    }))

    return stores
  }
}
