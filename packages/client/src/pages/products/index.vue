<template>
  <main class="space-y-2 bg-nord6 pb-2 z-100">
    <header class="flex flex-col bg-nord6 shadow-md p-2 top-0 card sticky">
      <input
        v-model.trim="query"
        placeholder="Sökord eller SAP-id"
        class="border-none rounded bg-nord4 flex-1 p-2 px-2"
      />
    </header>
    <section class="flex flex-col m-2 items-center card">
      <transition name="fade" mode="out-in">
        <suspense timeout="0">
          <SearchResult
            v-if="debounced"
            :key="debounced"
            :query="debounced"
            :ready="visible"
          />
          <p v-else key="search">Ingen sökning har gjorts.</p>
          <template #fallback>
            <div>
              <LoadingSpinner />
            </div>
          </template>
        </suspense>
      </transition>
      <div ref="target" />
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { useDebounce, useElementVisibility } from '@vueuse/core'
  import { nextTick, ref, watchEffect } from 'vue'

  const query = ref<string | undefined>()
  const debounced = useDebounce(query, 500)

  const target = ref<HTMLElement>()
  const visible = useElementVisibility(target)
  watchEffect(() => {
    if (visible.value) {
      void nextTick(() => (visible.value = false))
    }
  })
</script>
