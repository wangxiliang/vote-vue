<template>
  <div class="err404-wrapper">
    <img class="err404-wrapper-bg" src="../../assets/images/404.jpg" alt="err404">
    <div class="err404-wrapper-info">
      <p class="err404-wrapper-info-msg">
        啊哦~ 您请求的页面未找到
        <router-link to="/">
          <Button
            size="small"
            type="primary">
            点我返回首页
          </Button>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "err-404"
}
</script>

<style lang="less" scoped>
.err404-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-bg {
    display: block;
    width: 100%;
    height: 100%;
  }
  &-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    margin-top: 20px;
    &-msg {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
