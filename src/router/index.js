import { createRouter, createWebHistory } from 'vue-router'

// If your Vite alias "@" points to /src (default in create-vue), these work:
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Home from '@/views/Home.vue'
import Home2 from '@/views/Home2.vue'
import Index from '@/views/index.vue'

// If the "@" alias doesn't work, use relative paths like:
// import DefaultLayout from '../layouts/DefaultLayout.vue'
// import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'index', component: Index },
      { path: 'home', name: 'home', component: Home },
      { path: 'home2', name: 'home2', component: Home2 },
      // add more child pages here, e.g.:
      // { path: 'about', name: 'about', component: () => import('@/pages/About.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
