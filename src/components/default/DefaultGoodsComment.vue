<template>
  <div class="box">
    <!-- 头部区域 -->
    <van-nav-bar
      title="商品评论"
      left-text="返回"
      left-arrow
      ref="goback"
      @click-left="onClickLeft"
      class="head"
    />
    <div class="body">
      <!-- 评论功能 -->
      <comment :id="id"></comment>
    </div>
    <div style="height:60px"></div>
  </div>
</template>

<script>
import Comment from './Comment'
export default {
  data () {
    return {}
  },
  methods: {
    // 点击返回上一页
    onClickLeft () {
      this.$refs.goback.children[0].setAttribute('style', 'opacity:0')
      this.$router.go(-1)
    }
  },
  computed: {
    // 获取当前商品的id
    id () {
      return window.location.href.split('id=')[1]
    }
  },
  components: {
    comment: Comment
  }
}
</script>

<style lang="less" scoped>
</style>
