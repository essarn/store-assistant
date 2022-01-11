<template>
  <main class="space-y-2 bg-nord6 p-2">
    <header class="card">
      <Breadcrumbs
        :items="[
          { path: '/campaigns', name: 'Erbjudanden' },
          { name: campaign?.name ?? 'N/A' },
        ]"
      />
      <pre>Actions... (check EAN etc.)</pre>
    </header>
    <template v-if="campaign">
      <section class="card">
        <p>{{ campaign.type }}</p>
        <p>
          Gäller från {{ parseDate(campaign.start) }} till
          {{ parseDate(campaign.end) }}
        </p>
      </section>
      <section class="card">
        <p>{{ campaign.price }} ({{ campaign.comparePrice }})</p>
        <p>{{ campaign.savePrice }}</p>
      </section>
      <section class="card">
        <div class="mb-2">
          <p>{{ campaign.manufacturer }} {{ campaign.volume }}</p>
          <p v-if="campaign.description">{{ campaign.description }}</p>
        </div>
        <article
          v-for="product in products"
          :key="product.code"
          class="flex space-x-2 py-2 items-center justify-between"
        >
          <div class="w-4/5">
            <h2 class="truncate">{{ product.name }}</h2>
            <p class="truncate">
              {{ product.manufacturer }} {{ product.volume }}
            </p>
          </div>
          <img :src="product.image" class="w-1/5" />
        </article>
      </section>
    </template>

    <p v-else class="m-4">Erbjudandet med koden {{ code }} hittades inte.</p>
  </main>
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
