<template>
  <div class="layout">
    <div class="container">
      <router-view></router-view>
      <Footer :text="text"></Footer>
    </div>
    
    <Tabbar @tabChange="handleTabChange" :tabbarList="tabbars"></Tabbar>
    
  </div>
</template>

<script>
import { removeCookie } from 'utils/cookie'
import {constantsRoutes} from 'router/routes'
import Tabbar from 'components/Tabbar'
import Footer from 'components/Footer'
import {getConfig} from 'service/config'
export default {
  name: 'layout',
  components: {
    Tabbar,
    Footer
  },
  
  data() {
    return {
      active: 'poll',
      tabbars: [],
      text: ''
    }
  },
  mounted() {

    getConfig().then(res => {
      this.config = res.data
      // 底部标语
      this.text = this.config.brand_name
      
      // 路由
      let routes = constantsRoutes.find(item => {
        return item.path === '/'
      })

      const tabbar = routes.children.filter((route, index) => {
        if(route.path == 'enroll') routes.children[index].hidden = this.config.enroll_status == 1 ? false : true
        return route.meta && route.meta.tabbar
      })
      console.log(tabbar);
      
      this.tabbars = tabbar

    })

    
  },
  computed: {
    
  },
  methods: {
    handleTabChange(e) {
      this.$router.push({path: `/${e}`})
    }
   
  }
}
</script>

<style lang="less" scoped>

</style>
