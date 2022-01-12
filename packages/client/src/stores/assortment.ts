import {
  AssortmentDocument,
  Campaign,
  CampaignProductsDocument,
  Category,
  Product,
} from '@/graphql/generated'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type AssortmentState = {
  categories: Omit<Category, 'campaigns'>[]
  campaigns: (Campaign & { category: string })[]
  products: (Product & { campaign: string })[]
}

export const useAssortmentStore = defineStore('campaigns', {
  state: (): AssortmentState => ({
    categories: [],
    campaigns: [],
    products: [],
  }),
  getters: {
    campaign: (state) => (code: string) =>
      state.campaigns.find((campaign) => campaign.code === code),
    campaignProducts: (state) => (code: string) =>
      state.products.filter((product) => product.campaign === code),
  },
  actions: {
    async fetchCategoriesAndCampaigns() {
      if (this.categories.length === 0 && this.campaigns.length === 0) {
        const { data } = await this.$villus.executeQuery({
          query: AssortmentDocument,
        })

        if (data) {
          this.categories = data.categories.map((category) => ({
            code: category.code,
            name: category.name,
          }))
          this.campaigns = data.categories.reduce(
            (previous, current) => [
              ...previous,
              ...current.campaigns.map((campaign) => ({
                ...campaign,
                category: current.code,
              })),
            ],
            <(Campaign & { category: string })[]>[]
          )
        }
      }
    },
    async fetchCampaignProducts(code: string) {
      if (!this.products.some((product) => product.campaign === code)) {
        const { data } = await this.$villus.executeQuery({
          query: CampaignProductsDocument,
          variables: { code },
        })
        if (data) {
          this.products = [
            ...this.products,
            ...data.campaignProducts.map((product) => ({
              ...product,
              campaign: code,
            })),
          ]
        }
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssortmentStore, import.meta.hot))
}
