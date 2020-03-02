import Main from '../views/main/index'
let viewsRouterContext = require.context('../views', true, /routes\/index.js$/)
let routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/notice',
    component: Main
  }
]
viewsRouterContext.keys().forEach(data => {
  let fatherDirNameDown = data.split('/')[1]
  let fatherDirNameUp = fatherDirNameDown.toUpperCase()
  let route = {
    path: '',
    name: fatherDirNameUp,
    component: Main,
    children: []
  }
  let context = viewsRouterContext(data)
  context = context.default || context
  let children = []
  context.forEach(childrenData => {
    childrenData = childrenData.slice(1, childrenData.length)
    let name = childrenData.split('/')[1]
    if (fatherDirNameDown !== 'css-trick') {
      children.push({
        path: `/${name}`,
        name: name,
        component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
      })
    } else {
      if (name !== 'css-trick') {
        children.push({
          path: `/css-trick/${name}`,
          name: name,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
        })
      }
    }
  })
  if (fatherDirNameDown === 'css-trick') {
    route.children = [{
      path: '/css-trick',
      name: 'css-trick',
      redirect: children[0].path,
      component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}/${fatherDirNameDown}/index.ts`),
      children: children
    }]
  } else {
    route.children = children
  }
  routes.push(route)
})

export default routes
