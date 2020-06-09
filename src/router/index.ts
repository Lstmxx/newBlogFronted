/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './import-router'
import { getToken } from '@/libs/utility/token'
import store from '../store/index.js'

Vue.use(Router)

// console.log(routes)
const vueRouter : Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

vueRouter.beforeEach(async (to, from, next) => {
  const token = getToken()
  // if (!store.state['user']['role']) {
  //   await store.dispatch('loadUserInfo')
  // }
  if (to.name === 'write-article' || to.name === 'css-trick-write') {
    if (token) {
      await store.dispatch('loadUserInfo')
      if (store.state['user']['role'] !== 'superAdmin') {
        next('/index')
      } else {
        next()
      }
    } else {
      next('/index')
    }
  } else {
    next()
  }
})
export default vueRouter
