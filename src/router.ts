import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/main/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '',
      name: 'Notice',
      component: Main,
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
      name: 'ArticleList',
      component: Main,
      children: [
        {
          path: '/article-list',
          name: 'articleList',
          component: () => import('./views/article-list/index')
        },
        {
          path: '/article-detail',
          name: 'articleDetail',
          component: () => import('./views/article-detail/index')
        }
      ]
    },
    {
      path: '',
      name: 'About',
      component: Main,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/about/index')
        }
      ]
    },
    {
      path: '',
      name: 'AddArticle',
      component: Main,
      children: [
        {
          path: '/add-article',
          name: 'addArticle',
          component: () => import('./views/add-article/index')
        }
      ]
    }
  ]
})
