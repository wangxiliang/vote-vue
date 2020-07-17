import {httpPost, httpGet, httpBinPost} from 'utils/request'
export const getEnrollList = (data) => {
  return httpGet({
    url: 'getEnrollList',
    data
  })
}

export const getCount = (data) => {
  return httpGet({
    url: 'getCount',
    data
  })
}

export const getEnrollByName = (data) => {
  return httpGet({
    url: 'getEnrollByName',
    data
  })
}

export const getEnrollById = (data) => {
  return httpGet({
    url: 'getEnrollById',
    data
  })
}


export const getEnrollRanks = (data) => {
  return httpGet({
    url: 'getRanks',
    data
  })
}

export const addEnroll = (data) => {
  return httpBinPost({
    url: 'addEnroll',
    data
  })
}

