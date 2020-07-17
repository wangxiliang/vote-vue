<template>
  <div>
    <van-tabbar placeholder  v-model="active" @change="onChange">
      <template v-for="(item, index) in tabbarList">
        <van-tabbar-item 
          v-if="!item.hidden"
          :key="item.path" 
          :name="item.path" 
          :icon="item.meta.icon">{{item.meta.title}}</van-tabbar-item>
      </template>
      
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  props: {
    tabbarList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      tabbar: [],
      active: 'poll'
    }
  },

  watch: {
    '$route': {
      handler(to,from) {
        console.log(to);
        
        this.active = to.path.slice(1)
      },
      immediate: true
    }
  },

  mounted() {
    console.log(this.tabbarList);
    
  },
  
  methods: {
    onChange(e) {
      this.$emit('tabChange', e)
    }
  },
}
</script>

<style>

</style>