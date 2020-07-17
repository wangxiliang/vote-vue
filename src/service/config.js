import {httpPost, httpGet} from 'utils/request'
export const getConfig = (data) => {
  return httpGet({
    url: 'getConfig',
    data
  })
}