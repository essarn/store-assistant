<template>
  <nav class="flex space-x-1">
    <template v-for="(item, index) in props.items" :key="item.path">
      <router-link v-if="item.path" :to="item.path">{{
        item.name
      }}</router-link>
      <p v-else>{{ item.name }}</p>
      <p v-if="items.length - 1 != index">/</p>
    </template>
  </nav>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'

  export type BreadcrumbItem = {
    path?: string
    name: string
  }

  const props = defineProps({
    items: {
      required: true,
      type: Array as PropType<BreadcrumbItem[]>,
    },
  })
</script>
