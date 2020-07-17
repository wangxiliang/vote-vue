<template>
  <span class="rank_num" :style="numBoxStyles">
    <b class="rank_num_text" :style="textStyles">{{text}}</b>
  </span>
</template>

<script>
const themeColor = '#1989fa'
export default {
  name: 'orderNumber',
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    backgroundColor: {
      type: String,
      default: themeColor
    },
    width: {
      type: [String, Number],
      default: 20
    },
    height: {
      type: [String, Number],
      default: 20
    },
  },
  computed: {
    textStyles() {
      return {
        color: this.textColor

      }
    },
    numBoxStyles() {
      return {
        background: this.backgroundColor,
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.rank_num {
  display: inline-block;
  background: @theme-color;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}


</style>