<template>
  <div>
    <div class="detail_head">

      <van-cell center>
        <template #default>
          票数：<span class="head_poll_num">{{detail.poll || 0}}</span>
        </template>

        <template #title>
          <div class="head_info">
            <div>
              {{detail.name}} <span class="head_info_order">{{detail.id}}号</span>
            </div>
            <div>
              当前排名：<span class="head_poll_num">{{detail.rank}}</span>
            </div>
          </div>
          
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-image  round width="60" height="60" 
          :src="detail.avatar || defaultAvatar" />
        </template>
      </van-cell>

    </div>

    <div class="detail_body">
      <van-grid :column-num="1">
        <van-grid-item>
          <div class="body_head">
              选手作品
          </div>
          <div class="body_body">
            <div class="body_body_work">
              <van-image fit="cover" v-if="detail.type == 1" :src="detail.src"></van-image>
              <video :src="detail.src" v-if="detail.type == 2" controls width="100%" height="300"></video>
            </div>
            <Footer   
              class="body_body_divider"
              text="作品介绍"
              borderColor="#666"></Footer>
            <div v-html="detail.sub" class="body_body_sub">
              
              {{detail.sub}}
            </div>
          </div>
        </van-grid-item>
      </van-grid>
      
    </div>

    <div class="detail_op">
      <div class="detail_op_left">
        <van-button icon="share" type="primary" @click="handleClickShare" size="normal">帮TA拉票</van-button>
      </div>
      <div class="detail_op_right">
        <van-button icon="like" type="info" @click="handleClickPoll" size="normal">投票</van-button>
      </div>
    </div>


    <Share  :show="show" @handleShareChange="handleShareChange"></Share>
    <!-- <pre>
      {{wechat}}
    </pre> -->
    
  </div>
</template>

<script>
import Footer from 'components/Footer'
import Share from 'components/Share'
import {getEnrollById} from 'service/enroll'
import {getWechat} from 'service/wechat'
import {updatePoll} from 'service/poll'
import defaultAvatar from 'assets/images/default-avatar.png'
import {typeOf} from 'utils'
import CONFIG from 'config'
export default {
  name: 'detail',
  components: {
    Footer,
    Share
  },
  data() {
    return {
      show: false,
      detail: {},
      defaultAvatar,
      wechat: {},
      CONFIG
    }
  },

  mounted() {
    getWechat().then(res => {
      this.wechat = typeOf(res.data) == 'array' ? CONFIG.wechat.userInfo : res.data
        
      this.loadEnrollById({id: this.$route.params.id})
    }) 
    
  },
  methods: {
    // 
    handleClickPoll() {
      console.log('投票');
      let toast = this.UTtoastLoading()

      let openid = this.wechat.openid
      let data = {
        enroll_id: this.detail.id, 
        openid, 
        be_openid: this.detail.openid, 
        poll_id: this.detail.poll_id,
        title: this.detail.title
      }
      updatePoll(data).then(res => {
        console.log(res);
        this.UTtoastClose(toast)
        this.$toast(res.message)
        this.detail.poll = parseInt(this.detail.poll) + 1
      }).catch((err) => {
        console.log('e', err);
        this.UTtoastClose(toast)
        this.$toast(err.data.message)
      })

    },
    handleClickShare() {
      console.log('分享');
      this.show = true
      
    },
    handleShareChange() {
      this.show = !this.show
    },

    loadEnrollById(data) {
      getEnrollById(data).then(res => {
        console.log(res);
        this.detail = res.data
      })
    }

  },
}
</script>

<style lang="less">
.head_info {
  margin-left: 15px;
}
.head_poll_num {
  color: @theme-color;
}
.head_info_order {
  margin-left: 10px;
}

.detail_body {
  margin-top: 30px;
  overflow: hidden;
}

.body_body {
  padding: 0 10px;
}

.body_head {
  width: 100%;
  background: @theme-color;
  padding: 10px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.body_body_divider .van-divider {
  padding: 0 !important;
}

.body_body_sub {
  font-size: 14px;
}


.detail_op {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.detail_op_left, .detail_op_right {
  margin: 0 10px;
}
</style>