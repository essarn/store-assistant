import { fetchCampaigns, fetchCategories } from '@/utils'
import {
  Field,
  FieldResolver,
  ID,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Campaign } from './campaigns'

@ObjectType()
export class Category {
  @Field(() => ID)
  code!: string

  @Field()
  name!: string
}

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return fetchCategories()
  }

  @FieldResolver(() => [Campaign])
  async campaigns(@Root() category: Category): Promise<Campaign[]> {
    return fetchCampaigns(category.code)
  }
}
