const install = (Vue) => {
  Vue.directive('preventReClick', {
    inserted(el, params) {
      el.addEventListener('click', function() {
        if(!el.disabled) {
          el.disabled = true

          setTimeout(() => {
            el.disabled = false
          }, params.value || 2000)
        }
      })
    }
  })
}

export default install