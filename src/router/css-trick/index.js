export default {
  name: '_css-trick',
  path: '',
  children: [
    {
      name: 'css-trick',
      path: `/css-trick/index`,
      meta: {
        keepAlive: true
      },
      component: () => import(/*
        webpackChunkName: "css-trick-index"
      */`@/views/css-trick/index/index.ts`)
    },
    {
      name: 'css-trick-write',
      path: `/css-trick/write`,
      meta: {
        keepAlive: false
      },
      component: () => import(/*
        webpackChunkName: "css-trick-write"
      */`@/views/css-trick/css-trick-write/index.ts`)
    },
    {
      name: 'css-trick-detail',
      path: `/css-trick/detail`,
      meta: {
        keepAlive: false
      },
      component: () => import(/*
        webpackChunkName: "css-trick-detail"
      */`@/views/css-trick/css-trick-detail/index.ts`)
    }
  ]
}
