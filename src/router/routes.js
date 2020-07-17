import Layout from 'pages/index/index.vue'
import err404 from 'pages/404'
import Poll from 'pages/poll'
import Rank from 'pages/rank'
import Enroll from 'pages/enroll'
import Detail from 'pages/poll/detail'

// 路由配置
export const constantsRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/poll',
    children: [
      {
        path: 'poll',
        component: Poll,

        // 底部导航栏会根据meta对象中的属性进行渲染
        meta: {
          // icon 为底部导航栏的图标
          icon: 'home-o',
          // title为底部导航栏的title
          title: '首页',
          // 当开启该属性  底部导航栏就会渲染该路由
          tabbar: true,
        },
        name: 'poll'
      },
      {
        path: 'poll/detail/:id',
        component: Detail,
        name: 'detail'
      },
      {
        path: 'rank',
        component: Rank,
        meta: {
          icon: 'search',
          title: '排行榜',
          tabbar: true,
        },
        name: 'rank'
      },
      {
        path: 'enroll',
        component: Enroll,
        meta: {
          icon: 'friends-o',
          title: '活动报名',
          tabbar: true,
        },
        name: 'enroll'
      },
    ],
  },
]



