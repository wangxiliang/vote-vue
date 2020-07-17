import {httpPost, httpGet} from 'utils/request'
export const getBanner = (data) => {
  return httpGet({
    url: 'getBanner',
    data
  })
}