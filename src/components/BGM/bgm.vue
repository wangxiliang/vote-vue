<template>
  <div class="bgm_box" @click="handleClickBGM">
    <audio id="audio"  ref="audio" autoplay :src="src" hidden="true" loop="loop"></audio>
    <van-icon size="30" :class="className" :color="themeColor" name="music"></van-icon>
  </div>
</template>

<script>
export default {
  name: 'bgm',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: true,
    }
  },


  mounted() {
    let audio = document.querySelector('#audio')
    document.addEventListener(
      "WeixinJSBridgeReady",
      () =>{
        this.play()
      }
    );
  },


  methods: {
    play() {
      this.$refs.audio.play()
    },
    handleClickBGM() {
      this.active = !this.active
      

      // 播放音乐
      this.active ? this.play() : this.$refs.audio.pause()
    }
  },

  computed: {
    className() {
      return {
         transition_circle: this.active 
      }
      
    }
  },
}
</script>

<style lang="less">
@import '../../style/base';
.bgm_box {
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 99;
  // background: gainsboro;
}

#video::-webkit-media-controls {
  display: none !important;
}
</style>