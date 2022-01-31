import { makeUrl } from '@/utils'
import fetch from 'node-fetch'
import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

type RestStore = {
  storeId: string
  name: string
  onlineStore: boolean
}

@ObjectType()
class Store {
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
    const response = await fetch(makeUrl('axfood/rest/store'))
    const json = await response.json()

    const data = json as RestStore[]
    data.shift() // Remove empty store

    return data.map((store) => ({
      id: store.storeId,
      name: store.name,
      online: store.onlineStore,
    }))
  }
}
