import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import LayoutView from '../views/LayoutView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Layout',
    component: LayoutView,
    children: [ // 子路由
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'admin',
        name: 'admin',
        component: AdminView
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
