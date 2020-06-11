
export default {
  name: '_article',
  path: '',
  children: [
    {
      name: 'article',
      path: `/artcle/index`,
      meta: {
        keepAlive: true
      },
      component: () => import(/*
        webpackChunkName: "article-index"
      */`@/views/article/index/index.ts`)
    },
    {
      name: 'article-write',
      path: `/article/write`,
      meta: {
        keepAlive: false
      },
      component: () => import(/*
        webpackChunkName: "article-write"
      */`@/views/article/article-write/index.ts`)
    },
    {
      name: 'article-detail',
      path: `/article/detail`,
      meta: {
        keepAlive: false
      },
      component: () => import(/*
        webpackChunkName: "article-detail"
      */`@/views/article/article-detail/index.ts`)
    }
  ]
}
