<template>
  <div v-if="products?.length !== 0" class="flex flex-col space-y-2">
    <transition-group name="fade">
      <router-link
        v-for="product in products"
        :key="product.code"
        :to="`/products/${product.code}`"
        class="flex-1 block"
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
    </transition-group>
    <LoadingSpinner v-if="isFetching" class="self-center" />
    <div
      ref="searchRef"
      :class="{ 'h-[40px]': pagination?.hasMore && !isFetching }"
    />
  </div>
  <p v-else key="no-results">Inga produkter matchade sökningen.</p>
</template>

<script lang="ts" setup>
  import { PreviewProduct, ProductsDocument } from '@/graphql/generated'
  import { useElementVisibility } from '@vueuse/core'
  import { useQuery } from 'villus'
  import { computed, nextTick, reactive, ref, watchEffect } from 'vue'

  const searchRef = ref<HTMLElement>()
  let visible = ref(false)

  await nextTick(() => (visible = useElementVisibility(searchRef)))
  watchEffect(() => {
    if (visible.value) {
      void nextTick(() => (visible.value = false))
    }
  })

  const props = defineProps<{ query: string }>()
  const variables = reactive({ ...props, size: 15, page: 0 })

  const { data, isFetching } = await useQuery({
    query: ProductsDocument,
    variables,
  })
  const pagination = computed(() => data.value?.products.pagination)

  const products = ref<PreviewProduct[]>()
  watchEffect(() => {
    products.value = [
      ...(products.value ?? []),
      ...(data.value?.products.items ?? []),
    ]
  })

  watchEffect(() => {
    if (
      data.value?.products.pagination.hasMore &&
      !isFetching.value &&
      visible.value
    ) {
      variables.page++
    }
  })
</script>
