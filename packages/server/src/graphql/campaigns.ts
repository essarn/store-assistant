import { SearchCampaigns } from '@/types'
import { makeUrl, parseDate } from '@/utils'
import fetch from 'node-fetch'
import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class Campaign {
  @Field(() => ID)
  code!: string

  @Field()
  type!: string

  @Field()
  start!: Date

  @Field()
  end!: Date

  @Field()
  name!: string

  @Field()
  image!: string

  @Field({ nullable: true })
  description?: string

  @Field()
  manufacturer!: string

  @Field()
  volume!: string

  @Field()
  price!: string

  @Field({ nullable: true })
  comparePrice?: string

  @Field({ nullable: true })
  savePrice?: string
}

@Resolver(Campaign)
export class CampaginResolver {
  @Query(() => [Campaign])
  async campaigns(): Promise<Campaign[]> {
    const url = makeUrl('search/campaigns/offline', { q: '2189', size: '1000' })
    const response = await fetch(url)
    const json = await response.json()

    const data = json as SearchCampaigns
    const campaigns = data.results.map<Campaign>((campaign) => {
      const promotion = campaign.potentialPromotions[0]

      return {
        code: promotion.code,
        type: campaign.title,
        start: parseDate(promotion.startDate),
        end: parseDate(promotion.endDate),
        name: campaign.name,
        image: campaign.image.url,
        description: promotion.description,
        manufacturer: campaign.manufacturer,
        volume: campaign.displayVolume,
        price: promotion.cartLabel,
        comparePrice: promotion.comparePrice,
        savePrice: promotion.savePrice,
      }
    })

    return campaigns
  }
}
