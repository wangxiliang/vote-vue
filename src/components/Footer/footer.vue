<template>
  <div>
    <van-divider v-if="text" :style="{ color: color, borderColor: borderColor, padding: '0 16px' }">
      {{text}}
    </van-divider>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    text: {
      type: [Number, String],
      default: ''
    },
    color: {
      type: String,
      default: '#1989fa'
    },
    borderColor: {
      type: String,
      default: '#1989fa'
    }
  },
  data() {
    return {
      
    }
  },
  
}
</script>

<style>

</style>