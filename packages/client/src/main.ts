import { createPinia } from 'pinia'
import { createClient, defaultPlugins } from 'villus'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import App from './App.vue'
import { useUserStore } from './stores/user'

const app = createApp(App)
app.use(createRouter({ history: createWebHistory(), routes }))

const pinia = createPinia()
pinia.use(() => ({ $villus: villus }))
app.use(pinia)

const villus = createClient({
  url: 'http://localhost:8080/graphql',
  use: [
    ({ opContext: { headers } }) => {
      const user = useUserStore()

      if (user.store) {
        headers.store = user.store.id
      }
    },
    ...defaultPlugins(),
  ],
})
app.use(villus)

app.mount('#app')
