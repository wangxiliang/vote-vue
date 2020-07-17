import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router/router'
import Store from 'store/store.js'
import './style/base.less'
// 载入权限验证
import './permission'
import mixin from 'utils/common'

import directives from 'directives'

import { 
  Button,
  Tabbar, TabbarItem,
  Swipe, SwipeItem,
  Grid, GridItem,
  CountDown,
  Col, Row, CellGroup,
  Search,
  Divider,
  Image,
  List,
  Cell,
  Icon,
  Form,
  Field,
  Uploader,
  RadioGroup, Radio,
  Toast,
  Dialog,
  Overlay,
  NoticeBar,
  Empty,
  Popup,
  PullRefresh
} from 'vant'

Vue.use(NoticeBar);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Empty);
Vue.use(RadioGroup);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Radio);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(CountDown);
Vue.use(Col);

Vue.use(Row);
Vue.use(Search);
Vue.use(Image);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup); 
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);

// 全局混入 公用方法
Vue.mixin(mixin)

Vue.use(Vuex)


// 全局注册自定义指令
directives(Vue)

const store = Store()
new Vue({
  render: c => c(App),
  router,
  store
}).$mount('#app')

// js模块开启 HMR
if (module.hot) {
  module.hot.accept()
}
