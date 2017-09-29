import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/mockapi/data')// api
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
