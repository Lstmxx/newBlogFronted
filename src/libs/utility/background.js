import { baseGet } from '../requestApi'
export function loadBingBg () {
  return new Promise((resolve, reject) => {
    const config = {
      url: '/load/background/image',
      data: {}
    }
    baseGet(config).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
