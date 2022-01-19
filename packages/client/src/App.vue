<template>
  <div class="flex flex-col min-h-screen text-nord0">
    <nav class="flex bg-nord6 shadow-md p-2 z-50 justify-between relative">
      <router-link to="/" class="rounded font-semibold p-2 hover:bg-nord4">
        Store Assistant
      </router-link>
      <router-link
        to="/settings"
        class="rounded flex font-semibold p-2 items-center hover:bg-nord4"
      >
        Inställningar
      </router-link>
    </nav>
    <router-view v-slot="{ Component, route }" class="flex-1">
      <transition name="fade" mode="out-in">
        <template v-if="Component">
          <keep-alive exclude="loading-spinner">
            <suspense timeout="0">
              <component :is="Component" :key="route.path" />
              <template #fallback>
                <div class="flex bg-nord6 flex-1 items-center justify-center">
                  <LoadingSpinner />
                </div>
              </template>
            </suspense>
          </keep-alive>
        </template>
      </transition>
    </router-view>
  </div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 100ms ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
