/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './import-router'

Vue.use(Router)

console.log(routes)
let vueRouter : Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
vueRouter.beforeEach((to, from, next) => {
  if (to.name === 'addArticle') {
    
    next()
  } else {
    next()
  }
})
export default vueRouter
