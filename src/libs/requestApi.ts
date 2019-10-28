import service from './axios/axios'

export function baseGetDetail (url: String, data: any) : Promise<any> {
  let config = {
    url: url + '/' + data.id,
    method: 'GET'
  }
  return service.request(config)
}

export function baseGetList (url: String) : Promise<any> {
  let config = {
    url: url,
    method: 'GET'
  }
  return service.request(config)
}
