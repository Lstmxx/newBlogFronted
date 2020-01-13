let noticeContext = require.context('../', true, /\.ts$/)
export default noticeContext.keys()
