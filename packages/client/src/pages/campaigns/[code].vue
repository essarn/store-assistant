<template>
  <header class="rounded m-2 shadow p-4">
    <Breadcrumbs
      :items="[
        { path: '/campaigns', name: 'Erbjudanden' },
        { name: campaign?.name ?? 'N/A' },
      ]"
    />
    <pre>Actions... (check EAN etc.)</pre>
  </header>
  <div v-if="campaign" class="space-y-2 m-2">
    <section class="rounded shadow p-4">
      <p>{{ campaign.type }}</p>
      <p>
        Gäller från {{ parseDate(campaign.start) }} till
        {{ parseDate(campaign.end) }}
      </p>
    </section>
    <section class="rounded shadow p-4">
      <p>{{ campaign.price }} ({{ campaign.comparePrice }})</p>
      <p>{{ campaign.savePrice }}</p>
    </section>

    <section class="rounded shadow p-4">
      <p>{{ campaign.manufacturer }} {{ campaign.volume }}</p>
      <p v-if="campaign.description">{{ campaign.description }}</p>

      <div class="divide-y flex flex-col">
        <article
          v-for="product in products"
          :key="product.code"
          class="flex space-x-2 py-2 items-center justify-between"
        >
          <div>
            <h2 class="truncate">{{ product.name }}</h2>
            <p class="truncate">
              {{ product.manufacturer }} {{ product.volume }}
            </p>
          </div>
          <img :src="product.image" class="w-1/5" />
        </article>
      </div>
    </section>
  </div>

  <p v-else class="m-4">Erbjudandet med koden {{ code }} hittades inte.</p>
</template>

<script lang="ts" setup>
  import { useAssortmentStore } from '@/stores/assortment'
  import { parseDate } from '@/utils'
  import { computed } from 'vue'

  const props = defineProps({
    code: {
      required: true,
      type: String,
    },
  })

  const assortment = useAssortmentStore()
  const campaign = assortment.campaign(props.code)
  const products = computed(() => assortment.campaignProducts(props.code))

  await assortment.fetchCampaignProducts(props.code)
</script>
