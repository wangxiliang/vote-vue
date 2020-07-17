<template>
  <div>
    <van-overlay :style="{'z-index': zindex}"  :show="show" @click="handleClick">
      <div style="position: relative">
        <div class="share_text">
          <div>
            点击右上角
          </div>
          <div style="margin-left:20px">
            发送给朋友
          </div>
          
        </div>
        <div class="share_img">
          <van-image width="100" height="100" :src="img" />
        </div>
      </div>
      
    </van-overlay>
  </div>
</template>

<script>
import img from 'assets/images/share-arrow.png'
export default {
  name: 'share',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [String, Number],
      default: 999
    }

  },
  data() {
    return {
      img,
      zindex: 999
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.zindex = this.zIndex
    })
  },
  methods: {
    handleClick() {
      this.zindex = this.zIndex
      this.$emit('handleShareChange')
    }
  },
}
</script>

<style>
.share_text {
  color: #fff;
  font-size: 18px;
  line-height: 25px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
}

.share_img {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>