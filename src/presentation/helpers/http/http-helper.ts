import { HttpResponse } from '../../protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
export const noCotent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})