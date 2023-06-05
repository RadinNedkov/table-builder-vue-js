import httpClient from './httpClient'

const getAllData = async (payload) => {
  const response = await httpClient.get(`${payload.endpoint}?${payload.filters}`)
  return response.data
}

const getCsv = async (payload) => {
  const response = await httpClient.get(`${payload.endpoint}?${payload.filters}`)
  return response.data
}

const buttonAction = async (payload) => {
  const response = await httpClient.put(`${payload.button.endpoint}${payload.button.perId ? '/' + payload.data.id : ''}${payload.button.action}`, payload.button.includeData ? payload.data : '')
  return response.data
}

export {
  getAllData,
  getCsv,
  buttonAction
}
