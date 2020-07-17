<template>
  <div>
    <van-swipe 
    :autoplay="autoplay" 
    :indicator-color="indicatorColor"
    :width="width"
    :height="height"
    :showIndicators="showIndicators"
    @change="handleChange">
      <van-swipe-item @click="handleClickItem(item)" v-for="(item, index) in swipeList" :key="index">
        <van-image class="image" :fit="imgFit" :src="item && item.src" />
      </van-swipe-item>
      
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    autoplay: {
      type: [String, Number],
      default: 3000 
    },
    indicatorColor: {
      type: String,
      default: '#1989fa'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '250'
    },
    showIndicators: {
      type: Boolean,
      default: false
    },
    swipeList: {
      type: Array,
      default: () => ([])
    },
    imgFit: {
      type: String,
      default: 'cover'
    }
  },
  methods: {
    handleChange(index) {
      this.$emit('handleChangeSwipe', index)
    },
    handleClickItem(item) {
      if(item && item.redirect_url) {
        window.location.href = item.redirect_url
      }
      this.$emit('handleClickSwipe', item)
    }
  },
}
</script>

<style>
.image {
  height: 100%;
}
</style>