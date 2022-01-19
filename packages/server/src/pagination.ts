import { ArgsType, ClassType, Field, Int, ObjectType } from 'type-graphql'

export type AxfoodRestPagination = {
  pagination: {
    numberOfPages: number
    totalNumberOfResults: number
  }
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  size!: number

  @Field(() => Int)
  page!: number
}

@ObjectType()
class PaginationDetails {
  @Field()
  totalCount!: number

  @Field()
  hasMore!: boolean
}

export const PaginatedResponse = <T>(Type: ClassType<T>) => {
  @ObjectType(`Paginated${Type.name}Response`)
  abstract class PaginatedResponse {
    @Field(() => [Type])
    items!: T[]

    @Field(() => PaginationDetails)
    pagination!: PaginationDetails
  }

  return PaginatedResponse
}
