import Vue from 'vue'
import Router from 'vue-router'
import main from './views/main/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '',
      name: 'Notice',
      component: main,
      children: [
        {
          path: '/notice',
          name: 'notice',
          component: () => import('./views/notice/index')
        }
      ]
    },
    {
      path: '',
      name: 'Article',
      component: main,
      children: [
        {
          path: '/article',
          name: 'article',
          component: () => import('./views/article/index')
        }
      ]
    },
    {
      path: '',
      name: 'About',
      component: main,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/about/index')
        }
      ]
    }
  ]
})
