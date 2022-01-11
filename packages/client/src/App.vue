<template>
  <div class="flex flex-col min-h-screen text-nord0">
    <header class="bg-nord6 shadow p-4 relative">
      <router-link to="/" class="rounded font-semibold p-2 hover:bg-nord4">
        Store Assistant
      </router-link>
    </header>
    <router-view v-slot="{ Component, route }" class="flex-1">
      <template v-if="Component">
        <keep-alive>
          <suspense timeout="0">
            <component :is="Component" :key="route.path" />
            <template #fallback>
              <div class="flex bg-nord6 flex-1 items-center justify-center">
                <p>Loading...</p>
              </div>
            </template>
          </suspense>
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>
