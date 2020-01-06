/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/main/index'

Vue.use(Router)
// function loadViewsComponents (target : string, basePath : Array<string>) : Function {
//   return () => import(/* webpackChunkName: `[request]` */  `views/${basePath.join('/')}/${target}.vue`)
// }
// let viewsRouterContext = require.context('./views', true, /routes\/index.js$/)
// console.log(viewsRouterContext.keys())
// let routes = [
//   {
//     path: '/',
//     name: 'main',
//     component: Main
//   }
// ]
// viewsRouterContext.keys().forEach(data => {
//   data = data.slice(1, data.length)
//   const fatherDir = data.split('/')[1]
//   console.log(fatherDir)
//   import(/* webpackChunkName [request] */ `./views${data}`).then((result) => {
//     console.log(result.default)
//     let children = []
//     if (result.default.length > 1) {
//       routes.push({
//         path: '',
//         name: 'Notice',
//         component: Main,
//         children
//       })
//     } else {
//       routes.push({
//         path: '',
//         name: 'Notice',
//         component: Main,
//         children: [
//           {
//             path: '/notice',
//             name: 'notice',
//             component: () => import(/* webpackChunkName: "notice" */ './views/notice/index')
//           }
//         ]
//       })
//     }
//   }).catch((err) => {
//     console.log(err)
//   })
// })
let vueRouter : Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/notice',
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
          component: () => import(/* webpackChunkName: "notice" */ './views/notice/index')
        }
      ]
    },
    {
      path: '',
      name: 'article',
      component: Main,
      children: [
        {
          path: '/article-list',
          name: 'article-list',
          component: () => import(/* webpackChunkName: "article-list" */ './views/article/article-list/index')
        },
        {
          path: '/article-detail',
          name: 'article-detail',
          component: () => import(/* webpackChunkName: "article-detail" */ './views/article/article-detail/index')
        },
        {
          path: '/add-article',
          name: 'addArticle',
          component: () => import(/* webpackChunkName: "add-article" */ './views/article/add-article/index')
        }
      ]
    },
    {
      path: '',
      name: '',
      component: Main,
      children: [
        {
          path: '/css-trick',
          name: 'css-trick',
          component: () => import(/* webpackChunkName: "about" */ './views/css-trick/css-trick/index'),
          children: [
          ]
        }
      ]
    },
    {
      path: '',
      name: '',
      component: Main,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/about/index')
        }
      ]
    }
  ]
})

export default vueRouter
