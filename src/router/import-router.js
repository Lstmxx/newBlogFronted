/* eslint-disable */
import Main from '../views/main/index'
const mode = ''
const viewsRouterContext = require.context('../views', true, /routes\/index.js$/)
const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/index'
  }
]
if (mode === 'lazy') {
  (
  async function () {
    const contextList = []
      viewsRouterContext.keys().forEach(data => {
        const context = viewsRouterContext(data)
        contextList.push(context)
      })
      await new Promise((resolve, reject) => {
        Promise.all(contextList).then((result) => {
          routes.push(...result.map(item => {
            item = item.default || item
            item.component = Main
            return item
          }))
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  )()
} else {
  viewsRouterContext.keys().forEach(data => {
    let context = viewsRouterContext(data)
    context = context.default || context
    context.component = Main
    routes.push(context)
  })
}

console.log('helo')
console.log(routes)
export default routes
