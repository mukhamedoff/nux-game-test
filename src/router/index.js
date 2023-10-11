import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
