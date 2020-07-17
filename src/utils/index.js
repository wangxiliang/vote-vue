import Path from 'path'
import { log } from 'util';
// 向上递归寻找指定parent组件
export const findComponentUpward = (context, componentName) => {
  let parent = context.$parent
  let parentName = parent.$options.name
  // console.log(parentName)
  while(parent && (!parentName || parentName !== componentName)) {
    parent = parent.$parent
    if(parent) parentName = parent.$options.name
  }
  return parent
}

export const findComponentsUpward = (context, componentName) => {
  let parent = context.$parent
  let arr = []
  if (parent) {
    if (parent.$options.name === componentName) {
      arr.push(parent)
    }
    return arr.concat(findComponentsUpward(parent, componentName))
  }else {
    return []
  }
}

// 向下寻找指定的所有的组件 返回一个数组
export const findComponentsDownward = (context, componentName) => {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    let findComponents = findComponentsDownward(child, componentName)
    return components.concat(findComponents)
  }, [])
}

export const addClass = (el, className) => {
  if (!el || !className.length) return
  let classNames = el.className
  for (let i = 0, len = className.length; i < len; i++) {
    let cls = className[i]
    if (el.classList) {
      el.classList.add(cls)
    } else {
      classNames += ' ' + cls
    }
  }
  if (!el.classList) el.className = classNames
}

export const removeClass = (el, className) => {
  if (!el || !className.length) return
  let classNames = ' ' + el.className + ' '
  for (let i = 0, len = className.length; i < len; i++) {
    let cls = className[i]
    if (el.classList) {
      el.classList.remove(cls)
    }else {
      classNames = classNames.replace(' ' + cls + ' ', ' ')
    }
  }
  if (!el.classList) el.className = classNames
}

export const setLocal = (key, value) => {
  localStorage.setItem(key, value)
}

export const getLocal = (key, value) => {
  return JSON.parse(localStorage.getItem(key))
}

export const removeLocal = (key, value) => {
  localStorage.removeItem(key)
}



// 生成随机id
export const randomId = (len) => {
  return Math.random().toString(36).substr(3, len)
}

// 随机32位字符串
export const randomString = (len = 32) => {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {　　　　
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
export const randomString2 = (len = 31) => {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {　　　　
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos)).toUpperCase()
  }
  return pwd
}

// 路径拼接
export const resolvePath = (basePath, path) => {
  if (typeof path !== 'string' && typeof basePath !== 'string') {
    return null
  }
  return Path.resolve(basePath, path)
}

// 已打开的submenu
export const getOpenedNames = (routerList, name) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(name)
      return true
    }
    if (item.children && item.children.length) {
      let findOpenedNames = getOpenedNames(item.children, name)
      if (findOpenedNames.length) {
        arr = arr.concat(item.name, findOpenedNames)
        return true
      }
    }
  })
  return arr
}

export const checkPhone = (phone) => {
  return (/^1[3456789]\d{9}$/.test(phone))
}

// 数据类型检测
export const typeOf = (obj) => {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    }
    return map[toString.call(obj)]
}

// 深拷贝
export const deepCopy = (data) => {
    const t = typeOf(data)
    let o

    if (t === 'array') {
      o = []
    } else if ( t === 'object') {
      o = {}
    } else {
      return data
    }

    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(deepCopy(data[i]))
      }
    } else if ( t === 'object') {
      for (let i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          o[i] = deepCopy(data[i])
        }
      }
    }
    return o
}

function hasPermission(token, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => route.meta.roles.includes(token))
  } else {
    return true
  }
}

function _import(filename) {
  return () => import('../pages/'+filename)
}

// 过滤权限表
export const filterAsyncRoutes = (routes, token) => {
  const res = []

  routes.forEach(route => {
    let tmp = { ...route }
    if(tmp.component) tmp.component = _import(tmp.component)
    if (hasPermission(token, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, token)
      }
      res.push(tmp)
    }
  })

  return res
}


export const formatTime = (date, str) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(_formatNumber).join(str) + ' ' + [hour, minute, second].map(_formatNumber).join(':')
}

const _formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}