<template>
  <main class="space-y-2 bg-nord6 pb-2 z-100">
    <header class="flex flex-col bg-nord6 shadow-md p-2 top-0 card sticky">
      <select v-model="filter" class="border-none rounded bg-nord4 p-2 px-2">
        <option disabled="true" :value="undefined" selected>Kategori</option>
        <option
          v-for="category in categories"
          :key="category.code"
          :value="category.code"
          class="bg-nord6"
        >
          {{ category.name }}
        </option>
      </select>
    </header>
    <section class="flex m-2 justify-center card">
      <transition name="fade" mode="out-in">
        <suspense timeout="0">
          <CampaignsList :key="filter" :category="filter" />
          <template #fallback>
            <div>
              <LoadingSpinner />
            </div>
          </template>
        </suspense>
      </transition>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { CategoriesDocument } from '@/graphql/generated'
  import { useQuery } from 'villus'
  import { computed, ref } from 'vue'

  const { data: categoriesData } = await useQuery({ query: CategoriesDocument })
  const categories = computed(() =>
    categoriesData.value?.categories.filter((category) => !category.parent)
  )

  const filter = ref<string>()
</script>
