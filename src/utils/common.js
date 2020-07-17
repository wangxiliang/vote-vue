
//工具层 全局方法
const common = {

  data() {
    return {
      // 主题色
      themeColor: '#1989fa'
    }
  },

  methods: {
    UTtoastLoading(message = '加载中...') {
      return this.$toast.loading({
        duration: 0,
        message,
        forbidClick: true
      })
    },
    UTtoastClose(toastContext) {
      toastContext.clear()
    },

    UTtoastSuc(msg) {
      this.$toast.success(msg)
    },

    UTtoastFail(msg) {
      this.$toast.fail(msg)
    }

  }
}

export default common
