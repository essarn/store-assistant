<template>
  <div v-if="campaigns?.length !== 0" class="flex flex-col space-y-2">
    <transition-group name="fade">
      <router-link
        v-for="campaign in campaigns"
        :key="campaign.code"
        :to="`/campaigns/${campaign.code}`"
        class="block"
      >
        <article class="flex items-center justify-between">
          <div class="w-4/5">
            <h2 class="truncate">{{ campaign.name }}</h2>
            <p class="truncate">
              {{ campaign.manufacturer }} {{ campaign.volume }}
            </p>
          </div>
          <img :src="campaign.image" class="w-1/5" />
        </article>
      </router-link>
    </transition-group>
    <LoadingSpinner v-if="isFetching" class="self-center" />
  </div>
  <p v-else>Den här kategorin har inga erbjudanden.</p>
</template>

<script lang="ts" setup>
  import { CampaignsDocument, PreviewCampaign } from '@/graphql/generated'
  import { toRefs, useScroll } from '@vueuse/core'
  import { useQuery } from 'villus'
  import { computed, reactive, ref, watchEffect } from 'vue'

  const props = defineProps<{ category?: string }>()
  const variables = reactive({ ...props, size: 15, page: 0 })

  const { data, isFetching } = await useQuery({
    query: CampaignsDocument,
    variables,
  })

  const campaigns = ref<PreviewCampaign[]>()
  const pagination = computed(() => data.value?.campaigns.pagination)
  watchEffect(() => {
    campaigns.value = [
      ...(campaigns.value ?? []),
      ...(data.value?.campaigns.items ?? []),
    ]
  })

  const scroll = toRefs(useScroll(window).arrivedState)
  watchEffect(() => {
    if (scroll.bottom.value) {
      scroll.bottom.value = false

      if (pagination.value?.hasMore && !isFetching.value) {
        variables.page++
      }
    }
  })
</script>
