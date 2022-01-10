import {
  Campaign,
  CampaignProductsDocument,
  CampaignsDocument,
  Product,
} from '@/graphql/generated'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { createClient } from 'villus'

const villus = createClient({ url: 'http://localhost:8080/graphql' })

export type AssortmentState = {
  campaigns: Campaign[]
  products: (Product & { campaign: string })[]
}

export const useAssortmentStore = defineStore('campaigns', {
  state: (): AssortmentState => ({ campaigns: [], products: [] }),
  getters: {
    campaign: (state) => (code: string) =>
      state.campaigns.find((campaign) => campaign.code === code),
    campaignProducts: (state) => (code: string) =>
      state.products.filter((product) => product.campaign === code),
  },
  actions: {
    async fetchCampaigns() {
      if (this.campaigns.length == 0) {
        const { data } = await villus.executeQuery({
          query: CampaignsDocument,
        })
        if (data) {
          this.campaigns = data.campaigns
        }
      }
    },
    async fetchCampaignProducts(code: string) {
      if (!this.products.some((product) => product.campaign === code)) {
        const { data } = await villus.executeQuery({
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
