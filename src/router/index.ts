/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './import-router'
import { getToken } from '@/libs/utility/token'

Vue.use(Router)

console.log(routes)
let vueRouter : Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
vueRouter.beforeEach((to, from, next) => {
  let token = getToken()
  if (!token && (to.name === 'write-article')) {
    next('/notice')
  } else {
    next()
  }
})
export default vueRouter
