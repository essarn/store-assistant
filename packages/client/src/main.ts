import { createPinia } from 'pinia'
import { createClient } from 'villus'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)

app.use(createPinia())

export const villus = createClient({ url: 'http://localhost:8080/graphql' })
app.use(villus)

app.mount('#app')
