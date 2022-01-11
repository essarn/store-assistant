<template>
  <router-link
    :to="props.to"
    class="rounded font-semibold bg-nord4 text-center p-2 transition-shadow text-nord1 block hover:shadow"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
  const props = defineProps({
    to: {
      required: true,
      type: String,
    },
  })
</script>
