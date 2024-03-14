import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('./views/demo1.vue'),
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('./views/demo2.vue'),
  },
  {
    path: '/',
    component: () => import('./views/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
