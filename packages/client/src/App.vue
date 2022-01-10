<template>
  <header class="shadow p-4">
    <Breadcrumbs :items="[{ path: '/', name: 'Store Assistant' }]" />
  </header>

  <main>
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <keep-alive>
          <Suspense timeout="0">
            <component :is="Component" :key="route.path" />
            <template #fallback>
              <div class="flex h-full w-full fixed items-center justify-center">
                <div class="z-10">
                  <p>Loading...</p>
                </div>
              </div>
            </template>
          </Suspense>
        </keep-alive>
      </template>
    </router-view>
  </main>
</template>
