const cssTrickContext = require.context('../', true, /\.ts$/)
const cssTrickRouters = []
cssTrickContext.keys().forEach(routerName => {
  const name = routerName.split('/')[1]
  cssTrickRouters.push({
    name: name === 'index' ? 'css-trick' : name,
    path: `/css-trick/${name}`,
    meta: {
      keepAlive: true
    },
    component: () => import(/*
      webpackMode: "lazy-once",
      webpackChunkName: "css-trick"
    */ `../${name}/index.ts`)
  })
})
const cssTrickRouter = {
  name: '_css-trick',
  path: '',
  children: cssTrickRouters
}
export default cssTrickRouter
