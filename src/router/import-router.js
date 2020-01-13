import Main from '../views/main/index'
let viewsRouterContext = require.context('../views', true, /routes\/index.js$/)
let routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/notice',
    component: Main
  }
]
viewsRouterContext.keys().forEach(data => {
  data = data.slice(1, data.length)
  let fatherDirNameDown = data.split('/')[1]
  let fatherDirNameUp = fatherDirNameDown.toUpperCase()
  let route = {
    path: '',
    name: fatherDirNameUp,
    component: Main,
    children: []
  }
  let context = viewsRouterContext('.' + data)
  context = context.default || context
  let children = []
  context.forEach(childrenData => {
    childrenData = childrenData.slice(1, childrenData.length)
    let name = childrenData.split('/')[1]
    children.push({
      path: `/${name}`,
      name: name,
      component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
    })
  })
  route.children = children
  routes.push(route)
})

export default routes
