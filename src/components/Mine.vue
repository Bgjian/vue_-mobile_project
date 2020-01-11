<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="用户中心"
      left-text="返回"
      ref="goback"
      left-arrow
      @click-left="onClickLeft"
      class="head"
    />
    <van-loading type="spinner" size="24px" vertical>开发中...</van-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .van-loading {
    margin-top: 15px;
  }
}
</style>
