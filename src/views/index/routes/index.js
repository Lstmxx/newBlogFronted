const indexContext = require.context('../', true, /\.ts$/)
const indexRouters = indexContext.keys().map(routerName => {
  const name = routerName.split('/')[1]
  return {
    name,
    path: `/${name}`,
    meta: {
      keepAlive: true
    },
    // src: `@/views/index/${name}/index.ts`
    component: () => import(/*
      webpackMode: "lazy-once",
      webpackChunkName: "index"
    */`../${name}/index.ts`)
  }
})
const indexRouter = {
  name: '_index',
  path: '',
  children: indexRouters
}
export default indexRouter
