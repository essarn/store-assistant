<template>
  <header class="shadow p-4">
    <Breadcrumbs :items="[{ path: '/', name: 'Store Assistant' }]" />
  </header>

  <main>
    <router-view />
  </main>
</template>
