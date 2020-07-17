const env = process.env.NODE_ENV
const debug = env == 'development' ? true : false

const config = {
  env ,
  debug,
  wechat: {
    // api baseUrl
    apiUrl: debug ? 'https://wkl.vcale.cn/app/index.php?i=121&c=entry&m=zyun_vote&do='
    : `${window.sysinfo && window.sysinfo.siteroot}app/index.php?i=${window.sysinfo && window.sysinfo.uniacid}&c=entry&m=zyun_vote&do=`,
    // 测试数据
    userInfo: debug ? {
      "openid": "oxaGjt7m0mgLO66eYZSDUeAgaiFo", 
      "nickname": "品如的睫毛", 
      "sex": 1, 
      "language": "zh_CN", 
      "city": "桂林", 
      "province": "广西", 
      "country": "中国", 
      "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8p9dyJCvCMfoauKxdRZgky4UudJEqpJNmIFF9hzqYDhCZkA5oaUdSOtQiaSnFwOaUU9Lx1RC6GQckTUYWLohpbw/132", "privilege": [], "avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/8p9dyJCvCMfoauKxdRZgky4UudJEqpJNmIFF9hzqYDhCZkA5oaUdSOtQiaSnFwOaUU9Lx1RC6GQckTUYWLohpbw/132" 
    } : {}
  }
}

export default config