import { Store } from '@/graphql/generated'
import { acceptHMRUpdate, defineStore } from 'pinia'

const storeKey = 'store_id'

export type UserState = {
  store?: Store
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    const savedStore = localStorage.getItem(storeKey)
    const store = savedStore ? (JSON.parse(savedStore) as Store) : undefined

    return {
      store,
    }
  },
  actions: {
    saveStore() {
      localStorage.setItem(storeKey, JSON.stringify(this.store))
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
