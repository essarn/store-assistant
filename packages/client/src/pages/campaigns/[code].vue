<template>
  <main class="space-y-2 bg-nord6 p-2">
    <template v-if="campaign">
      <header class="card">
        <Breadcrumbs
          :items="[
            { name: 'Erbjudanden', path: '/campaigns' },
            { name: campaign.name },
          ]"
        />
      </header>
      <template v-if="data?.campaign">
        <section class="card">
          <p>{{ data.campaign.type }}</p>
          <p>Gäller till och med {{ parseDate(campaign.until) }}</p>
        </section>
        <section class="card">
          <p>{{ formatPrice(data.campaign.price) }}</p>
          <p>Jmfr-pris {{ formatPrice(data.campaign.comparePrice) }}</p>
          <p>{{ data.campaign.savePrice }}</p>
        </section>
        <section class="space-y-2 card">
          <div>
            <p>{{ data.campaign.manufacturer }} {{ data.campaign.volume }}</p>
            <p v-if="data.campaign.description">
              {{ data.campaign.description }}
            </p>
          </div>
          <article
            v-for="product in data.campaign.products"
            :key="product.code"
            class="flex space-x-2 items-center justify-between"
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

      <p v-else class="m-4">
        Erbjudandet med koden {{ code }} hittades inte.
      </p></template
    >
  </main>
</template>

<script lang="ts" setup>
  import { CampaignDocument } from '@/graphql/generated'
  import { formatPrice, parseDate } from '@/utils'
  import { useQuery } from 'villus'
  import { computed } from 'vue'

  const props = defineProps({
    code: {
      required: true,
      type: String,
    },
  })

  const { data } = await useQuery({
    query: CampaignDocument,
    variables: { ...props },
  })

  const campaign = computed(() => data.value?.campaign)

  // const assortment = useAssortmentStore()
  // const campaign = assortment.campaign(props.code)
  // const products = computed(() => assortment.campaignProducts(props.code))
  // await assortment.fetchCampaignProducts(props.code)
</script>
