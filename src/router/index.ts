/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './import-router'
import { getToken } from '@/libs/utility/token'
import store from '@/store'

Vue.use(Router)

console.log(routes)
let vueRouter : Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
vueRouter.beforeEach((to, from, next) => {
  let token = getToken()
  console.log(store.state)
  console.log(token)
  if (to.name === 'write-article') {
    if (token) {
      if (store.state['user']) {
        if (store.state['user']['role'] !== 'superAdmin') {
          next('/notice')
        } else {
          next()
        }
      } else {
        store.dispatch('loadUserInfo').then((responseData) => {
          if (to.name === 'write-article' && responseData.userInfo.role !== 'superAdmin') {
            next('/notice')
          } else {
            next()
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    } else {
      next('/notice')
    }
  } else {
    next()
  }
})
export default vueRouter
