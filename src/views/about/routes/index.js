const aboutContext = require.context('../', true, /\.ts$/)
const aboutRouters = aboutContext.keys().map(routerName => {
  const name = routerName.split('/')[1]
  return {
    name,
    path: `/${name}`,
    meta: {
      keepAlive: true
    },
    component: () => import(/*
      webpackMode: "lazy-once",
      webpackChunkName: "about"
    */ `../${name}/index.ts`)
  }
})
const aboutRouter = {
  name: '_about',
  path: '',
  children: aboutRouters
}
export default aboutRouter
