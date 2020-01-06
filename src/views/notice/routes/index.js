let noticeContext = require.context('../', true, /\.ts$/)
console.log(noticeContext.keys())
export default noticeContext.keys()
