<template>
  <div class="divide-y flex flex-col py-2 px-4">
    <router-link
      v-for="campaign in campaigns"
      :key="campaign.code"
      :to="`/campaigns/${campaign.code}`"
    >
      <article class="flex py-2 items-center justify-between">
        <div class="w-4/5">
          <h2 class="truncate">{{ campaign.name }}</h2>
          <p class="truncate">
            {{ campaign.manufacturer }} {{ campaign.volume }}
          </p>
        </div>
        <img :src="campaign.image" class="w-1/5" />
      </article>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { useAssortmentStore } from '@/stores/assortment'
  import { storeToRefs } from 'pinia'

  const assortment = useAssortmentStore()
  const { campaigns } = storeToRefs(assortment)

  await assortment.fetchCampaigns()
</script>
