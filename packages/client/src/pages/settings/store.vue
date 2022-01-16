<template>
  <main class="space-y-2 bg-nord6 p-2">
    <section class="space-y-4 card">
      <p v-if="!savedStore">
        Du måste välja din butik innan appen kan börja användas.
      </p>
      <div v-else>
        <p>Min valda butik är {{ savedStore.name }} ({{ savedStore.id }}).</p>
        <p>Butiken har {{ !savedStore.online ? 'inte' : '' }} e-handel.</p>
      </div>
      <select
        v-model="savedStore"
        class="border-none rounded bg-nord4 p-2 px-2"
        @change="user.saveStore()"
      >
        <option disabled="true" :value="undefined" class="bg-nord6">
          Butik
        </option>
        <option
          v-for="store in data!.stores"
          :key="store.id"
          :value="store"
          class="bg-white"
        >
          {{ store.name }}
        </option>
      </select>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { StoresDocument } from '@/graphql/generated'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { useQuery } from 'villus'

  const { data } = await useQuery({ query: StoresDocument })
  const user = useUserStore()
  const { store: savedStore } = storeToRefs(user)
</script>
