import { CampaignProducts } from '@/types/remote'
import { makeUrl } from '@/utils'
import fetch from 'node-fetch'
import { Arg, Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  code!: string

  @Field()
  name!: string

  @Field()
  image!: string

  @Field()
  manufacturer!: string

  @Field()
  volume!: string
}

@Resolver(Product)
export class ProductResolver {
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
