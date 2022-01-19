<template>
  <div v-if="data?.products.length !== 0" class="space-y-2">
    <router-link
      v-for="product in data!.products"
      :key="product.code"
      :to="`/products/${product.code}`"
      class="block"
    >
      <article class="flex items-center justify-between">
        <div class="w-4/5">
          <h2 class="truncate">{{ product.name }}</h2>
          <p class="truncate">
            {{ product.manufacturer }} {{ product.volume }}
          </p>
        </div>
        <img :src="product.image" class="w-1/5" />
      </article>
    </router-link>
  </div>
  <p v-else key="no-results">Inga produkter matchade sökningen.</p>
</template>

<script lang="ts" setup>
  import { QueryProductsDocument } from '@/graphql/generated'
  import { useQuery } from 'villus'

  const props = defineProps({ query: { required: true, type: String } })

  const { data, isFetching } = await useQuery({
    query: QueryProductsDocument,
    variables: { ...props },
  })
</script>
