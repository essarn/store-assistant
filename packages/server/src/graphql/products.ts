import { CampaignProducts, SearchProducts } from '@/types/remote'
import { makeUrl, mockSession } from '@/utils'
import fetch from 'node-fetch'
import {
  Arg,
  Args,
  ArgsType,
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  code!: string

  @Field()
  name!: string

  @Field()
  image!: string

  @Field({ nullable: true })
  manufacturer?: string

  @Field({ nullable: true })
  volume?: string
}

@ArgsType()
class ProductsArgs {
  @Field()
  storeId!: string

  @Field()
  search!: string
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async products(
    @Args() { storeId, search }: ProductsArgs
  ): Promise<Product[]> {
    const headers = await mockSession(storeId)
    const url = makeUrl('search', { q: search, size: '50' })
    const response = await fetch(url, {
      headers,
    })
    const json = await response.json()

    const data = json as SearchProducts
    const products = data.results?.map((product) => ({
      code: product.code,
      name: product.name,
      image: product.image.url,
      manufacturer: product.manufacturer,
      volume: product.displayVolume,
    }))

    return products ?? []
  }

  @Query(() => [Product])
  async campaignProducts(@Arg('code') code: string): Promise<Product[]> {
    const url = makeUrl(`axfood/rest/promotions/${code}/products`)
    const response = await fetch(url)
    const json = await response.json()

    const data = json as CampaignProducts
    const products = data.items.map<Product>((product) => ({
      code: product.code,
      name: product.name,
      image: product.image.url,
      manufacturer: product.manufacturer,
      volume: product.displayVolume,
    }))

    return products
  }
}
