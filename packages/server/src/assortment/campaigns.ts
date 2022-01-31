import { ErrorWithProps, RequestContext } from '@/app'
import {
  AxfoodRestPagination,
  PaginatedResponse,
  PaginationArgs,
} from '@/pagination'
import { makeUrl, parseDate } from '@/utils'
import fetch from 'node-fetch'
import {
  Arg,
  Args,
  Ctx,
  Field,
  ID,
  InterfaceType,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import { BaseAxfoodRestProduct, PreviewProduct, Price } from './products'

type AxfoodRestCampaign = {
  title: string
  potentialPromotions: { code: string; name: string; description?: string }[]
  image: {
    url: string
  }
  manufacturer: string
  displayVolume: string
  solrSearchScore: number
}

type AxfoodRestStoreCampaign = AxfoodRestCampaign & {
  priceUnit: string
  potentialPromotions: {
    endDate: string
    rewardLabel: string
    comparePrice: string
    savePrice?: string
  }[]
  productBasketType: {
    code: string
  }
}

type SearchCampaignsOffline = AxfoodRestPagination & {
  results?: AxfoodRestCampaign[]
}

type AxfoodRestPromotionProducts = {
  items: BaseAxfoodRestProduct[]
}

@InterfaceType()
abstract class BaseCampaign {
  @Field(() => ID)
  code!: string

  @Field({ nullable: true })
  type?: string

  @Field()
  name!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  image!: string

  @Field({ nullable: true })
  manufacturer?: string

  @Field({ nullable: true })
  volume?: string
}

@ObjectType({ implements: BaseCampaign })
class Campaign extends BaseCampaign {
  @Field()
  until!: Date

  @Field(() => Price)
  price!: Price

  @Field(() => Price)
  comparePrice!: Price

  @Field({ nullable: true })
  savePrice?: string

  @Field(() => [PreviewProduct])
  products!: PreviewProduct[]
}

@ObjectType({ implements: BaseCampaign })
class PreviewCampaign extends BaseCampaign {}

const CampaignsResponse = PaginatedResponse(PreviewCampaign)

@Resolver()
export class CampaignResolver {
  @Query(() => Campaign)
  async campaign(
    @Ctx() { store }: RequestContext,
    @Arg('code') code: string
  ): Promise<Campaign> {
    const fetchProducts = async (): Promise<PreviewProduct[]> => {
      const url = makeUrl(`axfood/rest/promotions/${code}/products`)
      const response = await fetch(url)

      const json = await response.json()
      const data = json as AxfoodRestPromotionProducts

      return data.items.map((product) => ({
        code: product.code,
        name: product.name,
        image: product.image.url,
        manufacturer: product.manufacturer,
        volume: product.displayVolume,
      }))
    }

    const url = makeUrl(`axfood/rest/c/${store}/${code}`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new ErrorWithProps('Cannot find campaign', { code })
    }

    const products = await fetchProducts()
    const json = await response.json()
    const data = json as AxfoodRestStoreCampaign

    const promotion = data.potentialPromotions[0]
    const compareParts = promotion.comparePrice.split('/')

    return {
      code: promotion.code,
      type: data.title,
      name: promotion.name,
      description: promotion.description,
      image: data.image.url,
      manufacturer: data.manufacturer,
      volume: data.displayVolume,
      until: parseDate(promotion.endDate),
      price: {
        amount: parseFloat(
          promotion.rewardLabel.split('/')[0].replace(',', '.')
        ),
        unit: data.priceUnit.split('/')[1],
      },
      comparePrice: {
        amount: parseFloat(
          compareParts[0].replace(':', '.').replace(' kr', '')
        ),
        unit: compareParts[1],
      },
      savePrice: promotion.savePrice,
      products,
    }
  }

  @Query(() => CampaignsResponse)
  async campaigns(
    @Args() { size, page }: PaginationArgs,
    @Ctx() { store }: RequestContext,
    @Arg('category', { nullable: true }) category?: string
  ): Promise<InstanceType<typeof CampaignsResponse>> {
    const url = makeUrl(`search/campaigns/offline`, {
      q: `${store}${category ? `:categoryLevel1:${category}` : ''}`,
      size: size.toString(),
      page: page.toString(),
    })
    const response = await fetch(url)
    const json = await response.json()

    const data = json as SearchCampaignsOffline
    const campaigns = data.results?.map((campaign) => {
      const promotion = campaign.potentialPromotions[0]

      return {
        code: promotion.code,
        type: campaign.title,
        name: promotion.name,
        description: promotion.description,
        image: campaign.image.url,
        manufacturer: campaign.manufacturer,
        volume: campaign.displayVolume,
      }
    })

    return {
      items: campaigns ?? [],
      pagination: {
        totalCount: data.pagination.totalNumberOfResults,
        hasMore: page < data.pagination.numberOfPages - 1,
      },
    }
  }
}
