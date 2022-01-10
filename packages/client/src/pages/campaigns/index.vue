<template>
  <header class="rounded m-2 shadow p-4">
    <Breadcrumbs :items="[{ name: 'Erbjudanden' }]" />
    <pre>Sort/filter...</pre>
  </header>
  <Suspense>
    <template #default>
      <section class="rounded m-2 shadow">
        <CampaignList />
      </section>
    </template>
    <template #fallback>
      <p class="m-2">Loading...</p>
    </template>
  </Suspense>
</template>

<script lang="ts" setup></script>
