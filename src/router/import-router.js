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
console.log(viewsRouterContext.keys())
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
  console.log(context)
  context = context.default || context
  let children = []
  context.forEach(childrenData => {
    childrenData = childrenData.slice(1, childrenData.length)
    const name = childrenData.split('/')[1]
    if (fatherDirNameDown !== 'css-trick') {
      children.push({
        path: `/${name}`,
        name: name,
        component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
      })
    } else {
      if (name !== 'css-trick' && name !== 'index') {
        children.push({
          path: `/css-trick/${name}`,
          name: name,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
        })
      } else if (name === 'index') {
        children.unshift({
          path: `/css-trick/${name}`,
          name: name,
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}${childrenData}`)
        })
      }
    }
  })
  if (fatherDirNameDown === 'css-trick') {
    const component = import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}/${fatherDirNameDown}/index.ts`).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    console.log(component)
    route.children = [{
      path: '/css-trick',
      name: 'css-trick',
      redirect: children[0].path,
      meta: {
        name: ''
      },
      component: () => import(/* webpackChunkName: "[request]" */ `../views/${fatherDirNameDown}/${fatherDirNameDown}/index.ts`),
      children: children
    }]
  } else {
    route.children = children
  }
  routes.push(route)
})
console.log(routes)

export default routes
