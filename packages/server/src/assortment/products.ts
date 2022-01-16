import { ErrorWithProps, RequestContext } from '@/app'
import { makeUrl, mockSession } from '@/utils'
import fetch from 'node-fetch'
import {
  Arg,
  Ctx,
  Field,
  ID,
  InterfaceType,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'

export type BaseAxfoodRestProduct = {
  code: string
  name: string
  image: {
    url: string
  }
  manufacturer?: string
  displayVolume?: string
  labels: string[]
}

type AxfoodRestProduct = BaseAxfoodRestProduct & {
  ean: string
  description: string
  ingredients: string
  priceValue: number
  productBasketType: {
    code: string
  }
  comparePrice: string
  comparePriceUnit: string
}

type RestSearchProducts = {
  results?: BaseAxfoodRestProduct[]
}

@InterfaceType()
class BaseProduct {
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

@ObjectType()
export class Price {
  @Field()
  amount!: number

  @Field()
  unit!: string
}

@ObjectType({ implements: BaseProduct })
class Product extends BaseProduct {
  @Field()
  ean!: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  ingredients?: string

  @Field(() => [String])
  labels!: string[]

  @Field(() => Price)
  price!: Price

  @Field(() => Price)
  comparePrice!: Price
}

@ObjectType({ implements: BaseProduct })
export class PreviewProduct extends BaseProduct {}

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  async product(
    @Arg('code') code: string,
    @Ctx() { store }: RequestContext
  ): Promise<Product> {
    const headers = await mockSession(store)
    const url = makeUrl(`axfood/rest/p/${code}`)
    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new ErrorWithProps('Cannot find product', { store, code })
    }

    const json = await response.json()
    const data = json as AxfoodRestProduct

    return {
      code: data.code,
      name: data.name,
      image: data.image.url,
      manufacturer: data.manufacturer,
      volume: data.displayVolume,
      ean: data.ean,
      description: data.description.length !== 0 ? data.description : undefined,
      ingredients: data.ingredients.length !== 0 ? data.ingredients : undefined,
      labels: data.labels,
      price: {
        amount: data.priceValue,
        unit: data.productBasketType.code.toLocaleLowerCase(),
      },
      comparePrice: {
        amount: parseFloat(
          data.comparePrice.replace(',', '.').replace(' kr', '')
        ),
        unit: data.comparePriceUnit,
      },
    }
  }

  @Query(() => [PreviewProduct])
  async products(
    @Arg('query') query: string,
    @Ctx() { store }: RequestContext
  ): Promise<PreviewProduct[]> {
    const headers = await mockSession(store)
    const url = makeUrl('search', { q: query, size: '100' })

    const response = await fetch(url, { headers })
    const json = await response.json()

    const data = json as RestSearchProducts
    const products = data.results?.map(
      (product) =>
        <PreviewProduct>{
          code: product.code,
          name: product.name,
          image: product.image.url,
          manufacturer: product.manufacturer,
          volume: product.displayVolume,
        }
    )

    return products ?? []
  }
}
