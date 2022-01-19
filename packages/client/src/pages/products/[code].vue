<template>
  <main class="space-y-2 bg-nord6 p-2">
    <template v-if="product">
      <header class="flex space-x-2 card items-center">
        <div class="flex-1">
          <Breadcrumbs
            :items="[
              { name: 'Produkter', path: '/products' },
              { name: product.name },
            ]"
          />
          <p>{{ product.manufacturer }} {{ product.volume }}</p>
        </div>
        <img :src="product.image" class="w-1/5" />
      </header>
      <section
        v-if="product.description"
        class="card"
        @click="truncate.description = !truncate.description"
      >
        <p :class="{ truncate: truncate.description }">
          {{ product.description }}
        </p>
      </section>
      <section
        v-if="product.ingredients"
        class="card"
        @click="truncate.ingredients = !truncate.ingredients"
      >
        <p :class="{ truncate: truncate.ingredients }">
          {{ product.ingredients }}
        </p>
      </section>
      <section v-if="product.labels.length !== 0" class="p-2 card">
        <p
          v-for="label of product.labels"
          :key="label"
          class="rounded bg-nord6 m-2 py-1 px-2 inline-block"
        >
          {{ label }}
        </p>
      </section>
      <section class="card">
        <p>SAP-id: {{ product.code }}</p>
        <p>EAN: {{ product.ean }}</p>
      </section>
      <section class="card">
        <p>{{ formatPrice(product.price) }}</p>
        <p v-if="product.comparePrice">
          Jmfr-pris {{ formatPrice(product.comparePrice) }}
        </p>
      </section>
    </template>
  </main>
</template>

<script lang="ts" setup>
  import { ProductDocument } from '@/graphql/generated'
  import { formatPrice } from '@/utils'
  import { useQuery } from 'villus'
  import { computed, reactive } from 'vue'
  const props = defineProps({
    code: {
      required: true,
      type: String,
    },
  })

  const truncate = reactive({
    description: true,
    ingredients: true,
  })

  const { data } = await useQuery({
    query: ProductDocument,
    variables: { ...props },
  })
  const product = computed(() => data.value?.product)
</script>
