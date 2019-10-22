import service from './axios/axios'
function sr (method, url, data) {
  return service.request({
    url,
    data,
    method
  })
}

export function sendRequest (config) {
  return new Promise((resolve, reject) => {
    sr(config.method, config.url, config.data).then((response) => {
      if (!response.msg) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
