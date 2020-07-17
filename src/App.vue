<template>
  <div class="app">
    <BGM v-if="config && (config.bgm_status != 0 || config.bgm_src)" :src="bgm_src"></BGM>
    <van-popup 
      style="border-radius: 10px" 
      v-model="show" 
      :close-on-popstate="false" 
      :close-on-click-overlay="false"
      >
      <div class="qr_box">
        {{qrcode_sub}}
        <van-image
        fit="contain"
        :src="qr_src"
        ></van-image>
      </div>
    </van-popup>
    
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import BGM from 'components/BGM'
import CONFIG from 'config'
import {getConfig} from 'service/config'
import {getWechat} from 'service/wechat'
export default {
  name: 'app',
  components: {
    BGM
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      config: {},
      show: false,
      qrcode_sub: '',
      CONFIG: CONFIG,
      user: {},
      bgm_src: '',
      qr_src: ''
    }
  },
  created() {
    this.CONFIG = CONFIG
  },

  mounted() {
    
    getConfig().then(res => {
      this.config = res.data

      this.bgm_src = this.CONFIG.debug ? 'https://wkl.vcale.cn/attachment/' + this.config.bgm_src : window.sysinfo.attachurl + this.config.bgm_src
      
      document.title = this.config.title || ''
      
      if(this.config.subscribe_status == 1) {
        
        // 判断该用户是否关注
        getWechat().then(res => {
          this.user = res.data
          // 用户未关注
          if(res.data.subscribe == 0) {
            this.qr_src = this.CONFIG.debug ? 'https://wkl.vcale.cn/attachment/' + this.config.official_qrcode : window.sysinfo.attachurl + this.config.official_qrcode
            this.qrcode_sub = this.config.official_qrcode_sub
            this.show = true
          }
          
          
        })
      }
      
    })
  },
  methods: {
   reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    } 
  }
}
</script>

<style lang="less">
.qr_box {
  color: @theme-color;
  text-align: center;
  padding: 10px;
}
</style>