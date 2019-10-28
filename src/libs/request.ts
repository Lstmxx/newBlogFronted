import { baseGetDetail, baseGetList } from './requestApi'

export function getDetail (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    baseGetDetail(config.url, config.data).then((response) => {
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
export function getList (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    baseGetList(config.url).then((response) => {
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
