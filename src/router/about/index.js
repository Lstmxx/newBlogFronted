export default {
  name: '_about',
  path: '',
  children: [
    {
      path: '/about',
      name: 'about',
      component: () => import(/*
        webpackChunkName: "about"
      */ `@/views/about/index.ts`)
    }
  ]
}
