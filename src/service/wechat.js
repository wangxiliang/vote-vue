import {httpPost, httpGet} from 'utils/request'
export const getWechat = (data) => {
  return httpGet({
    url: 'getWechat',
    data
  })
}