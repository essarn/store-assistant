import { fetchCampaigns } from '@/controllers/remote'
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
  manufacturer?: string

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
    return fetchCampaigns()
  }
}
