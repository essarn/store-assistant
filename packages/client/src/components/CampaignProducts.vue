<template>
  <div class="divide-y flex flex-col">
    <article
      v-for="product in products"
      :key="product.code"
      class="flex space-x-2 py-2 items-center justify-between"
    >
      <div>
        <h2 class="truncate">{{ product.name }}</h2>
        <p class="truncate">{{ product.manufacturer }} {{ product.volume }}</p>
      </div>
      <img :src="product.image" class="w-1/5" />
    </article>
  </div>
</template>

<script lang="ts" setup>
  import { useAssortmentStore } from '@/stores/assortment'
  import { computed } from 'vue'

  const props = defineProps({
    code: {
      required: true,
      type: String,
    },
  })

  const assortment = useAssortmentStore()
  const products = computed(() => assortment.campaignProducts(props.code))

  await assortment.fetchCampaignProducts(props.code)
</script>
