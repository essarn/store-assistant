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
      <Suspense>
        <template #default>
          <CampaignProducts :code="code" />
        </template>
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </section>
  </div>

  <p v-else class="m-4">Erbjudandet med koden {{ code }} hittades inte.</p>
</template>

<script lang="ts" setup>
  import { useAssortmentStore } from '@/stores/assortment'
  import { parseDate } from '@/utils'

  const props = defineProps({
    code: {
      required: true,
      type: String,
    },
  })

  const assortment = useAssortmentStore()
  const campaign = assortment.campaign(props.code)
</script>
