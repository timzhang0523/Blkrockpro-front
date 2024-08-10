import Vue from 'vue'
import VueRouter from 'vue-router'

import BodyView from '../views/body/body.vue'
import UserView from '../views/user/user.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'body',
    component: BodyView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  }
]

const router = new VueRouter({
  routes
})

export default router
