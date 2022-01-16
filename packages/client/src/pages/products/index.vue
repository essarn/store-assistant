<template>
  <main class="space-y-2 bg-nord6 pb-2">
    <header class="flex flex-col bg-nord6 shadow-md p-2 top-0 card sticky">
      <input
        v-model="query"
        placeholder="Sök"
        class="border-none rounded bg-nord4 p-2 px-2"
      />
    </header>
    <section class="space-y-2 m-2 card">
      <template v-if="isDone && data != null">
        <template v-if="data!.products.length !== 0">
          <router-link
            v-for="product in data?.products"
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
        </template>
        <p v-else>Inga produkter hittades</p>
      </template>
      <p v-else>Gör en sökning...</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { QueryProductsDocument } from '@/graphql/generated'
  import { useDebounce } from '@vueuse/core'
  import { useQuery } from 'villus'
  import { ref, watchEffect } from 'vue'

  const query = ref<string>()
  const debounced = useDebounce(query, 500)

  const { data, execute, isDone } = useQuery({
    query: QueryProductsDocument,
    fetchOnMount: false,
  })

  watchEffect(() => {
    if (debounced.value) {
      void execute({
        variables: {
          query: debounced.value,
        },
      })
    } else {
      data.value = null
    }
  })
</script>
