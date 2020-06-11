export default {
  name: '_index',
  path: '',
  children: [
    {
      name: 'index',
      path: `/index`,
      meta: {
        keepAlive: true
      },
      component: () => import(/*
        webpackChunkName: "index"
      */`@/views/index/index.ts`)
    }
  ]
}
