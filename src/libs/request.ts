import { baseGetDetail, baseGetList, baseLogin, getToken } from './requestApi'

function checkToken (promiseCallBack : Function, config : Object, resolve, reject) {
  promiseCallBack(config).then((response) => {
    if (!response.msg) {
      resolve(response.data)
    }
    if (response.status === 401) {
      getToken().then((responseData) => {
        localStorage.setItem('token', responseData.data.data.token)
        promiseCallBack(config, responseData.data.data.token).then((response) => {
          if (!response.msg) {
            resolve(response.data)
          }
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    }
  }).catch((err) => {
    reject(err)
  })
}

export function getDetail (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    const callBack = baseGetDetail
    checkToken(callBack, config, resolve, reject)
  })
}

export function getList (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    const callBack = baseGetList
    checkToken(callBack, config, resolve, reject)
  })
}

export function login (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    baseLogin(config).then((response) => {
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