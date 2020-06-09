const articleContext = require.context('../', true, /\.ts$/)
const articleRouters = articleContext.keys().map(routerName => {
  console.log(routerName)
  const name = routerName.split('/')[1]
  return {
    name,
    path: `/${name}`,
    meta: {
      keepAlive: name !== 'article-detail' && name !== 'write-article'
    },
    component: () => import(/*
      webpackMode: "lazy-once",
      webpackChunkName: "article"
    */ `../${name}/index.ts`)
  }
})
const articleRouter = {
  name: '_article',
  path: '',
  children: articleRouters
}
export default articleRouter
