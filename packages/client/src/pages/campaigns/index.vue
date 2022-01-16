<template>
  <main class="space-y-2 bg-nord6 pb-2">
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
    <section class="m-2 card">
      <template v-if="!isFetching && campaigns">
        <template v-if="campaigns.length !== 0">
          <router-link
            v-for="campaign in campaigns"
            :key="campaign.code"
            :to="`/campaigns/${campaign.code}`"
          >
            <article class="flex space-y-2 items-center justify-between">
              <div class="w-4/5">
                <h2 class="truncate">{{ campaign.name }}</h2>
                <p class="truncate">
                  {{ campaign.manufacturer }} {{ campaign.volume }}
                </p>
              </div>
              <img :src="campaign.image" class="w-1/5" />
            </article>
          </router-link>
        </template>
        <p v-else>Den här kategorin har inga erbjudanden.</p>
      </template>
      <p v-else>Laddar...</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { CampaignsDocument, CategoriesDocument } from '@/graphql/generated'
  import { useQuery } from 'villus'
  import { computed, ref, watchEffect } from 'vue'

  const { data: categoriesData } = await useQuery({ query: CategoriesDocument })
  const {
    data: campaignsData,
    isFetching,
    execute,
  } = await useQuery({
    query: CampaignsDocument,
  })

  const categories = computed(() =>
    categoriesData.value?.categories.filter((category) => !category.parent)
  )
  const campaigns = computed(() => campaignsData.value?.campaigns)

  const filter = ref<string | undefined>()
  watchEffect(() => void execute({ variables: { category: filter.value } }))
</script>
