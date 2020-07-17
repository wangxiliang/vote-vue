<template>
  <div>
    <Banner v-if="swipeList.length" height="250" :swipeList="swipeList"></Banner>
    <van-button style="margin: 10px 0" block size="small" @click="handleClickDetail" icon="https://img.yzcdn.cn/vant/logo.png" type="info">活动规则</van-button>
    <Form :forms="forms" @handleSubmit="handleSubmit"></Form>
    <!-- 活动详情 -->
    <van-dialog width="90%" v-model="show" title="活动详情" :show-cancel-button="false">
      <div class="poll_detail_con" style="padding: 0 10px" v-if="config.content" v-html="config.content">
        {{config.content}}
      </div>
      <van-empty v-else description="暂无详情" />
    </van-dialog>
  </div>
</template>

<script>
import Form from 'components/Form'
import Banner from 'components/Banner'
import forms from './config'
import {getConfig} from 'service/config'
import {getBanner} from 'service/banner'
import {getWechat} from 'service/wechat'
import {addEnroll} from 'service/enroll'
import CONFIG from 'config'
import {checkPhone, typeOf} from 'utils'
export default { 
  name: 'enroll',
  reject: ['reload'],
  components: {
    Form,
    Banner
  },
  data() {
    return {
      forms: forms.list,
      swipeList: [],
      config: {},
      user: CONFIG.wechat.userInfo,
      show: false
    }
  },

  mounted() {
    this.loadConfig()
    this.loadBanner({type: 3})
    this.loadWechat()
  },
  methods: {
    // 点击活动规则
    handleClickDetail() {
      this.show = true
    },
    handleSubmit(e) {
      
      
      if(!checkPhone(e.phone)) return this.UTtoastFail('请填写正确的手机号码')

      if(!e.file.length) return this.UTtoastFail('请选择文件')

      

      e.type = this.config.poll_type || 1

      if(e.type == 2 && !e.video_img.length) return this.UTtoastFail('请选择视频封面')

      e.openid = this.user.openid
      e.avatar = this.user.headimgurl
      e.file = e.file[0].file
      
      if(e.type == 2 && e.video_img.length) e.video_img = e.video_img[0].file
      let formData = new FormData()
      let keys = Object.keys(e)

      keys.forEach(key => {
        formData.append(key, e[key])
      })
      console.log('e', e);
      let toast = this.UTtoastLoading()
      addEnroll(formData).then(res => {
        
        this.$toast('报名成功')
        setTimeout(() => {
          this.UTtoastClose(toast)
          this.$router.go(0);
        }, 1000)
        
      }).catch(err => {
        this.UTtoastClose(toast)
        this.$toast(err.data.message)
      })
    },
    loadConfig() {
      getConfig().then(res => {
        console.log(res);
        this.config = res.data
        let vali = (typeOf(res.data))
        forms.list.forEach((item, index) => {

          if(vali == 'object' && res.data.poll_type == 2 && item.name == 'video_img') {
            forms.list[index].hidden = false
          }


          if(vali == 'object' && item.el == 'van-uploader' && item.name == 'file') {
            forms.list[index].type = res.data.poll_type == 1 ? 'image' : 'video'
            forms.list[index].multiple = res.data.poll_type == 1 ? true : false
          }
        })
        console.log('ads', forms.list);
        
        this.forms = forms.list
      })
    },
    loadBanner(data) {
      getBanner(data).then(res => {
        this.swipeList = res.data
      })
    },

    loadWechat() {
      getWechat().then(res => {
        console.log('user', res);
        this.user = typeOf(res.data) == 'array' ? CONFIG.wechat.userInfo : res.data
      })
    }
  },
}
</script>

<style>
.poll_detail_con {
    padding: 0px 10px;
    max-height: 370px;
    overflow-y: scroll;
  }
</style>