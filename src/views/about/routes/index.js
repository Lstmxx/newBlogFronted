let aboutContext = require.context('../', true, /\.ts$/)
console.log(aboutContext.keys())
export default aboutContext.keys()
