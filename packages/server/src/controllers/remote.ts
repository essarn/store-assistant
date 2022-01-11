import { Campaign } from '@/graphql/campaigns'
import { Category } from '@/graphql/categories'
import { LeftMenuCategorytree, SearchCampaigns } from '@/types/remote'
import { makeUrl, parseDate } from '@/utils'
import fetch from 'node-fetch'

export const fetchCategories = async (): Promise<Category[]> => {
  const url = makeUrl('leftMenu/categorytree')
  const response = await fetch(url)
  const json = await response.json()

  const data = json as LeftMenuCategorytree
  const categories = data.children.map((category) => ({
    code: category.id,
    name: category.title,
  }))

  return categories
}

export const fetchCampaigns = async (
  category?: string
): Promise<Campaign[]> => {
  const url = makeUrl('search/campaigns/offline', {
    q: `2189${category != null ? ':categoryLevel1:' + category : ''}`,
    size: '1000',
  })
  const response = await fetch(url)
  const json = await response.json()

  const data = json as SearchCampaigns
  const campaigns = data.results?.map<Campaign>((campaign) => {
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

  return campaigns ?? []
}
