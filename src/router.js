import Vue from 'vue'
import VueRouter from 'vue-router'
import shareRoute from "@/share_route/context/views/ShareRoutes.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ruta',
    component: shareRoute
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
