import {
  baseGetDetail,
  baseGetList,
  baseLogin,
  getServiceToken,
  baseGetPage,
  upLoadFile,
  baseGetUserInfo,
  baseStore,
  baseLogout
} from './requestApi'
import { setToken } from './utility/token'

function checkToken (promiseCallBack : Function, config : Object, resolve, reject) {
  promiseCallBack(config).then((response) => {
    resolve(response.data.data)
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

export function getPage (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    const callBack = baseGetPage
    checkToken(callBack, config, resolve, reject)
  })
}

export function login (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    baseLogin(config).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function upLoad (config, callBack, type) : Promise<any> {
  return new Promise((resolve, reject) => {
    upLoadFile(config, callBack, type).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getUserInfo () : Promise<any> {
  return new Promise((resolve, reject) => {
    baseGetUserInfo().then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function store (config) : Promise<any> {
  return new Promise((resolve, reject) => {
    baseStore(config).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function logout () : Promise<any> {
  return new Promise((resolve, reject) => {
    baseLogout().then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
