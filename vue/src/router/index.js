import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import LayoutView from '../views/LayoutView.vue'
// import RegisterView from "@/views/RegisterView";
import RegisterView from '../views/RegisterView.vue'
import BookView from '../views/BookView.vue'
import TypeView from '../views/TypeView.vue'
import AuditView from '../views/AuditView.vue'
import HotelView from '../views/HotelView.vue'
import ReserveView from '../views/ReserveView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
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
      },
      {
        path: 'book',
        name: 'book',
        component: BookView
      },
      {
        path: 'type',
        name: 'type',
        component: TypeView
      },
      {
        path: 'audit',
        component: AuditView
      },
      {
        path: 'hotel',
        component: HotelView
      },
      {
        path: 'reserve',
        component: ReserveView
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to ,from, next) => {
  const user = localStorage.getItem("user");
  if (!user && to.path !== '/login' && to.path !== '/register') {
    return next("/login");
  }
  next();
})

export default router
