import {httpPost, httpGet} from 'utils/request'
export const updatePoll = (data) => {
  return httpPost({
    url: 'poll',
    data
  })
}