import Cookie from 'js-cookie'
export const getCookie = (key) => {
  let data = Cookie.get(key)
  if (!data) {
    return null
  }
  return data
}

export const setCookie = (key, value, obj) => {
  return Cookie.set(key, value, obj)
}

export const removeCookie = (key) => {
  return Cookie.remove(key)
}
