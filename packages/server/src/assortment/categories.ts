import { makeUrl } from '@/utils'
import fetch from 'node-fetch'
import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

type RestCategory = {
  id: string
  title: string
  children: RestCategory[]
}

@ObjectType()
class Category {
  @Field(() => ID, { nullable: true })
  parent?: string

  @Field(() => ID)
  code!: string

  @Field()
  name!: string
}

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const response = await fetch(makeUrl('leftMenu/categorytree'))
    const json = await response.json()

    const data = json as RestCategory
    const categories = <Category[]>[]

    const traverse = (children: RestCategory[], parent?: RestCategory) => {
      for (const category of children) {
        categories.push({
          parent: parent?.id,
          code: category.id,
          name: category.title,
        })
        traverse(category.children, category)
      }
    }
    traverse(data.children)

    return categories
  }
}
