<template>
  <div>
    <Banner v-if="swipeList.length" height="250"  imgFit="cover" :swipeList="swipeList"></Banner>
    <div class="rank_list">
      <van-pull-refresh  v-model="refreshing" @refresh="onRefresh">
        <van-list
          :immediate-check="false"
          v-model="loading"
          :finished="finished"
          offset="200"
          @load="onLoad">
          <template >
            <van-cell center v-for="(item, index) in list" :key="index">
              <div class="rank_item ">

                <div class="rank_item_left">
                  <!-- <van-icon size="20" color="#1989fa" name="award"></van-icon> -->
                  <OrderNumber :text="index + 1"></OrderNumber>
                </div>

                <div class="rank_item_right">
                  <van-image
                    round
                    width="35px"
                    height="35px"
                    :src="item.avatar || defaultAvatar"
                  >
                  </van-image>
                  <div class="rank_item_right_info van-ellipsis">
                    <span>{{item.name}}</span>
                    <!-- <span class="">《{{item.title}}》</span> -->
                  </div>

                  <div>
                    <span class="rank_item_right_poll">{{item.poll || 0}}</span>票
                  </div>
                </div>
                
              </div>
              
            </van-cell>
          </template>
          
        </van-list>
      </van-pull-refresh>
      <!-- <template v-if="!list.length">
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="还未有选手参赛"
        />
      </template> -->
    </div>
  </div>
</template>

<script>
import Banner from 'components/Banner'
import OrderNumber from 'components/OrderNumber'
import {getEnrollRanks} from 'service/enroll'
import {getBanner} from 'service/banner'
import defaultAvatar from 'assets/images/default-avatar.png'
export default {
  name: 'rank',
  components: {
    Banner,
    OrderNumber
  },
  data() {
    return {
      defaultAvatar,
      swipeList: [
        
      ],
      loading: false,
      finished: false,
      refreshing: false,
      list: [
        
      ],
      page: 1
    }
  },

  mounted() {
    this.loadBanner({type: 2})
    this.loadRanks({page: 1})
  },

  methods: {
    onLoad() {
      console.log('触发');
      
      this.page = this.page + 1
      this.loadRanks({page: this.page})
      
    },

    onRefresh() {
      
      console.log('refer');
      
      this.finished = false;
      
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.page = 1
      this.loadRanks({page: 1})
    },

    loadBanner(data) {
      getBanner(data).then(res => {
        this.swipeList = res.data
      })
    },
    loadRanks(data) {
      getEnrollRanks(data).then(res => {
        console.log(res);
        this.refreshing = false;
        if(data.page == 1) {
          this.list = res.data
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
          this.list = this.list.concat(res.data)
        }
      })
    }
  },
}
</script>

<style lang="less" >
.rank_item {
  display: flex;
  align-items: center;
}
.rank_item_left, .rank_item_right {
  height: 100%;
  display: flex;
  align-items: center;
}
.rank_item_left {
  padding: 0 10px;
}
.rank_item_right {
  
  
}

.rank_item_right_info {
  padding: 0 10px;
  color: @sub-color;
}
.rank_item_right_poll  {
  color: @theme-color;
  margin: 0 2px;
}



</style>