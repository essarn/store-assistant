<template>
  <main class="space-y-2 bg-nord6 p-2">
    <header class="flex flex-col space-y-2 card">
      <Breadcrumbs :items="[{ name: 'Erbjudanden' }]" />
      <select v-model="filter" class="border-none rounded px-2">
        <option disabled="true" :value="undefined" selected>Kategori</option>
        <option
          v-for="category in categories"
          :key="category.code"
          :value="category.code"
        >
          {{ category.name }}
        </option>
      </select>
    </header>
    <section class="card">
      <router-link
        v-for="campaign in campaigns"
        :key="campaign.code"
        :to="`/campaigns/${campaign.code}`"
      >
        <article class="flex space-y-2 items-center justify-between">
          <div class="w-4/5">
            <h2 class="truncate">{{ campaign.name }}</h2>
            <p class="truncate">
              {{ campaign.manufacturer }} {{ campaign.volume }}
            </p>
          </div>
          <img :src="campaign.image" class="w-1/5" />
        </article>
      </router-link>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { useAssortmentStore } from '@/stores/assortment'
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  const assortment = useAssortmentStore()
  const { categories, campaigns: unfilteredCampaigns } = storeToRefs(assortment)
  await assortment.fetchCategoriesAndCampaigns()

  const filter = ref<string | undefined>()
  const campaigns = computed(() =>
    filter.value
      ? unfilteredCampaigns.value.filter(
          (campaign) => campaign.category === filter.value
        )
      : unfilteredCampaigns.value
  )
</script>
