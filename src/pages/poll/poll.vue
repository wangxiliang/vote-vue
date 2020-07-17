<template>
  <div>
    
    <Banner v-if="swipeList.length" height="250" imgFit="cover" :swipeList="swipeList"></Banner>
    
    <div class="poll_info">
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          <div>
            {{countInfo.enrollTotal || 0}}
          </div>
          <div>
            参赛人数
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            {{countInfo.pollTotal || 0}}
          </div>
          <div>
            累计投票
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="poll_time">
      <van-grid :border="false" :column-num="1">
        <van-grid-item>
          活动结束时间
          <van-count-down v-if="config.poll_start_time && config.poll_end_time" :time="time">
            <template v-slot="timeData">
              <span class="block">{{ timeData.days }}天</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.hours }}时</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}分</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}秒</span>
            </template>
          </van-count-down>

          <van-notice-bar style="width: 100%" v-else :scrollable="false" color="#1989fa" background="#ecf9ff" left-icon="info-o">
            当前活动还未开始
          </van-notice-bar>
        </van-grid-item>
        
      </van-grid>
    </div>


    <div class="poll_rule">
      <van-row type="flex" align="center">
        <van-col offset="2" span="6">
          <van-button size="small" @click="handleClickDetail" icon="https://img.yzcdn.cn/vant/logo.png" type="info">活动规则</van-button>
          
        </van-col>
        <van-col span="16">
          <div >
            <van-search @search="handleSearch" v-model="value" placeholder="请输入选手名称搜索" />
          </div>
          
        </van-col>
      </van-row>
    </div>

    

    <div class="poll_list">

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          :immediate-check="false"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid  :gutter="15" :border="false" :column-num="2">
            <template v-if="user.length"> 
              <van-grid-item style="flex-grow: 0" v-for="(item, index) in user" 
                :key="index" class="poll_item" 
                @click="handleClickPollDetail(item)">
                <div class="poll_item_head">
                  <van-image height="120" :src="item.type == 1 ? item.src : item.video_img" />
                </div>
                <div class="poll_item_body">
                  <div class="poll_item_body_name">
                    {{item.name}}
                  </div>
                  <div  class="poll_item_body_sub van-multi-ellipsis--l1" >
                    《{{item.title}}》
                  </div>
                  <div class="poll_item_body_total">
                    {{item.poll || 0}}票
                  </div>
                </div>
                <div class="poll_item_footer">
                  <div>
                    <van-button @click.stop="handleClickPoll(item, index)" size="small" icon="https://img.yzcdn.cn/vant/logo.png" type="info" block>投票</van-button>
                  </div>
                </div>
                
              </van-grid-item>
            </template>
            <template v-else>
              <van-grid-item class="poll_item">
                <van-empty image="search" description="还未有参赛选手" ></van-empty>
              </van-grid-item>
            </template>
        

          </van-grid>
        </van-list>
      </van-pull-refresh>
    </div>

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
import Banner from 'components/Banner'
import {getBanner} from 'service/banner'
import {updatePoll} from 'service/poll'
import {getCount, getEnrollList, getEnrollByName} from 'service/enroll'
import {getConfig} from 'service/config'
import {getWechat} from 'service/wechat'
import {typeOf} from 'utils'
import CONFIG from 'config'
export default {
  name: 'poll',
  components: {
    Banner
  },
  data() {
    return {
      time: 0,
      show: false,
      value: '',
      swipeList: [
        
      ],
      countInfo: {

      },
      user: [],
      config: {},
      wechat: {},
      refreshing: false,
      finished: false,
      loading: false,
      page: 1
    }
  },
  mounted() {
    // 获取banner

    getBanner({type: 1}).then(res => {
      console.log('res', res);
      this.swipeList = res.data
    })

    // 获取用户信息
    getWechat().then(res => {
      this.wechat = typeOf(res.data) == 'array' ? CONFIG.wechat.userInfo : res.data

      this.loadEnrollList({page: 1})
    })

    // 获取参赛人数 累计投票
    getCount().then(res => {
      console.log(res);
      this.countInfo = res.data
    })

    getConfig().then(res => {
      this.config = res.data
      this.time = (new Date(this.config.poll_end_time.replace(/\-/g, "/")).getTime()) - new Date().getTime()  
    })
    

  },
  methods: {
    // 列表加载
    onLoad() {
      console.log('loading',this.loading);
      this.page = this.page + 1
      this.loadEnrollList({page: this.page})
      
    },
    // 点击活动规则
    handleClickDetail() {
      this.show = true
    },
    handleSearch(e) {
      console.log('搜索', e);
      
      if(!e.length){
        this.page = 1
        this.finished = false
        this.loading = true
        this.loadEnrollList({page: 1})
        return
      } 
      let toast = this.UTtoastLoading()
      getEnrollByName({name: e}).then(res => {
        console.log('name', res);
        this.user = res.data
        this.UTtoastClose(toast)
      })
    },
    handleClickPoll(item, index) {
      console.log('投票');
      let toast = this.UTtoastLoading()
      let openid = this.wechat.openid
      let data = {
        enroll_id: item.id,
        openid, 
        poll_id: item.poll_id, 
        be_openid: item.openid,
        title: item.title
      }
      updatePoll(data).then(res => {
        console.log(res);
        this.UTtoastClose(toast)
        this.$toast(res.message)
        this.user[index].poll = parseInt(this.user[index].poll) + 1

        // this.page = 1
        // this.loadEnrollList({page: 1})
      }).catch((err) => {
        console.log('e', err);
        this.UTtoastClose(toast)
        this.$toast(err.data.message)
      })
    },

    handleClickPollDetail(item) {
      this.$router.push({path: `/poll/detail/${item.id}`})
    },

    loadEnrollList(data) {
      getEnrollList(data).then(res => {
        console.log('list', res);
        this.refreshing = false;
        if(data.page == 1) {
          this.user = res.data
          if(res.data.length < 10) {
            this.finished = true
          }else {
            this.loading = false
          }
        }else {
          if(res.data.length < 10) {
            this.finished = true
          }else {
            this.loading = false
          }
          this.user = this.user.concat(res.data)
        }
      })
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      console.log('chufale?');
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.page = 1
      this.loadEnrollList({page: 1})
    }
  },
}
</script>

<style lang="less" scoped>
  
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    // width: 22px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 2px 5px;
    border-radius: 5px;
    background-color: #ee0a24;
  }

  .poll_rule, .poll_list {
    background: #fff;
  }

  .poll_item_body, .poll_item_footer {
    width: 100%;
  }

  .poll_item_body {
    font-size: 14px;

  }

  .poll_item_body_name {
    font-weight: 550;
  }

  .poll_item_body_name, .poll_item_body_sub, .poll_item_body_total {
    margin: 5px 0;
  }

  .poll_item_body_sub {
    color: #666;
  }

  .poll_item_body_total {
    text-align: right;
  }
  .poll_item_body_total_text {
    color: @theme-color;
    font-weight: 550;
  }

  .poll_item {
    flex: 1;
    overflow: hidden;
  }

  .poll_detail_con {
    padding: 0px 10px;
    max-height: 370px;
    overflow-y: scroll;
  }
</style>