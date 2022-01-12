<template>
  <main class="space-y-2 bg-nord6 pb-2">
    <header class="flex flex-col bg-nord6 shadow-md p-2 top-0 card sticky">
      <input
        v-model="search"
        placeholder="Sök"
        class="border-none rounded bg-nord4 p-2 px-2"
      />
    </header>
    <section class="space-y-2 m-2 card">
      <template v-if="isDone && data != null">
        <template v-if="data!.products.length !== 0">
          <article
            v-for="product in data?.products"
            :key="product.code"
            class="flex items-center justify-between"
          >
            <div class="w-4/5">
              <h2 class="truncate">{{ product.name }}</h2>
              <p class="truncate">
                {{ product.manufacturer }} {{ product.volume }}
              </p>
            </div>
            <img :src="product.image" class="w-1/5" />
          </article>
        </template>
        <p v-else>Inga produkter hittades</p>
      </template>
      <p v-else>Gör en sökning...</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  import { useDebounce } from '@vueuse/core'
  import { ProductsDocument } from '@/graphql/generated'
  import { useQuery } from 'villus'

  const search = ref<string>()
  const debounced = useDebounce(search, 500)

  const { data, execute, isDone } = useQuery({
    query: ProductsDocument,
    fetchOnMount: false,
  })

  watchEffect(() => {
    if (debounced.value) {
      void execute({
        variables: {
          search: debounced.value,
        },
      })
    } else {
      data.value = null
    }
  })
</script>
