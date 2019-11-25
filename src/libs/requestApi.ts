import service from './axios/axios'

export function baseGetDetail (config : any, token : string) : Promise<any> {
  let headers = {
    common: {
      token: localStorage.getItem('token') || ''
    },
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
  if (token) {
    headers.common.token = token
  }
  const request = {
    headers,
    url: config.url + '/' + config.data.id,
    method: 'GET'
  }
  return service.request(request)
}

export function baseGetList (config : any, token : string) : Promise<any> {
  let headers = {
    common: {
      token: localStorage.getItem('token') || ''
    },
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
  if (token) {
    headers.common.token = token
  }
  const request = {
    headers,
    url: config.url,
    method: 'GET'
  }
  return service.request(request)
}

export function baseLogin (config : any) : Promise<any> {
  const request = {
    url: config.url,
    method: 'POST',
    data: config.data
  }
  return service.request(request)
}

export function getToken () : Promise<any> {
  const config = {
    url: '/get-token',
    method: 'POST'
  }
  return service.request(config)
}
